type Props = {
  isFromKodeKloud?: boolean;
};

/**
 * Small provenance note for posts that are primarily course notes.
 */
export function BlogSourceDisclaimer({ isFromKodeKloud }: Props) {
  if (!isFromKodeKloud) return null;

  return (
    <aside
      aria-label="Content source notice"
      className="rounded-xl border border-(--hairline-light) bg-black/2 px-3 py-2 text-xs leading-relaxed text-(--ink-subtle) md:px-4 md:py-3 md:text-sm"
    >
      Most notes in this article were written while following the{" "}
      <a
        href="https://kodekloud.com/"
        target="_blank"
        rel="noreferrer"
        className="font-medium text-(--ink) underline decoration-(--accent-mid) underline-offset-4 transition-colors hover:text-(--accent-mid)"
      >
        KodeKloud
      </a>{" "}
      course and are shared here as personal study notes.
    </aside>
  );
}
