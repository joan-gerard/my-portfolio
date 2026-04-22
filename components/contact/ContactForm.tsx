import { CtaButton } from "@/components/utils";
import { type ContactFieldErrors } from "@/lib/contact/schema";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import type { ChangeEvent, FormEvent, RefObject } from "react";
import { FormField } from "./FormField";

const inputBaseClass =
  "w-full border-0 border-b border-[var(--hairline-light)] bg-transparent py-3 text-base text-[var(--ink)] placeholder:text-[var(--ink-subtle)] focus:border-[var(--ink)] focus:outline-none focus:ring-0 transition-colors";

const inputErrorClass = "border-red-500 focus:border-red-500";

function fieldClass(base: string, error?: string): string {
  return error ? `${base} ${inputErrorClass}` : base;
}

interface ContactFormProps {
  formState: {
    name: string;
    email: string;
    phone: string;
    message: string;
    website_url: string;
  };
  fieldErrors: ContactFieldErrors;
  submitError: string | null;
  isSubmitting: boolean;
  canSubmit: boolean;
  siteKey: string;
  turnstileRef: RefObject<TurnstileInstance | null>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onFieldChange: <K extends "name" | "email" | "phone" | "message" | "website_url">(
    key: K,
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTurnstileSuccess: (token: string) => void;
  onTurnstileExpire: () => void;
  onTurnstileError: () => void;
}

export function ContactForm({
  formState,
  fieldErrors,
  submitError,
  isSubmitting,
  canSubmit,
  siteKey,
  turnstileRef,
  onSubmit,
  onFieldChange,
  onTurnstileSuccess,
  onTurnstileExpire,
  onTurnstileError,
}: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      <FormField id="contact-name" label="Name" error={fieldErrors.name}>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={formState.name}
          onChange={onFieldChange("name")}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          aria-invalid={fieldErrors.name ? true : undefined}
          className={fieldClass(inputBaseClass, fieldErrors.name)}
        />
      </FormField>

      <FormField id="contact-email" label="Email" error={fieldErrors.email} required>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="hello@mail.com"
          value={formState.email}
          onChange={onFieldChange("email")}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          aria-invalid={fieldErrors.email ? true : undefined}
          className={fieldClass(inputBaseClass, fieldErrors.email)}
        />
      </FormField>

      <FormField id="contact-phone" label="Phone" error={fieldErrors.phone}>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="+(123) 456 789 00"
          value={formState.phone}
          onChange={onFieldChange("phone")}
          aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
          aria-invalid={fieldErrors.phone ? true : undefined}
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
          onChange={onFieldChange("message")}
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
          aria-invalid={fieldErrors.message ? true : undefined}
          className={`${fieldClass(inputBaseClass, fieldErrors.message)} resize-none`}
        />
      </FormField>

      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            value={formState.website_url}
            onChange={onFieldChange("website_url")}
          />
        </label>
      </div>

      {siteKey ? (
        <div>
          <Turnstile
            ref={turnstileRef}
            siteKey={siteKey}
            onSuccess={onTurnstileSuccess}
            onExpire={onTurnstileExpire}
            onError={onTurnstileError}
            options={{ theme: "light", size: "flexible" }}
          />
          {fieldErrors.turnstileToken ? (
            <p className="mt-2 text-sm text-red-600">{fieldErrors.turnstileToken}</p>
          ) : null}
        </div>
      ) : (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Captcha is not configured — set{" "}
          <code className="font-mono">NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> to
          enable submissions.
        </p>
      )}

      {submitError ? (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
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
  );
}
