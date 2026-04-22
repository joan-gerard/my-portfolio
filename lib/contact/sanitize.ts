/**
 * Removes line breaks from values placed in email headers (Subject, Reply-To).
 * Mitigates header-injection if a value ever bypasses stricter validation.
 */
export function singleLineForEmailHeader(value: string): string {
  return value.replace(/[\r\n\v\f\u2028\u2029]+/g, " ");
}
