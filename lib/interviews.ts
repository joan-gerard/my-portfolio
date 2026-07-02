import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

const INTERVIEW_DIR = path.join(process.cwd(), "content/interview-prep");

export type InterviewFrontmatter = {
  title: string;
  date: string;
  description: string;
  draft?: boolean;
  tags?: string[];
};

export type InterviewListItem = InterviewFrontmatter & {
  slug: string;
};

function isInterviewFrontmatter(data: unknown): data is InterviewFrontmatter {
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

function isSafeInterviewSlug(slug: string): boolean {
  if (!slug || slug.includes("..")) return false;
  if (path.basename(slug) !== slug) return false;
  return true;
}

function resolveInterviewFilePath(slug: string): string | null {
  if (!isSafeInterviewSlug(slug)) return null;
  const resolved = path.resolve(INTERVIEW_DIR, `${slug}.mdx`);
  const root = path.resolve(INTERVIEW_DIR);
  const relative = path.relative(root, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return resolved;
}

export function getInterviewSlugs(): string[] {
  if (!fs.existsSync(INTERVIEW_DIR)) return [];
  return fs
    .readdirSync(INTERVIEW_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .filter((slug) => getInterviewSourceBySlug(slug) !== null);
}

/** Private prep route — drafts are always visible. */
export function getAllInterviews(): InterviewListItem[] {
  const slugs = getInterviewSlugs();
  const interviews: InterviewListItem[] = [];

  for (const slug of slugs) {
    const filePath = path.join(INTERVIEW_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    if (!isInterviewFrontmatter(data)) continue;
    interviews.push({ slug, ...data });
  }

  return interviews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getInterviewSourceBySlug(slug: string): string | null {
  const filePath = resolveInterviewFilePath(slug);
  if (!filePath || !fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  if (!isInterviewFrontmatter(data)) return null;
  return raw;
}

export const loadInterview = cache(
  (
    slug: string,
  ): { content: string; frontmatter: InterviewFrontmatter } | null => {
    const filePath = resolveInterviewFilePath(slug);
    if (!filePath || !fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    if (!isInterviewFrontmatter(data)) return null;
    return { content, frontmatter: data };
  },
);

export function formatInterviewDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function parseInterviewTitle(title: string): {
  company: string;
  subtitle: string;
} {
  const parts = title.split(" - ");
  if (parts.length >= 2) {
    return { company: parts[0].trim(), subtitle: parts.slice(1).join(" - ").trim() };
  }
  return { company: title, subtitle: "" };
}
