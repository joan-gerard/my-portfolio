import { BlogArticleHeader } from "@/components/blog/BlogArticleHeader";
import { blogMdxComponents } from "@/components/mdx/blog-mdx-components";
import { Reveal } from "@/components/utils";
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

const articleBodyClassName =
  "max-w-none overflow-x-auto text-zinc-300 " +
  "[&_a]:font-medium [&_a]:text-indigo-300 [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-indigo-200 " +
  "[&_h2]:my-8 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white " +
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white " +
  "[&_p]:leading-relaxed [&_p]:text-zinc-300 " +
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-2 [&_ul_li]:marker:text-indigo-400 " +
  "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol_li]:marker:text-zinc-500 " +
  "[&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500/40 [&_blockquote]:bg-zinc-900/40 [&_blockquote]:py-2 [&_blockquote]:pl-4 [&_blockquote]:pr-2 [&_blockquote]:text-zinc-200 [&_blockquote]:italic " +
  "[&_hr]:my-12 [&_hr]:border-zinc-800 " +
  "[&_strong]:font-semibold [&_strong]:text-white " +
  "[&_table]:my-8 [&_table]:w-full [&_table]:min-w-[20rem] [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm sm:[&_table]:text-base " +
  "[&_th]:border-b [&_th]:border-zinc-600 [&_th]:bg-zinc-900/70 [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white " +
  "[&_td]:border-b [&_td]:border-zinc-800 [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-zinc-300 " +
  "[&_tbody_tr:last-child_td]:border-b-0";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) {
    notFound();
  }

  const readingMinutes = getReadingMinutesFromMdxSource(post.content);

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
    <div
      data-section-theme="dark"
      className="bg-[var(--surface-dark)] text-white"
    >
      <Reveal>
        <article className="mx-auto w-full max-w-3xl px-6 pb-24 pt-28 sm:pt-32 lg:px-8">
        <BlogArticleHeader
          frontmatter={post.frontmatter}
          readingMinutes={readingMinutes}
        />

        <div className={articleBodyClassName}>{content}</div>

        <footer className="mt-20 border-t border-zinc-800/90 pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-indigo-500/40 hover:bg-zinc-900/70 hover:text-white"
          >
            <FiArrowLeft className="text-base" aria-hidden />
            Back to blog
          </Link>
        </footer>
        </article>
      </Reveal>
    </div>
  );
}
