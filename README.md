# my-portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, Tailwind
CSS v4 and Framer Motion.

## Local development

```bash
pnpm install
pnpm dev
```

Visit <http://localhost:3000>.

## Contact form setup

The contact form at `/#contact` submits to `app/api/contact/route.ts`,
which validates the payload with Zod, verifies a Cloudflare Turnstile
challenge, and dispatches an email via Resend.

> **New here?** [`docs/contact-form-setup.md`](docs/contact-form-setup.md)
> walks through what each environment variable is, where to obtain it,
> and where to paste it — including the safe-to-use Turnstile test keys
> that let you develop without signing up for Cloudflare immediately.

### 1. Environment variables

Copy `.env.example` to `.env.local` and fill in the blanks:

```bash
cp .env.example .env.local
```

| Variable | Purpose | Required? |
| --- | --- | --- |
| `RESEND_API_KEY` | Authenticates calls to the Resend API. | Yes |
| `CONTACT_FROM_EMAIL` | The `From:` address on outgoing mail. Defaults to `onboarding@resend.dev` (Resend's shared sandbox sender). | No |
| `CONTACT_TO_EMAIL` | Inbox that receives messages. Falls back to `SITE_EMAIL` from `constants/site.ts`. | No |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile key; embedded in the client bundle. | Yes in production |
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile key used for `siteverify`. | Yes in production |

`.env.example` ships with Cloudflare's public **test keys** for Turnstile
— those always pass the challenge and are fine for local dev. **Replace
them with real keys before deploying.**

### 2. Get a Resend API key

1. Sign up at <https://resend.com> (free tier: 100 emails/day, 3 000/month).
2. Create an API key at **API Keys → Create API Key** and paste it into
   `RESEND_API_KEY`.
3. Out of the box you can send from `onboarding@resend.dev` — good for
   testing but visually unprofessional in production. Once you own a
   domain, verify it under **Domains → Add Domain**, then set
   `CONTACT_FROM_EMAIL` to an address on that domain (e.g.
   `hello@joangerard.dev`).

### 3. Get Turnstile keys

1. In the Cloudflare dashboard go to **Turnstile → Add site**.
2. Set the hostname to your deployed domain (and `localhost` for dev).
3. Copy the **Site Key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the
   **Secret Key** into `TURNSTILE_SECRET_KEY`.

### 4. Deploy env vars to Vercel

Add the five variables above under **Project → Settings → Environment
Variables** and redeploy. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is inlined at
build time, so a redeploy is required whenever it changes.

### Architecture notes

- **Runtime**: the route is pinned to `nodejs` because the Resend SDK
  uses Node APIs and the in-memory rate limiter relies on warm-instance
  memory that Edge functions don't share.
- **Spam defence** is layered: honeypot field (`company`) → per-IP rate
  limit (`lib/contact/rate-limit.ts`, 3 req / 10 min / warm instance) →
  Turnstile siteverify. The honeypot returns `200 OK` so bots don't
  learn they were rejected.
- **Rate-limit upgrade path**: the in-memory limiter is best-effort on
  serverless. If abuse ever appears in the logs, swap the body of
  `rateLimit()` to use Upstash Redis + `@upstash/ratelimit`; the public
  signature is stable.

## Scripts

```bash
pnpm dev         # Next dev server with Turbopack
pnpm build       # Production build
pnpm lint        # ESLint
pnpm test:ci     # build + lint (used in CI)
```
