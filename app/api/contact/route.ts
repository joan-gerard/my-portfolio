import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { SITE_EMAIL } from "@/constants/site";
import {
  contactSchema,
  type ContactFieldErrors,
} from "@/lib/contact/schema";
import { singleLineForEmailHeader } from "@/lib/contact/sanitize";
import { getClientIp, rateLimit } from "@/lib/contact/rate-limit";
import {
  TurnstileConfigError,
  verifyTurnstile,
} from "@/lib/contact/turnstile";

/**
 * Contact-form POST endpoint.
 *
 * Pipeline, in order:
 *   1. Per-IP rate limit (cheap reject of repeat offenders).
 *   2. JSON parse + Zod validation.
 *   3. Honeypot — if the `company` field is filled, respond 200 so the bot
 *      thinks it worked but do nothing.
 *   4. Turnstile siteverify (calls out to Cloudflare).
 *   5. Resend delivery.
 *
 * Runtime is pinned to `nodejs` because the Resend SDK uses Node APIs and
 * our rate limiter relies on warm-instance memory that Edge functions
 * don't provide the same way.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ErrorBody {
  error: string;
  fieldErrors?: ContactFieldErrors;
}

const errorResponse = (
  body: ErrorBody,
  status: number,
  headers?: HeadersInit,
) => NextResponse.json(body, { status, headers });

export async function POST(request: Request): Promise<NextResponse> {
  const ip = getClientIp(request);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return errorResponse(
      { error: "Too many messages — please try again shortly." },
      429,
      { "Retry-After": String(limit.retryAfterSeconds ?? 60) },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse({ error: "Invalid JSON payload." }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    const fieldErrors: ContactFieldErrors = {};
    for (const [key, messages] of Object.entries(flat.fieldErrors)) {
      if (messages && messages.length > 0) {
        fieldErrors[key as keyof ContactFieldErrors] = messages[0];
      }
    }
    return errorResponse(
      { error: "Some fields need attention.", fieldErrors },
      400,
    );
  }

  const { name, email, phone, message, company, turnstileToken } =
    parsed.data;

  if (company.trim().length > 0) {
    // Silent success. The bot gets a 200 and moves on, we log nothing
    // sensitive, and we never call Resend.
    return NextResponse.json({ ok: true });
  }

  try {
    const verification = await verifyTurnstile(turnstileToken, ip);
    if (!verification.success) {
      return errorResponse(
        { error: "Captcha verification failed. Please try again." },
        400,
      );
    }
  } catch (err) {
    if (err instanceof TurnstileConfigError) {
      console.error("[contact] Turnstile not configured", err);
      return errorResponse(
        { error: "Contact form is temporarily unavailable." },
        503,
      );
    }
    console.error("[contact] Turnstile verification threw", err);
    return errorResponse(
      { error: "Could not verify captcha. Please try again." },
      502,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return errorResponse(
      { error: "Contact form is temporarily unavailable." },
      503,
    );
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const to = process.env.CONTACT_TO_EMAIL ?? SITE_EMAIL;

  const resend = new Resend(apiKey);
  const senderLabel =
    name && name.trim().length > 0
      ? singleLineForEmailHeader(name)
      : singleLineForEmailHeader(email);

  const plainText = [
    `Name: ${singleLineForEmailHeader(name || "(not provided)")}`,
    `Email: ${singleLineForEmailHeader(email)}`,
    `Phone: ${singleLineForEmailHeader(phone || "(not provided)")}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to,
      replyTo: singleLineForEmailHeader(email),
      subject: `New portfolio message from ${senderLabel}`,
      text: plainText,
    });

    if (error) {
      console.error("[contact] Resend returned error", error);
      return errorResponse(
        { error: "Failed to send your message. Please try again." },
        502,
      );
    }
  } catch (err) {
    console.error("[contact] Resend threw", err);
    return errorResponse(
      { error: "Failed to send your message. Please try again." },
      502,
    );
  }

  return NextResponse.json({ ok: true });
}
