import fs from "fs";
import matter from "gray-matter";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

export type BlogPostListItem = BlogPostFrontmatter & {
  slug: string;
};

function isBlogPostFrontmatter(data: unknown): data is BlogPostFrontmatter {
  if (!data || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  return (
    typeof o.title === "string" &&
    typeof o.date === "string" &&
    typeof o.description === "string"
  );
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): BlogPostListItem[] {
  const slugs = getPostSlugs();
  const posts: BlogPostListItem[] = [];

  for (const slug of slugs) {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    if (!isBlogPostFrontmatter(data)) continue;
    posts.push({ slug, ...data });
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostSourceBySlug(slug: string): string | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

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
