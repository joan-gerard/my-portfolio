import type { LearnCourse } from "@/constants/learnCourses";
import Link from "next/link";
import { FiArrowUpRight, FiBook } from "react-icons/fi";

type Props = {
  course: LearnCourse;
  isLast?: boolean;
};

/**
 * Portoz-style row card for a course on the /learn index.
 * Mirrors the BlogPostCard layout: hairline top separator, large title,
 * chapter count, description, and arrow affordance.
 */
export function LearnCourseCard({ course, isLast = false }: Props) {
  const chapterCount = course.chapters.length;

  return (
    <li
      className={`border-t border-[var(--hairline-dark)] ${
        isLast ? "border-b" : ""
      }`}
    >
      <Link
        href={`/learn/${course.slug}`}
        className="group grid grid-cols-[1fr_auto] items-end gap-6 py-10 md:py-14"
      >
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm font-semibold uppercase tracking-[0.15em]">
            <span className="inline-flex items-center gap-1.5 text-[var(--ink-dark-muted)]">
              <FiBook className="text-sm" aria-hidden />
              {course.tags[0] ?? "Course"}
            </span>
            <span className="text-[var(--ink-dark-subtle)]">
              {chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white transition-colors group-hover:text-[var(--ink-dark-muted)]">
            {course.title}
          </h2>

          {/* Description */}
          {course.description ? (
            <p className="max-w-2xl text-sm md:text-base leading-relaxed text-[var(--ink-dark-muted)]">
              {course.description}
            </p>
          ) : null}

          {/* Chapter preview */}
          <p className="text-xs text-[var(--ink-dark-subtle)] tracking-wide">
            {course.chapters
              .slice(0, 4)
              .map((ch) => ch.title)
              .join(" · ")}
            {chapterCount > 4 ? " · …" : ""}
          </p>
        </div>

        <span
          className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full border border-[var(--hairline-dark)] text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[var(--ink)]"
          aria-hidden
        >
          <FiArrowUpRight className="text-xl" />
        </span>
      </Link>
    </li>
  );
}
