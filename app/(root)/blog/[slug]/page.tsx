import { BlogArticleHeader } from "@/components/blog/BlogArticleHeader";
import { BlogToc } from "@/components/blog/BlogToc";
import { BlogTocMobile } from "@/components/blog/BlogTocMobile";
import { blogMdxComponents } from "@/components/mdx/blog-mdx-components";
import { CtaButton } from "@/components/utils";
import {
  getPostSlugs,
  getReadingMinutesFromMdxSource,
  loadPost,
  type BlogPostFrontmatter,
} from "@/lib/blog";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
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
  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent-mid)] [&_blockquote]:bg-black/[0.03] [&_blockquote]:py-3 [&_blockquote]:pl-6 [&_blockquote]:pr-4 [&_blockquote]:text-[var(--ink)] [&_blockquote]:italic " +
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) {
    notFound();
  }

  const readingMinutes = getReadingMinutesFromMdxSource(post.content);
  const tocItems = extractH2TocItems(post.content);

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
      className="min-h-screen bg-[var(--surface-light)] text-[var(--ink)]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:pt-40 lg:px-8">
        <div className="grid grid-cols-1 gap-16 xl:grid-cols-[minmax(0,1fr)_17rem]">
          <article className="min-w-0 xl:max-w-3xl">
            <BlogArticleHeader
              frontmatter={post.frontmatter}
              readingMinutes={readingMinutes}
            />

            <div className={articleBodyClassName}>{content}</div>

            <footer className="mt-24 border-t border-[var(--hairline-light)] pt-12">
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
              <div className="sticky top-28 rounded-2xl border border-[var(--hairline-light)] bg-white/70 p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
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
