import type { BlogPostFrontmatter } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";
import { DetailsGrid, DetailsGridItem, Reveal, SectionBadge } from "../utils";

type Props = {
  frontmatter: BlogPostFrontmatter;
  readingMinutes: number;
  seriesLabel?: string;
};

/**
 * Portoz-style article header on a light surface.
 *
 * Mirrors the Portoz case-study detail layout: an eyebrow pill over a large
 * display heading, the post description as a lead paragraph, and an "Article
 * details" metadata grid (Published / Read time / Category) rendered like a
 * Portoz `Project details` block.
 */
export function BlogArticleHeader({
  frontmatter,
  readingMinutes,
  seriesLabel,
}: Props) {
  const category = frontmatter.tags?.[0] ?? "Article";

  return (
    <header className="mb-6 flex flex-col gap-5 md:mb-10 md:gap-8">
      <Reveal>
        <SectionBadge tone="light">Blog</SectionBadge>
      </Reveal>

      <Reveal>
        <h1 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-tight text-(--ink) md:text-5xl lg:text-6xl">
          {frontmatter.title}
        </h1>
      </Reveal>

      {seriesLabel ? (
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-subtle) md:text-sm">
            {seriesLabel}
          </p>
        </Reveal>
      ) : null}

      {frontmatter.description ? (
        <Reveal>
          <p className="max-w-2xl text-sm leading-relaxed text-(--ink-muted) md:text-lg">
            {frontmatter.description}
          </p>
        </Reveal>
      ) : null}

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
