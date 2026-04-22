/**
 * In-memory, per-instance rate limiter for the contact form.
 *
 * ⚠️  Scope and limitations
 * -----------------------
 * This limiter lives in the serverless function's warm-instance memory. On
 * Vercel:
 *
 *   - It throttles bursts from the same IP that hit the same warm instance.
 *   - It does NOT deduplicate across concurrent instances or cold starts.
 *   - A determined attacker who spins up parallel invocations can bypass it.
 *
 * That's intentional for a portfolio: the real spam gate is Cloudflare
 * Turnstile (captcha) + the honeypot field. This limiter is a cheap second
 * layer that keeps warm-instance floods polite.
 *
 * If abuse ever shows up in logs, the upgrade path is Upstash Redis +
 * `@upstash/ratelimit` — swap the body of `rateLimit()` and you're done.
 * The public signature is designed to survive that migration.
 */

const MAX_REQUESTS = 3;
const WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  ok: boolean;
  retryAfterSeconds?: number;
}

export function rateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((WINDOW_MS - (now - oldest)) / 1000),
    );
    hits.set(ip, recent);
    return { ok: false, retryAfterSeconds };
  }

  recent.push(now);
  hits.set(ip, recent);
  return { ok: true };
}

/**
 * Best-effort client IP extraction from the request headers.
 *
 * Vercel sets `x-vercel-forwarded-for` to the client IP after edge/proxy
 * normalization, which is safer than parsing user-controlled proxy chains.
 * Falls back to `x-real-ip`, then a constant bucket so missing-header
 * requests can't bypass the limiter entirely.
 */
export function getClientIp(request: Request): string {
  const vercelForwarded = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) return vercelForwarded;

  const real = request.headers.get("x-real-ip");
  if (real) return real;

  return "unknown";
}
