import type { BlogPostFrontmatter } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";
import { Chip } from "../utils";

type Props = {
  frontmatter: BlogPostFrontmatter;
  readingMinutes: number;
};

export function BlogArticleHeader({ frontmatter, readingMinutes }: Props) {
  return (
    <header className="border-b border-zinc-800/90 pb-10">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
        Blog
      </p>
      <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
        {frontmatter.title}
      </h1>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
        <time dateTime={frontmatter.date} className="text-zinc-400">
          {formatBlogDate(frontmatter.date)}
        </time>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <span>{readingMinutes} min read</span>
      </div>

      {frontmatter.tags && frontmatter.tags.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <Chip key={tag} tone="dark">
              {tag}
            </Chip>
          ))}
        </div>
      ) : null}
    </header>
  );
}
