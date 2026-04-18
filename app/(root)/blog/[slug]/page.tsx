import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPostSlugs,
  getPostSourceBySlug,
  type BlogPostFrontmatter,
} from "@/lib/blog";
import { blogMdxComponents } from "@/components/mdx/blog-mdx-components";
import Reveal from "@/components/utils/Reveal";
import { SectionHeader } from "@/components/utils/SectionHeader";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const source = getPostSourceBySlug(slug);
  if (!source) {
    return { title: "Post not found" };
  }
  const { data } = matter(source);
  const fm = data as BlogPostFrontmatter;
  return {
    title: `${fm.title} | Blog`,
    description: fm.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const source = getPostSourceBySlug(slug);
  if (!source) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<BlogPostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: blogMdxComponents,
  });

  return (
    <Reveal>
      <article className="mx-auto my-8 w-full max-w-3xl px-6 pb-24 lg:px-24 xl:px-36">
        <SectionHeader
          title={frontmatter.title}
          dir="l"
          className="mb-4 mt-32"
        />
        <time
          dateTime={frontmatter.date}
          className="mb-10 block text-sm text-zinc-500"
        >
          {new Date(frontmatter.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <div
          className="space-y-6 text-zinc-300 [&_a]:text-indigo-300 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:leading-relaxed [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-6"
        >
          {content}
        </div>

        <p className="mt-16">
          <Link
            href="/blog"
            className="text-indigo-300 underline-offset-4 transition-colors hover:text-indigo-200"
          >
            ← Back to blog
          </Link>
        </p>
      </article>
    </Reveal>
  );
}
