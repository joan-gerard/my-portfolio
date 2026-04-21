# Contact form — environment variable guide

The contact form at `/#contact` posts to `app/api/contact/route.ts`. To
make submissions actually arrive in your inbox you need to populate up
to five environment variables. This document explains **what each one
is for, where to get it, and where to paste it** — written for a
developer who hasn't used Resend or Cloudflare Turnstile before.

> **TL;DR — minimum to start receiving emails today**
>
> Create `.env.local` in the project root with three lines:
>
> ```dotenv
> RESEND_API_KEY=re_yourRealKeyFromResend
> NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
> TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
> ```
>
> Restart `pnpm dev` and submit the form. The Turnstile values above are
> Cloudflare's public "always passes" test keys — fine for local dev,
> **must be replaced before production**.

## Mental model: there are really just two services to wire up

The form depends on two completely separate third-parties:

1. **Email delivery** — turns the POST request into an actual email in
   your inbox. Handled by **Resend**.
2. **Spam filtering** — proves a human filled out the form, not a bot.
   Handled by **Cloudflare Turnstile**.

The five environment variables split cleanly along that line:

| # | Variable | Belongs to | Required? |
| --- | --- | --- | --- |
| 1 | `RESEND_API_KEY` | Resend | **Yes** |
| 2 | `CONTACT_FROM_EMAIL` | Resend | Optional (default: `onboarding@resend.dev`) |
| 3 | `CONTACT_TO_EMAIL` | Resend | Optional (falls back to `SITE_EMAIL` from `constants/site.ts`) |
| 4 | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare | **Yes in production** |
| 5 | `TURNSTILE_SECRET_KEY` | Cloudflare | **Yes in production** |

The "Yes in production" caveat matters: `.env.example` ships with
Cloudflare's public test keys pre-filled so you can develop and test the
end-to-end flow without signing up for Cloudflare on day one. Real keys
are only required before you push to your live URL.

## Resend variables (3)

### `RESEND_API_KEY` — required

The only variable you cannot skip. Without it the route returns
`503 Service Unavailable` and nothing is ever sent.

How to get it:

1. Sign up at <https://resend.com> (free tier: 100 emails/day,
   3 000/month — generous for a portfolio).
2. **Dashboard → API Keys → Create API Key**.
3. Copy the value (it starts with `re_…`) into `RESEND_API_KEY`.

### `CONTACT_FROM_EMAIL` — optional, controls the "From:" line

When a user submits the form, Resend sends *you* an email. This variable
decides what address appears as the sender in your inbox client. Two
realistic options:

- **Right now, no domain you own**: leave it unset. The route falls back
  to `onboarding@resend.dev`, Resend's shared sandbox sender that any
  account can use immediately. Drawback: emails are labelled as coming
  from `onboarding@resend.dev`, which looks unprofessional and may end
  up in spam folders depending on the recipient.
- **Later, once you own a domain**: in Resend go to **Domains → Add
  Domain**, paste your domain, copy the DNS records Resend gives you
  into your registrar's DNS panel, wait ~10 minutes for verification.
  Then set `CONTACT_FROM_EMAIL=hello@yourdomain.dev` (or anything on
  that domain). No code change required — just flip this env var in
  Vercel and redeploy.

### `CONTACT_TO_EMAIL` — optional, your inbox

The address that *receives* the form submissions. If unset, the code
falls back to `SITE_EMAIL` from `constants/site.ts`:

```ts
export const SITE_EMAIL = "joan.gerard@outlook.com";
```

Set `CONTACT_TO_EMAIL` only if you want submissions to land in a
*different* inbox (e.g. a Gmail account dedicated to portfolio leads)
without changing the rest of the codebase.

## Cloudflare Turnstile variables (2)

Turnstile is Cloudflare's free CAPTCHA — the invisible "are you human?"
check that prevents bots from spamming the form. It always issues keys
in **pairs**:

- **Site key** (public, prefix `NEXT_PUBLIC_`) — embedded into the
  JavaScript bundle. Safe to be visible; the browser needs it to render
  the widget.
- **Secret key** (private, no prefix) — stays on the server. Used by
  `lib/contact/turnstile.ts` to re-verify the token with Cloudflare
  before the email is sent.

### Getting real keys

1. Sign up free at <https://dash.cloudflare.com/sign-up>. No credit card
   needed for Turnstile.
2. In the dashboard sidebar: **Turnstile → Add site**.
3. Fill in:
   - **Site name**: anything, e.g. "Portfolio".
   - **Hostnames**: add **both**:
     - `localhost` (for development)
     - `your-portfolio.vercel.app` (or your custom domain when you have
       one)
   - **Widget mode**: **Managed** (the default — picks the least
     intrusive challenge automatically).
4. After clicking **Create**, Cloudflare shows two strings:
   - A site key → paste into `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - A secret key → paste into `TURNSTILE_SECRET_KEY`

### What about the values already in `.env.example`?

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

These are Cloudflare's documented [public test
keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/#dummy-sitekeys-and-secret-keys)
that **always succeed**. They render a real widget, always return
`success`, and let you exercise the full pipeline locally without
touching Cloudflare. They are intentionally public — anyone can use
them.

**Never use them in production.** Any bot that recognises them can
bypass the captcha entirely.

#### Other test pairs Cloudflare publishes

The "always passes" pair is the most useful default, but Cloudflare also
exposes test keys that force the opposite behaviours — handy when you
want to verify your error UI without touching real keys.

| Behaviour | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `TURNSTILE_SECRET_KEY` | When to use it |
| --- | --- | --- | --- |
| **Always passes** | `1x00000000000000000000AA` | `1x0000000000000000000000000000000AA` | Default for local dev — the values shipped in `.env.example`. Lets you submit the form end-to-end without ever seeing a challenge. |
| **Always fails** | `2x00000000000000000000AB` | `2x0000000000000000000000000000000AA` | Verify that your "Captcha verification failed" UI renders correctly. The widget loads, issues a token, but the server's `siteverify` call comes back rejected. |
| **Forces an interactive challenge** | `3x00000000000000000000FF` | `3x0000000000000000000000000000000AA` | See what the visible challenge actually looks like (clickable checkbox / image grid) — useful for visual QA of widget sizing inside the form layout. |

To swap, edit `.env.local`, restart `pnpm dev`, and resubmit the form.
Both halves of the pair must come from the same row — mixing rows
results in a generic verification failure.

## Where the variables actually live

There are two places, one per environment.

### Local development → `.env.local`

Create a file named **`.env.local`** (not `.env`) in the project root.
Next.js loads env files in this priority order:

```
.env.local          ← personal, machine-specific, git-ignored (use this)
.env.development    ← committed, shared dev defaults
.env                ← committed, all-environments defaults
```

`.env.local` wins for local development and is git-ignored, which is
exactly what you want for secrets. The repo's `.gitignore` already
covers `.env*` (with a single negation for `.env.example`), so any of
these names is technically safe — but `.env.local` is the convention
for "my personal secrets on this machine".

After editing `.env.local`, **restart `pnpm dev`**. Next.js loads env
files once at startup; it does not hot-reload them.

### Production → Vercel dashboard

Open your Vercel project → **Settings → Environment Variables** and add
the same variables there. Two important details:

- **Replace the Turnstile test keys with real ones** before deploying.
  Otherwise the captcha layer is effectively off.
- **`NEXT_PUBLIC_*` variables are inlined at build time.** After
  changing the site key you must **redeploy** (the "Redeploy" button on
  the latest deployment) for the new value to reach the browser.

Vercel scopes each variable to **Production / Preview / Development**.
For a portfolio it's safe to enable all three.

## Recommended day-one workflow

1. Get a Resend API key, paste it into `.env.local` as `RESEND_API_KEY`.
2. Copy the two Turnstile test keys from `.env.example` into
   `.env.local` unchanged.
3. Restart `pnpm dev`, submit the form locally — a real email should
   arrive at `joan.gerard@outlook.com`.
4. Before deploying to Vercel:
   - Create a real Turnstile site for your Vercel hostname.
   - Replace both Turnstile values with the real keys.
   - Add all required vars in Vercel, redeploy.
5. When you eventually own a domain:
   - Verify it in Resend.
   - Set `CONTACT_FROM_EMAIL=you@yourdomain.dev` in Vercel.
   - Redeploy.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Form returns `503` "temporarily unavailable" | `RESEND_API_KEY` or `TURNSTILE_SECRET_KEY` missing | Add the var, restart `pnpm dev` (or redeploy on Vercel). |
| Form returns `400` "Captcha verification failed" | Site key and secret key are from different Turnstile widgets, or the hostname isn't whitelisted on the widget | Check the pair matches; add `localhost` to the widget's hostnames. |
| Form returns `429` "Too many messages" | Per-IP rate limit (3 / 10 min / warm instance) tripped | Wait, or restart the dev server to clear the in-memory limiter. |
| Email never arrives | Resend's free tier sandbox sender (`onboarding@resend.dev`) landed in spam | Check your spam folder; long-term, verify a domain in Resend. |
| Captcha widget shows a yellow warning banner | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is empty | Set the site key, restart `pnpm dev`. |
