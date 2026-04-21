import { z } from "zod";

/**
 * Shared contact-form schema.
 *
 * Used on both the client (for friendly error messages before submit) and
 * the server route (for the real source of truth). Keeping it in one file
 * prevents the two sides from drifting apart.
 *
 * Field-by-field rationale:
 *
 * - `name`, `phone` are optional. Requiring them would scare off legitimate
 *   senders — a valid email is enough to reply.
 * - `email` is required and must be a real address (we'll be replying to it).
 * - `message` has a 10-char minimum so bots typing "a" can't squeak through,
 *   and a 5000-char cap to bound the outgoing email size.
 * - `company` is the honeypot. It MUST be empty. Real users never see the
 *   field (it's visually hidden + aria-hidden), so any non-empty value is
 *   a bot — the API returns 200 without sending mail (see route). The
 *   schema only bounds length so validation runs before that check.
 * - `turnstileToken` is the Cloudflare Turnstile challenge result. The
 *   server re-verifies it against Cloudflare's siteverify endpoint before
 *   sending anything.
 */
export const contactSchema = z.object({
  name: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.email({ error: "Please enter a valid email address" }).max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { error: "Message should be at least 10 characters" })
    .max(5000, { error: "Message is too long (5000 characters max)" }),
  company: z.preprocess(
    (v) => (typeof v === "string" ? v : ""),
    z.string().max(200),
  ),
  turnstileToken: z.string().min(1, { error: "Captcha is required" }),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Narrow, UI-friendly type for field-level error messages.
 *
 * `z.flattenError(...).fieldErrors` gives us `Record<string, string[] | undefined>`
 * keyed by field name; we expose the first message per field to the user.
 */
export type ContactFieldErrors = Partial<
  Record<keyof ContactInput, string | undefined>
>;
