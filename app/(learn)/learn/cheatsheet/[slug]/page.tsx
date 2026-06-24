import { BlogSourceDisclaimer } from "@/components/blog/BlogSourceDisclaimer";
import { BlogToc } from "@/components/blog/BlogToc";
import { BlogTocMobile } from "@/components/blog/BlogTocMobile";
import { blogMdxComponents } from "@/components/mdx/blog-mdx-components";
import { Reveal, SectionBadge } from "@/components/utils";
import {
  generateCheatsheetStaticParams,
  getReadingMinutes,
  loadCheatsheet,
} from "@/lib/learn";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return generateCheatsheetStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cheatsheet = loadCheatsheet(slug);
  if (!cheatsheet) return { title: "Cheatsheet not found" };
  return {
    title: `${cheatsheet.frontmatter.title} | Learn`,
    description: cheatsheet.frontmatter.description,
  };
}

const cheatsheetBodyClassName =
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

type TocItem = { id: string; label: string; level: 2 | 3 };

function slugifyHeadingLabel(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractTocItems(mdxSource: string): TocItem[] {
  const headingRegex =
    /<(h[23])(?:\s+[^>]*)?>([\s\S]*?)<\/\1>|^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null = headingRegex.exec(mdxSource);
  const usedIds = new Map<string, number>();

  while (match) {
    const htmlTag = match[1];
    const htmlContent = match[2];
    const markdownHashes = match[3];
    const markdownContent = match[4];
    const level = htmlTag
      ? (Number(htmlTag[1]) as 2 | 3)
      : (markdownHashes.length as 2 | 3);
    const label = (htmlContent ?? markdownContent ?? "")
      .replace(/<[^>]+>/g, "")
      .trim();
    if (!label) {
      match = headingRegex.exec(mdxSource);
      continue;
    }
    const explicitId = match[0].match(/\sid="([^"]+)"/)?.[1];
    const baseId = explicitId ?? slugifyHeadingLabel(label);
    if (!baseId) {
      match = headingRegex.exec(mdxSource);
      continue;
    }
    const duplicateCount = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, duplicateCount + 1);
    const id = duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount}`;
    items.push({ id, label, level });
    match = headingRegex.exec(mdxSource);
  }
  return items;
}

export default async function LearnCheatsheetPage({ params }: Props) {
  const { slug } = await params;
  const cheatsheet = loadCheatsheet(slug);
  if (!cheatsheet) notFound();

  const { content: mdxSource, frontmatter } = cheatsheet;
  const readingMinutes = getReadingMinutes(mdxSource);
  const tocItems = extractTocItems(mdxSource);

  const { content } = await compileMDX({
    source: mdxSource,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
    components: blogMdxComponents,
  });

  return (
    <main
      data-section-theme="light"
      className="min-h-screen bg-[var(--surface-light)] text-[var(--ink)]"
    >
      <div className="mx-auto w-full max-w-6xl px-5 pt-24 pb-20 md:px-6 md:pt-36 md:pb-24 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:gap-14 xl:grid-cols-[minmax(0,1fr)_21rem]">
          <article className="min-w-0 xl:max-w-3xl">
            <Reveal>
              <Link
                href="/learn"
                className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)] transition-colors hover:text-[var(--ink)]"
              >
                ← All courses & notes
              </Link>
            </Reveal>

            <header className="mb-8 flex flex-col gap-4 md:mb-10 md:gap-6">
              <Reveal>
                <SectionBadge tone="light">Cheatsheet</SectionBadge>
              </Reveal>

              <Reveal>
                <h1 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--ink)] md:text-5xl lg:text-6xl">
                  {frontmatter.title}
                </h1>
              </Reveal>

              {frontmatter.description ? (
                <Reveal>
                  <p className="max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)] md:text-lg">
                    {frontmatter.description}
                  </p>
                </Reveal>
              ) : null}

              <Reveal>
                <p className="text-sm text-[var(--ink-muted)]">
                  {readingMinutes} min read
                </p>
              </Reveal>

              <BlogSourceDisclaimer
                isFromKodeKloud={frontmatter.notesFromKodeKloud}
              />
            </header>

            <div className={cheatsheetBodyClassName}>{content}</div>

            <footer className="mt-16 border-t border-[var(--hairline-light)] pt-8 md:mt-24 md:pt-12">
              <Link
                href="/learn"
                className="text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
              >
                ← Back to Learn
              </Link>
            </footer>
          </article>

          {tocItems.length > 0 ? (
            <aside className="hidden xl:block">
              <div className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col rounded-2xl border border-[var(--hairline-light)] bg-white/70 p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
                  On this page
                </p>
                <div className="min-h-0 overflow-y-auto pr-1">
                  <BlogToc items={tocItems} />
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>

      <BlogTocMobile items={tocItems} />
    </main>
  );
}
