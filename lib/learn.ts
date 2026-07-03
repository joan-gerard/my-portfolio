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
const LEARN_ARTICLES_DIR = path.join(LEARN_DIR, "articles");
const LEARN_CHEATSHEET_DIR = path.join(LEARN_DIR, "cheatsheet");

export type LearnChapterFrontmatter = {
  title: string;
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
  if (o.draft !== undefined && typeof o.draft !== "boolean") return false;
  return typeof o.title === "string";
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

// ---------------------------------------------------------------------------
// Standalone learn articles  (/learn/articles/[slug])
// ---------------------------------------------------------------------------

export type LearnArticleFrontmatter = {
  title: string;
  description: string;
  draft?: boolean;
  tags?: string[];
  notesFromKodeKloud?: boolean;
};

export type LearnArticleListItem = LearnArticleFrontmatter & { slug: string };

function isLearnArticleFrontmatter(
  data: unknown,
): data is LearnArticleFrontmatter {
  if (!data || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  if (o.draft !== undefined && typeof o.draft !== "boolean") return false;
  if (
    o.notesFromKodeKloud !== undefined &&
    typeof o.notesFromKodeKloud !== "boolean"
  )
    return false;
  if (o.tags !== undefined) {
    if (!Array.isArray(o.tags)) return false;
    if (!(o.tags as unknown[]).every((t) => typeof t === "string")) return false;
  }
  return typeof o.title === "string" && typeof o.description === "string";
}

/** All published standalone learn articles, sorted alphabetically by title. */
export function getAllArticles(): LearnArticleListItem[] {
  if (!fs.existsSync(LEARN_ARTICLES_DIR)) return [];
  const slugs = fs
    .readdirSync(LEARN_ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  const articles: LearnArticleListItem[] = [];
  for (const slug of slugs) {
    const raw = fs.readFileSync(
      path.join(LEARN_ARTICLES_DIR, `${slug}.mdx`),
      "utf8",
    );
    const { data } = matter(raw);
    if (!isLearnArticleFrontmatter(data)) continue;
    if (data.draft === true && process.env.NODE_ENV !== "development") continue;
    articles.push({ slug, ...data });
  }
  return articles.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Load and parse a single standalone learn article.
 * Wrapped in React.cache so repeated calls within the same request are free.
 */
export const loadArticle = cache(
  (
    slug: string,
  ): { content: string; frontmatter: LearnArticleFrontmatter } | null => {
    const filePath = path.join(LEARN_ARTICLES_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    if (!isLearnArticleFrontmatter(data)) return null;
    if (data.draft === true && process.env.NODE_ENV !== "development")
      return null;
    return { content, frontmatter: data };
  },
);

/** Generate Next.js static params for all published standalone articles. */
export function generateArticleStaticParams(): { slug: string }[] {
  if (!fs.existsSync(LEARN_ARTICLES_DIR)) return [];
  return fs
    .readdirSync(LEARN_ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

// ---------------------------------------------------------------------------
// Learn cheatsheets  (/learn/cheatsheet/[slug])
// ---------------------------------------------------------------------------

export type LearnCheatsheetFrontmatter = LearnArticleFrontmatter;
export type LearnCheatsheetListItem = LearnCheatsheetFrontmatter & { slug: string };

/** All published learn cheatsheets, sorted alphabetically by title. */
export function getAllCheatsheets(): LearnCheatsheetListItem[] {
  if (!fs.existsSync(LEARN_CHEATSHEET_DIR)) return [];
  const slugs = fs
    .readdirSync(LEARN_CHEATSHEET_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  const cheatsheets: LearnCheatsheetListItem[] = [];
  for (const slug of slugs) {
    const raw = fs.readFileSync(
      path.join(LEARN_CHEATSHEET_DIR, `${slug}.mdx`),
      "utf8",
    );
    const { data } = matter(raw);
    if (!isLearnArticleFrontmatter(data)) continue;
    if (data.draft === true && process.env.NODE_ENV !== "development") continue;
    cheatsheets.push({ slug, ...data });
  }
  return cheatsheets.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Load and parse a single learn cheatsheet.
 * Wrapped in React.cache so repeated calls within the same request are free.
 */
export const loadCheatsheet = cache(
  (
    slug: string,
  ): { content: string; frontmatter: LearnCheatsheetFrontmatter } | null => {
    const filePath = path.join(LEARN_CHEATSHEET_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    if (!isLearnArticleFrontmatter(data)) return null;
    if (data.draft === true && process.env.NODE_ENV !== "development")
      return null;
    return { content, frontmatter: data };
  },
);

/** Generate Next.js static params for all published learn cheatsheets. */
export function generateCheatsheetStaticParams(): { slug: string }[] {
  if (!fs.existsSync(LEARN_CHEATSHEET_DIR)) return [];
  return fs
    .readdirSync(LEARN_CHEATSHEET_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}
