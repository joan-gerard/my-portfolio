import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";
import {
  getCourseBySlug,
  learnCourses,
  type LearnChapter,
  type LearnCourse,
} from "@/constants/learnCourses";

const LEARN_DIR = path.join(process.cwd(), "content/learn");

export type LearnChapterFrontmatter = {
  title: string;
  description: string;
  draft?: boolean;
};

export type LearnChapterNeighbour = {
  slug: string;
  title: string;
};

export type LearnChapterWithNav = {
  course: LearnCourse;
  chapter: LearnChapter;
  content: string;
  frontmatter: LearnChapterFrontmatter;
  previous: LearnChapterNeighbour | null;
  next: LearnChapterNeighbour | null;
};

function isLearnChapterFrontmatter(
  data: unknown,
): data is LearnChapterFrontmatter {
  if (!data || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  return typeof o.title === "string" && typeof o.description === "string";
}

function chapterFilePath(courseSlug: string, chapterSlug: string): string {
  return path.join(LEARN_DIR, courseSlug, `${chapterSlug}.mdx`);
}

/** All courses with their registry definitions — no filesystem reads. */
export function getAllCourses(): LearnCourse[] {
  return learnCourses;
}

/**
 * Load and parse a single chapter MDX file.
 * Returns null when the file is missing or has invalid frontmatter.
 * Wrapped in React.cache so repeated calls within the same request are free.
 */
export const loadChapter = cache(
  (
    courseSlug: string,
    chapterSlug: string,
  ): { content: string; frontmatter: LearnChapterFrontmatter } | null => {
    const filePath = chapterFilePath(courseSlug, chapterSlug);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    if (!isLearnChapterFrontmatter(data)) return null;
    if (data.draft === true && process.env.NODE_ENV !== "development") {
      return null;
    }
    return { content, frontmatter: data };
  },
);

/**
 * Full chapter context used by the chapter page, including adjacent-chapter
 * navigation links derived from the registry order.
 */
export function loadChapterWithNav(
  courseSlug: string,
  chapterSlug: string,
): LearnChapterWithNav | null {
  const course = getCourseBySlug(courseSlug);
  if (!course) return null;

  const chapterIndex = course.chapters.findIndex(
    (ch) => ch.slug === chapterSlug,
  );
  if (chapterIndex < 0) return null;

  const loaded = loadChapter(courseSlug, chapterSlug);
  if (!loaded) return null;

  const previousChapter =
    chapterIndex > 0 ? course.chapters[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < course.chapters.length - 1
      ? course.chapters[chapterIndex + 1]
      : null;

  return {
    course,
    chapter: course.chapters[chapterIndex],
    content: loaded.content,
    frontmatter: loaded.frontmatter,
    previous: previousChapter
      ? { slug: previousChapter.slug, title: previousChapter.title }
      : null,
    next: nextChapter
      ? { slug: nextChapter.slug, title: nextChapter.title }
      : null,
  };
}

/**
 * Generate Next.js static params for all course + chapter combinations
 * where an MDX file actually exists on disk.
 */
export function generateLearnStaticParams(): {
  courseSlug: string;
  chapterSlug: string;
}[] {
  return learnCourses.flatMap((course) =>
    course.chapters
      .filter((ch) => fs.existsSync(chapterFilePath(course.slug, ch.slug)))
      .map((ch) => ({ courseSlug: course.slug, chapterSlug: ch.slug })),
  );
}

/** Rough reading time from MDX/Markdown body (words ÷ 200 wpm, min 1). */
export function getReadingMinutes(mdxContent: string): number {
  const words = mdxContent.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
