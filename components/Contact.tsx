"use client";

import { CtaButton, Reveal, SectionHeader } from "@/components/utils";
import { MAILTO_HREF, SITE_EMAIL, SOCIAL_LINKS } from "@/constants/site";
import {
  contactSchema,
  type ContactFieldErrors,
  type ContactInput,
} from "@/lib/contact/schema";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { AiFillMail } from "react-icons/ai";
import { z } from "zod";
import LinkedInIcon from "./utils/LinkedInIcon";

const inputBaseClass =
  "w-full border-0 border-b border-[var(--hairline-light)] bg-transparent py-3 text-base text-[var(--ink)] placeholder:text-[var(--ink-subtle)] focus:border-[var(--ink)] focus:outline-none focus:ring-0 transition-colors";

const inputErrorClass = "border-red-500 focus:border-red-500";

const labelClass = "text-sm font-medium text-[var(--ink-muted)]";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

interface ApiErrorBody {
  error?: string;
  fieldErrors?: ContactFieldErrors;
}

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  /** Honeypot — must stay empty. Real users can't see this field. */
  company: "",
};

type FormState = typeof initialFormState;

const Contact = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const updateField =
    <K extends keyof FormState>(key: K) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [key]: event.target.value }));
      // Clear the field-specific error on edit so the UI stays calm.
      if (fieldErrors[key as keyof ContactFieldErrors]) {
        setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const resetTurnstile = () => {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setSubmitError(null);

    const payload: ContactInput = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      message: formState.message.trim(),
      company: formState.company,
      turnstileToken,
    };

    // Client-side pre-flight so we give instant feedback without a network
    // round-trip. The server will re-validate regardless.
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = z.flattenError(parsed.error);
      const nextErrors: ContactFieldErrors = {};
      for (const [key, messages] of Object.entries(flat.fieldErrors)) {
        if (messages && messages.length > 0) {
          nextErrors[key as keyof ContactFieldErrors] = messages[0];
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
        if (body.fieldErrors) {
          setFieldErrors(body.fieldErrors);
        }
        setSubmitError(
          body.error ?? "Something went wrong. Please try again shortly.",
        );
        setStatus("error");
        resetTurnstile();
        return;
      }

      setStatus("success");
      setFormState(initialFormState);
      resetTurnstile();
    } catch (err) {
      console.error("[contact] network error", err);
      setSubmitError(
        "Could not reach the server. Check your connection and try again.",
      );
      setStatus("error");
      resetTurnstile();
    }
  };

  const isSubmitting = status === "submitting";
  const canSubmit = turnstileToken.length > 0 && !isSubmitting;

  return (
    <section
      id="contact"
      data-section-theme="light"
      className="bg-[var(--surface-light)] px-6 pt-16 pb-24 lg:px-24 xl:px-36"
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
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col gap-4"
              >
                <p className="text-[var(--ink)] font-medium">
                  Thanks — your message is on its way.
                </p>
                <p className="text-[var(--ink-muted)]">
                  I&apos;ll get back to you within 48 hours. In the meantime,
                  feel free to{" "}
                  <Link
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[var(--accent-mid)]"
                  >
                    say hi on LinkedIn
                  </Link>
                  .
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--ink-muted)] underline underline-offset-4 hover:text-[var(--ink)]"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                noValidate
              >
                <FormField
                  id="contact-name"
                  label="Name"
                  error={fieldErrors.name}
                >
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={updateField("name")}
                    className={fieldClass(inputBaseClass, fieldErrors.name)}
                  />
                </FormField>

                <FormField
                  id="contact-email"
                  label="Email"
                  error={fieldErrors.email}
                  required
                >
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="hello@mail.com"
                    value={formState.email}
                    onChange={updateField("email")}
                    className={fieldClass(inputBaseClass, fieldErrors.email)}
                  />
                </FormField>

                <FormField
                  id="contact-phone"
                  label="Phone"
                  error={fieldErrors.phone}
                >
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+(123) 456 789 00"
                    value={formState.phone}
                    onChange={updateField("phone")}
                    className={fieldClass(inputBaseClass, fieldErrors.phone)}
                  />
                </FormField>

                <FormField
                  id="contact-message"
                  label="Message"
                  error={fieldErrors.message}
                  required
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Type here..."
                    value={formState.message}
                    onChange={updateField("message")}
                    className={`${fieldClass(inputBaseClass, fieldErrors.message)} resize-none`}
                  />
                </FormField>

                {/*
                  Honeypot: off-screen, un-tabbable, invisible to screen readers.
                  Any value here means a bot filled it; the server silently
                  accepts the submission without sending anything.
                */}
                <div
                  aria-hidden
                  className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                >
                  <label>
                    Company
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.company}
                      onChange={updateField("company")}
                    />
                  </label>
                </div>

                {siteKey ? (
                  <div>
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={siteKey}
                      onSuccess={setTurnstileToken}
                      onExpire={() => setTurnstileToken("")}
                      onError={() => setTurnstileToken("")}
                      options={{ theme: "light", size: "flexible" }}
                    />
                    {fieldErrors.turnstileToken ? (
                      <p className="mt-2 text-sm text-red-600">
                        {fieldErrors.turnstileToken}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    Captcha is not configured — set{" "}
                    <code className="font-mono">
                      NEXT_PUBLIC_TURNSTILE_SITE_KEY
                    </code>{" "}
                    to enable submissions.
                  </p>
                )}

                {submitError ? (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                  >
                    {submitError}
                  </p>
                ) : null}

                <div className="pt-2">
                  <CtaButton
                    surface="light"
                    showArrow
                    type="submit"
                    disabled={!canSubmit || !siteKey}
                  >
                    {isSubmitting ? "Sending…" : "Submit now"}
                  </CtaButton>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

function fieldClass(base: string, error?: string): string {
  return error ? `${base} ${inputErrorClass}` : base;
}

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

/**
 * Wraps an input with its label + (optional) inline error message.
 * Kept local to this file since no other form in the codebase reuses it yet.
 */
function FormField({ id, label, error, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? (
          <span className="ml-1 text-[var(--accent-mid)]" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Contact;
