import { z } from "zod";
import type { ContactFieldErrors } from "./schema";

/**
 * Keeps only the first error message for each field from a Zod error.
 */
export function mapContactFieldErrors(error: z.ZodError): ContactFieldErrors {
  const flat = z.flattenError(error);
  const rawFieldErrors = flat.fieldErrors as Record<string, string[] | undefined>;
  const fieldErrors: ContactFieldErrors = {};

  for (const [key, messages] of Object.entries(rawFieldErrors)) {
    if (messages && messages.length > 0) {
      fieldErrors[key as keyof ContactFieldErrors] = messages[0];
    }
  }

  return fieldErrors;
}
