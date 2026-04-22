"use client";

import {
  contactSchema,
  type ContactFieldErrors,
  type ContactInput,
} from "@/lib/contact/schema";
import { mapContactFieldErrors } from "@/lib/contact/mapFieldErrors";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

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
  website_url: "",
};

type FormState = typeof initialFormState;

export function useContactForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const resetTurnstile = () => {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  const updateField =
    <K extends keyof FormState>(key: K) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [key]: event.target.value }));
      if (fieldErrors[key as keyof ContactFieldErrors]) {
        setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    setSubmitError(null);

    const payload: ContactInput = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      message: formState.message.trim(),
      website_url: formState.website_url,
      turnstileToken,
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setFieldErrors(mapContactFieldErrors(parsed.error));
      return;
    }

    isSubmittingRef.current = true;
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
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return {
    formState,
    fieldErrors,
    turnstileToken,
    setTurnstileToken,
    turnstileRef,
    status,
    submitError,
    isSubmitting: status === "submitting",
    canSubmit: turnstileToken.length > 0 && status !== "submitting",
    updateField,
    handleSubmit,
    setIdle: () => setStatus("idle"),
  };
}
