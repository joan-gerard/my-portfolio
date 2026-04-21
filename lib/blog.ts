import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/** In production, posts with `draft: true` are hidden unless this env var is set. */
export function shouldIncludeDraftPosts(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.SHOW_BLOG_DRAFTS === "1" ||
    process.env.SHOW_BLOG_DRAFTS === "true"
  );
}

export type BlogPostFrontmatter = {
  title: string;
  date: string;
  description: string;
  /** When true, the post is omitted from /blog and /blog/[slug] in production. */
  draft?: boolean;
  tags?: string[];
};

export type BlogPostListItem = BlogPostFrontmatter & {
  slug: string;
};

export type GetAllPostsOptions = {
  includeDrafts?: boolean;
};

export function isBlogPostFrontmatter(
  data: unknown,
): data is BlogPostFrontmatter {
  if (!data || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  if (o.draft !== undefined && typeof o.draft !== "boolean") return false;
  if (o.tags !== undefined) {
    if (!Array.isArray(o.tags)) return false;
    if (!(o.tags as unknown[]).every((t) => typeof t === "string")) {
      return false;
    }
  }
  return (
    typeof o.title === "string" &&
    typeof o.date === "string" &&
    typeof o.description === "string"
  );
}

function isSafeBlogSlug(slug: string): boolean {
  if (!slug || slug.includes("..")) return false;
  if (path.basename(slug) !== slug) return false;
  return true;
}

function resolveBlogPostFilePath(slug: string): string | null {
  if (!isSafeBlogSlug(slug)) return null;
  const resolved = path.resolve(BLOG_DIR, `${slug}.mdx`);
  const blogRoot = path.resolve(BLOG_DIR);
  const relative = path.relative(blogRoot, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return resolved;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .filter((slug) => getPostSourceBySlug(slug) !== null);
}

export function getAllPosts(options?: GetAllPostsOptions): BlogPostListItem[] {
  const slugs = getPostSlugs();
  const posts: BlogPostListItem[] = [];
  const includeDrafts = options?.includeDrafts ?? shouldIncludeDraftPosts();

  for (const slug of slugs) {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    if (!isBlogPostFrontmatter(data)) continue;
    if (data.draft === true && !includeDrafts) continue;
    posts.push({ slug, ...data });
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostSourceBySlug(slug: string): string | null {
  const filePath = resolveBlogPostFilePath(slug);
  if (!filePath || !fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  if (!isBlogPostFrontmatter(data)) return null;
  if (data.draft === true && !shouldIncludeDraftPosts()) return null;
  return raw;
}

/**
 * Single parse + validation per slug per request (React.cache).
 * Returns MDX body without frontmatter for compileMDX with parseFrontmatter: false.
 */
export const loadPost = cache(
  (
    slug: string,
  ): { content: string; frontmatter: BlogPostFrontmatter } | null => {
    const filePath = resolveBlogPostFilePath(slug);
    if (!filePath || !fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    if (!isBlogPostFrontmatter(data)) return null;
    if (data.draft === true && !shouldIncludeDraftPosts()) return null;
    return { content, frontmatter: data };
  },
);

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Rough reading time from MDX/Markdown body (words ÷ 200 wpm, min 1). */
export function getReadingMinutesFromMdxSource(source: string): number {
  const { content } = matter(source);
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
