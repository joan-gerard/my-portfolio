import type { BlogPostFrontmatter } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";
import { DetailsGrid, DetailsGridItem, Reveal, SectionBadge } from "../utils";

type Props = {
  frontmatter: BlogPostFrontmatter;
  readingMinutes: number;
};

/**
 * Portoz-style article header on a light surface.
 *
 * Mirrors the Portoz case-study detail layout: an eyebrow pill over a large
 * display heading, the post description as a lead paragraph, and an "Article
 * details" metadata grid (Published / Read time / Category) rendered like a
 * Portoz `Project details` block.
 */
export function BlogArticleHeader({ frontmatter, readingMinutes }: Props) {
  const category = frontmatter.tags?.[0] ?? "Article";

  return (
    <header className="mb-16 flex flex-col gap-8 md:gap-10">
      <Reveal>
        <SectionBadge tone="light">Blog</SectionBadge>
      </Reveal>

      <Reveal>
        <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--ink)] md:text-5xl lg:text-6xl">
          {frontmatter.title}
        </h1>
      </Reveal>

      {frontmatter.description ? (
        <Reveal>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">
            {frontmatter.description}
          </p>
        </Reveal>
      ) : null}

      <Reveal>
        <h2 className="mt-4 text-lg font-semibold text-[var(--ink)] md:text-xl">
          Article details
        </h2>
      </Reveal>

      <Reveal>
        <DetailsGrid tone="light">
          <DetailsGridItem tone="light" label="Published">
            <time dateTime={frontmatter.date}>
              {formatBlogDate(frontmatter.date)}
            </time>
          </DetailsGridItem>
          <DetailsGridItem tone="light" label="Read time">
            {readingMinutes} min read
          </DetailsGridItem>
          <DetailsGridItem tone="light" label="Category">
            {category}
          </DetailsGridItem>
        </DetailsGrid>
      </Reveal>
    </header>
  );
}
