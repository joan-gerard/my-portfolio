/**
 * Server-side verification of a Cloudflare Turnstile challenge token.
 *
 * Why we need this
 * ----------------
 * The Turnstile widget runs in the browser and produces a one-time token. A
 * bot could fake or replay that token, so the server MUST re-submit it to
 * Cloudflare's siteverify endpoint before trusting it. Cloudflare checks
 * the token is valid, unused, issued for our site key, and (optionally)
 * came from the expected IP.
 *
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface SiteverifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export class TurnstileConfigError extends Error {
  constructor() {
    super("TURNSTILE_SECRET_KEY is not configured");
    this.name = "TurnstileConfigError";
  }
}

export interface TurnstileVerification {
  success: boolean;
  errorCodes: string[];
}

export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new TurnstileConfigError();
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  const controller = new AbortController();
  const timeoutMs = 5000;
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: controller.signal,
    });

    if (!response.ok) {
      return { success: false, errorCodes: [`http_${response.status}`] };
    }

    const json = (await response.json()) as SiteverifyResponse;
    return {
      success: json.success === true,
      errorCodes: json["error-codes"] ?? [],
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { success: false, errorCodes: ["timeout"] };
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
