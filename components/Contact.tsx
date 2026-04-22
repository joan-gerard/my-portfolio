"use client";

import { Reveal, SectionHeader } from "@/components/utils";
import { MAILTO_HREF, SITE_EMAIL, SOCIAL_LINKS } from "@/constants/site";
import Link from "next/link";
import { AiFillMail } from "react-icons/ai";
import { ContactForm } from "./contact/ContactForm";
import { ContactSuccessState } from "./contact/ContactSuccessState";
import { useContactForm } from "./contact/useContactForm";
import LinkedInIcon from "./utils/LinkedInIcon";

const Contact = () => {
  const {
    formState,
    fieldErrors,
    turnstileRef,
    status,
    submitError,
    isSubmitting,
    canSubmit,
    setTurnstileToken,
    updateField,
    handleSubmit,
    setIdle,
  } = useContactForm();

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  return (
    <section
      id="contact"
      data-section-theme="light"
      className="bg-[var(--surface-light)] px-6 pt-10 pb-24 md:pt-16 lg:px-24 xl:px-36"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeader
            tone="light"
            eyebrow="Let's talk about your next project"
            title="Let's create amazing stuff together!"
            kicker="Have a project in mind? Looking to partner or work together? Reach out through the form and I'll get back to you within 48 hours."
          />
          <Reveal width="w-full">
            <ul className="flex flex-col gap-4 text-[var(--ink)]">
              <li>
                <Link
                  href={MAILTO_HREF}
                  className="inline-flex items-center gap-3 text-base md:text-lg font-medium underline underline-offset-4 hover:text-[var(--accent-mid)] transition-colors"
                >
                  <AiFillMail className="text-xl text-[var(--accent-mid)]" />
                  {SITE_EMAIL}
                </Link>
              </li>
              <li>
                <Link
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base md:text-lg font-medium underline underline-offset-4 hover:text-[var(--accent-mid)] transition-colors"
                >
                  <LinkedInIcon className="w-[1em] h-[1em] text-[var(--accent-mid)]" />
                  Find me on LinkedIn
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal width="w-full">
          <div className="rounded-3xl border border-[var(--hairline-light)] bg-white p-6 md:p-10 shadow-sm">
            <h3 className="text-xl md:text-2xl font-extrabold text-[var(--ink)] mb-6">
              Send a message
            </h3>
            {status === "success" ? (
              <ContactSuccessState onReset={setIdle} />
            ) : (
              <ContactForm
                formState={formState}
                fieldErrors={fieldErrors}
                submitError={submitError}
                isSubmitting={isSubmitting}
                canSubmit={canSubmit}
                siteKey={siteKey}
                turnstileRef={turnstileRef}
                onSubmit={handleSubmit}
                onFieldChange={updateField}
                onTurnstileSuccess={setTurnstileToken}
                onTurnstileExpire={() => setTurnstileToken("")}
                onTurnstileError={() => setTurnstileToken("")}
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
