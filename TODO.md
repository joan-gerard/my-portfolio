# To-Do

- [ ] Review mobile responsiveness
- [ ] Do overall refactoring
- [ ] Review Coderabbit feedback
- [ ] Verify a sending domain in Resend and update `CONTACT_FROM_EMAIL` in Vercel (currently defaults to `onboarding@resend.dev`)
- [ ] Swap contact-form rate limiter to Upstash Redis if abuse appears in logs (see `lib/contact/rate-limit.ts`)
