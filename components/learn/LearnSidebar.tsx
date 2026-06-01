"use client";

import type { LearnChapter, LearnCourse } from "@/constants/learnCourses";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiBook, FiChevronLeft, FiMenu, FiX } from "react-icons/fi";

type Props = {
  course: LearnCourse;
  activeChapterSlug: string;
};

function ChapterList({
  course,
  activeChapterSlug,
  onNavigate,
}: Props & { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label={`${course.title} chapters`}>
      <ul className="space-y-0.5">
        {course.chapters.map((chapter: LearnChapter, index: number) => {
          const href = `/learn/${course.slug}/${chapter.slug}`;
          const isActive =
            chapter.slug === activeChapterSlug || pathname === href;
          return (
            <li key={chapter.slug}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-[var(--accent-mid)]/10 text-[var(--ink)] font-semibold"
                    : "text-[var(--ink-muted)] hover:bg-black/[0.04] hover:text-[var(--ink)]",
                )}
              >
                <span
                  className={clsx(
                    "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[10px] font-bold tabular-nums transition-colors",
                    isActive
                      ? "bg-[var(--accent-mid)] text-white"
                      : "bg-black/[0.06] text-[var(--ink-subtle)] group-hover:bg-[var(--accent-mid)]/20 group-hover:text-[var(--ink)]",
                  )}
                  aria-hidden
                >
                  {index + 1}
                </span>
                <span className="leading-snug">{chapter.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Desktop sticky sidebar — hidden below xl */
export function LearnSidebarDesktop({ course, activeChapterSlug }: Props) {
  return (
    <aside className="hidden xl:block w-64 flex-none">
      <div className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col rounded-2xl border border-[var(--hairline-light)] bg-white/80 overflow-hidden">
        {/* Course header */}
        <div className="border-b border-[var(--hairline-light)] px-4 py-4">
          <Link
            href={`/learn/${course.slug}`}
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)] hover:text-[var(--ink)] transition-colors"
          >
            <FiBook className="text-sm flex-none" aria-hidden />
            <span className="line-clamp-2">{course.title}</span>
          </Link>
        </div>

        {/* Chapter list */}
        <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3">
          <ChapterList
            course={course}
            activeChapterSlug={activeChapterSlug}
          />
        </div>
      </div>
    </aside>
  );
}

/** Mobile sidebar — fixed bottom button that opens a drawer */
export function LearnSidebarMobile({ course, activeChapterSlug }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="xl:hidden">
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        id="learn-mobile-nav"
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-[min(18rem,calc(100vw-3rem))] bg-[var(--surface-light)] shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-[var(--hairline-light)] px-4 py-4">
            <Link
              href={`/learn/${course.slug}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)] hover:text-[var(--ink)] transition-colors"
            >
              <FiBook className="text-sm flex-none" aria-hidden />
              <span className="line-clamp-2">{course.title}</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chapter navigation"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              <FiX aria-hidden />
            </button>
          </div>

          {/* Chapter list */}
          <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3">
            <ChapterList
              course={course}
              activeChapterSlug={activeChapterSlug}
              onNavigate={() => setIsOpen(false)}
            />
          </div>

          {/* Footer */}
          <div className="border-t border-[var(--hairline-light)] px-4 py-3">
            <Link
              href="/learn"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-xs font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              <FiChevronLeft className="text-sm" aria-hidden />
              All courses
            </Link>
          </div>
        </div>
      </div>

      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="learn-mobile-nav"
        aria-label="Open chapter navigation"
        className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-white shadow-lg transition hover:bg-black"
      >
        <FiMenu className="text-lg" aria-hidden />
      </button>
    </div>
  );
}
