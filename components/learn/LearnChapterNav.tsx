import type { LearnChapterNeighbour } from "@/lib/learn";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

type Props = {
  courseSlug: string;
  previous: LearnChapterNeighbour | null;
  next: LearnChapterNeighbour | null;
  courseTitle: string;
};

/**
 * Prev / Next chapter navigation footer rendered at the bottom of every
 * chapter page.
 */
export function LearnChapterNav({
  courseSlug,
  previous,
  next,
  courseTitle,
}: Props) {
  return (
    <section
      aria-label="Chapter navigation"
      className="mt-16 border-t border-[var(--hairline-light)] pt-8 md:mt-24 md:pt-12"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
          Part of:{" "}
          <Link
            href={`/learn/${courseSlug}`}
            className="normal-case tracking-normal font-semibold text-sm text-[var(--ink)] underline decoration-[var(--accent-mid)] underline-offset-4 transition-colors hover:text-[var(--accent-mid)]"
          >
            {courseTitle}
          </Link>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/learn/${courseSlug}/${previous.slug}`}
            className="group rounded-xl border border-[var(--hairline-light)] bg-[var(--surface-light)] px-4 py-3 transition-colors hover:border-[var(--accent-mid)]"
          >
            <span className="mb-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-subtle)]">
              <FiArrowLeft aria-hidden className="text-sm" />
              Previous
            </span>
            <span className="block text-sm font-semibold text-[var(--ink)] md:text-base">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next ? (
          <Link
            href={`/learn/${courseSlug}/${next.slug}`}
            className="group rounded-xl border border-[var(--hairline-light)] bg-[var(--surface-light)] px-4 py-3 transition-colors hover:border-[var(--accent-mid)]"
          >
            <span className="mb-1 flex items-center justify-end gap-2 text-right text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-subtle)]">
              Next
              <span aria-hidden>→</span>
            </span>
            <span className="block text-right text-sm font-semibold text-[var(--ink)] md:text-base">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </section>
  );
}
