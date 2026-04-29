import { BlogArticleHeader } from "@/components/blog/BlogArticleHeader";
import { BlogSourceDisclaimer } from "@/components/blog/BlogSourceDisclaimer";
import { BlogToc } from "@/components/blog/BlogToc";
import { BlogTocMobile } from "@/components/blog/BlogTocMobile";
import { blogMdxComponents } from "@/components/mdx/blog-mdx-components";
import { CtaButton } from "@/components/utils";
import { getBlogSeriesByKey } from "@/constants/blogSeries";
import {
  getPostSlugs,
  getReadingMinutesFromMdxSource,
  loadPost,
  type BlogPostFrontmatter,
} from "@/lib/blog";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) {
    return { title: "Post not found" };
  }
  const fm = post.frontmatter;
  return {
    title: `${fm.title} | Blog`,
    description: fm.description,
  };
}

/**
 * Prose styling for the rendered MDX body on a light Portoz-style surface.
 *
 * Uses the site's design tokens (`--ink`, `--ink-muted`, `--hairline-light`,
 * `--accent-mid`) so the article reads like part of the Portoz case-study
 * page family rather than the old indigo/zinc palette.
 */
const articleBodyClassName =
  "max-w-none overflow-x-auto text-[var(--ink-muted)] " +
  "[&_a]:font-medium [&_a]:text-[var(--ink)] [&_a]:underline [&_a]:decoration-[var(--accent-mid)] [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:text-[var(--accent-mid)] " +
  "[&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:scroll-mt-28 [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-[var(--ink)] " +
  "[&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[var(--ink)] " +
  "[&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[var(--ink)] " +
  "[&_p]:leading-relaxed [&_p]:text-[var(--ink-muted)] [&_p]:my-5 " +
  "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-2 [&_ul_li]:marker:text-[var(--accent-mid)] " +
  "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol_li]:marker:text-[var(--ink-subtle)] " +
  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent-mid)] [&_blockquote]:bg-black/[0.03] [&_blockquote]:py-1 [&_blockquote]:pl-6 [&_blockquote]:pr-4 [&_blockquote]:text-[var(--ink)] [&_blockquote]:italic " +
  "[&_hr]:my-14 [&_hr]:border-[var(--hairline-light)] " +
  "[&_strong]:font-semibold [&_strong]:text-[var(--ink)] " +
  "[&_table]:my-8 [&_table]:w-full [&_table]:min-w-[20rem] [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm sm:[&_table]:text-base " +
  "[&_th]:border-b [&_th]:border-[var(--hairline-light)] [&_th]:bg-black/[0.04] [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[var(--ink)] " +
  "[&_td]:border-b [&_td]:border-[var(--hairline-light)] [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-[var(--ink-muted)] " +
  "[&_tbody_tr:last-child_td]:border-b-0";

type TocItem = {
  id: string;
  label: string;
};

type SeriesNavigation = {
  label: string;
  previous: { slug: string; label: string } | null;
  next: { slug: string; label: string } | null;
  hub: { slug: string; title: string } | null;
};

function extractH2TocItems(mdxSource: string): TocItem[] {
  const h2WithIdRegex = /<h2\s+id="([^"]+)">([\s\S]*?)<\/h2>/g;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null = h2WithIdRegex.exec(mdxSource);

  while (match) {
    const id = match[1]?.trim();
    const label = match[2]?.replace(/<[^>]+>/g, "").trim();
    if (id && label) {
      items.push({ id, label });
    }
    match = h2WithIdRegex.exec(mdxSource);
  }

  return items;
}

function getSeriesNavigation(
  slug: string,
  frontmatter: BlogPostFrontmatter,
): SeriesNavigation | null {
  const series = getBlogSeriesByKey(frontmatter.seriesKey);
  if (!series) return null;

  const isHub = slug === series.hubSlug;
  if (isHub) {
    return {
      label: `Series hub • ${series.parts.length} parts`,
      previous: null,
      next: series.parts.length
        ? {
            slug: series.parts[0].slug,
            label: `Part 1: ${series.parts[0].label}`,
          }
        : null,
      hub: null,
    };
  }

  const index = series.parts.findIndex((part) => part.slug === slug);
  if (index < 0) return null;
  const currentPart = series.parts[index];
  const previousPart = index > 0 ? series.parts[index - 1] : null;
  const nextPart =
    index < series.parts.length - 1 ? series.parts[index + 1] : null;

  return {
    label: `Part ${currentPart.part} of ${series.parts.length}`,
    previous: previousPart
      ? {
          slug: previousPart.slug,
          label: `Part ${previousPart.part}: ${previousPart.label}`,
        }
      : null,
    next: nextPart
      ? {
          slug: nextPart.slug,
          label: `Part ${nextPart.part}: ${nextPart.label}`,
        }
      : null,
    hub: {
      slug: series.hubSlug,
      title: series.title,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) {
    notFound();
  }

  const readingMinutes = getReadingMinutesFromMdxSource(post.content);
  const tocItems = extractH2TocItems(post.content);
  const seriesNavigation = getSeriesNavigation(slug, post.frontmatter);

  const { content } = await compileMDX<BlogPostFrontmatter>({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: blogMdxComponents,
  });

  return (
    <main
      data-section-theme="light"
      className="min-h-screen bg-(--surface-light) text-(--ink)"
    >
      <div className="mx-auto w-full max-w-6xl px-5 pt-24 pb-20 md:px-6 md:pt-36 md:pb-24 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:gap-14 xl:grid-cols-[minmax(0,1fr)_17rem]">
          <article className="min-w-0 xl:max-w-3xl">
            <BlogArticleHeader
              frontmatter={post.frontmatter}
              readingMinutes={readingMinutes}
              seriesLabel={seriesNavigation?.label}
            />

            <BlogSourceDisclaimer
              isFromKodeKloud={post.frontmatter.notesFromKodeKloud}
            />

            <div className={articleBodyClassName}>{content}</div>

            <footer className="mt-16 border-t border-(--hairline-light) pt-8 md:mt-24 md:pt-12">
              {seriesNavigation ? (
                <section className="mb-8 rounded-2xl border border-(--hairline-light) bg-white/60 p-4 md:p-5">
                  {seriesNavigation.hub ? (
                    <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-subtle)">
                        Part of a series:{" "}
                        <Link
                          href={`/blog/${seriesNavigation.hub.slug}`}
                          className="text-sm font-semibold normal-case tracking-normal text-(--ink) underline decoration-(--accent-mid) underline-offset-4 transition-colors hover:text-(--accent-mid)"
                        >
                          {seriesNavigation.hub.title}
                        </Link>
                      </p>
                    </div>
                  ) : null}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {seriesNavigation.previous ? (
                      <Link
                        href={`/blog/${seriesNavigation.previous.slug}`}
                        className="group rounded-xl border border-(--hairline-light) bg-(--surface-light) px-4 py-3 transition-colors hover:border-(--accent-mid)"
                      >
                        <span className="mb-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-(--ink-subtle)">
                          <FiArrowLeft aria-hidden className="text-sm" />
                          Previous
                        </span>
                        <span className="block text-sm font-semibold text-(--ink) md:text-base">
                          {seriesNavigation.previous.label}
                        </span>
                      </Link>
                    ) : (
                      <div className="hidden sm:block" />
                    )}

                    {seriesNavigation.next ? (
                      <Link
                        href={`/blog/${seriesNavigation.next.slug}`}
                        className="group rounded-xl border border-(--hairline-light) bg-(--surface-light) px-4 py-3 transition-colors hover:border-(--accent-mid)"
                      >
                        <span className="mb-1 flex items-center justify-end gap-2 text-right text-xs font-semibold uppercase tracking-[0.08em] text-(--ink-subtle)">
                          Next
                          <span aria-hidden>→</span>
                        </span>
                        <span className="block text-right text-sm font-semibold text-(--ink) md:text-base">
                          {seriesNavigation.next.label}
                        </span>
                      </Link>
                    ) : (
                      <div className="hidden sm:block" />
                    )}
                  </div>
                </section>
              ) : null}

              <CtaButton
                href="/blog"
                surface="light"
                variant="outline"
                showArrow={false}
              >
                <span className="inline-flex items-center gap-2">
                  <FiArrowLeft className="text-base" aria-hidden />
                  Back to blog
                </span>
              </CtaButton>
            </footer>
          </article>

          {tocItems.length > 0 ? (
            <aside className="hidden xl:block">
              <div className="sticky top-28 rounded-2xl border border-(--hairline-light) bg-white/70 p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-subtle)">
                  On this page
                </p>
                <BlogToc items={tocItems} />
              </div>
            </aside>
          ) : null}
        </div>
      </div>
      <BlogTocMobile items={tocItems} />
    </main>
  );
}
