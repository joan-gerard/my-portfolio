import { InterviewPrepHeader } from "@/components/interviews/InterviewPrepHeader";
import { InterviewSectionNav } from "@/components/interviews/InterviewSectionNav";
import { blogMdxComponents } from "@/components/mdx/blog-mdx-components";
import { extractTocItems } from "@/lib/mdx-toc";
import {
  getInterviewSlugs,
  loadInterview,
  type InterviewFrontmatter,
} from "@/lib/interviews";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getInterviewSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const interview = loadInterview(slug);
  if (!interview) {
    return { title: "Prep not found" };
  }
  return {
    title: `${interview.frontmatter.title} | Interview Prep`,
    description: interview.frontmatter.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const prepBodyClassName =
  "max-w-none overflow-x-auto text-[#b8c5d6] " +
  "[&_a]:font-medium [&_a]:text-emerald-300 [&_a]:underline [&_a]:decoration-emerald-500/50 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:text-emerald-200 " +
  "[&_h1]:mt-14 [&_h1]:mb-6 [&_h1]:scroll-mt-24 [&_h1]:border-b [&_h1]:border-[#2a3344] [&_h1]:pb-4 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:text-white [&_h1]:first:mt-0 " +
  "[&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-white " +
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-emerald-200 " +
  "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-white " +
  "[&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-[#b8c5d6] " +
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:text-[#b8c5d6] [&_ul_li]:marker:text-emerald-400 " +
  "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol_li]:marker:text-[#7f93ad] " +
  "[&_blockquote]:my-5 [&_blockquote]:rounded-xl [&_blockquote]:border [&_blockquote]:border-emerald-500/20 [&_blockquote]:bg-[#101822] [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-[#e2eaf5] [&_blockquote]:not-italic [&_blockquote]:shadow-[inset_3px_0_0_0_#34d399] " +
  "[&_hr]:my-12 [&_hr]:border-[#2a3344] " +
  "[&_strong]:font-semibold [&_strong]:text-white " +
  "[&_code]:rounded [&_code]:bg-[#0f141c] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-emerald-200";

export default async function InterviewPrepPage({ params }: Props) {
  const { slug } = await params;
  const interview = loadInterview(slug);
  if (!interview) {
    notFound();
  }

  const tocItems = extractTocItems(interview.content);

  const { content } = await compileMDX<InterviewFrontmatter>({
    source: interview.content,
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
    <div className="min-h-screen bg-[#0a0e14] text-white">
      <div className="border-b border-[#2a3344] bg-[#0f141c]/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-4 md:px-8">
          <Link
            href="/interviews"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9fb0c8] transition hover:text-white"
          >
            <FiArrowLeft aria-hidden className="text-base" />
            All prep
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-14">
          {tocItems.length > 0 ? (
            <aside className="xl:sticky xl:top-8 xl:self-start">
              <div className="rounded-2xl border border-[#2a3344] bg-[#141a24] p-5 xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto">
                <InterviewSectionNav items={tocItems} />
              </div>
            </aside>
          ) : null}

          <article className="min-w-0">
            <InterviewPrepHeader frontmatter={interview.frontmatter} />
            <div className={prepBodyClassName}>{content}</div>
          </article>
        </div>
      </div>
    </div>
  );
}
