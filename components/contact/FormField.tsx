import type { ReactNode } from "react";

const labelClass = "text-sm font-medium text-[var(--ink-muted)]";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Shared input wrapper used by the contact form fields.
 */
export function FormField({
  id,
  label,
  error,
  required,
  children,
}: FormFieldProps) {
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
