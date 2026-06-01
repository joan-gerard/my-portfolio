import { BlogSourceDisclaimer } from "@/components/blog/BlogSourceDisclaimer";
import { Reveal, SectionBadge } from "@/components/utils";
import { getCourseBySlug, learnCourses } from "@/constants/learnCourses";
import { loadChapter } from "@/lib/learn";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiBook } from "react-icons/fi";
import { compileMDX } from "next-mdx-remote/rsc";
import { blogMdxComponents } from "@/components/mdx/blog-mdx-components";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ courseSlug: string }>;
};

export function generateStaticParams() {
  return learnCourses.map((course) => ({ courseSlug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) return { title: "Course not found" };
  return {
    title: `${course.title} | Learn`,
    description: course.description,
  };
}

export default async function CourseLandingPage({ params }: Props) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) notFound();

  const indexPost = loadChapter(courseSlug, "index");

  let indexContent: React.ReactNode = null;
  if (indexPost) {
    const { content } = await compileMDX({
      source: indexPost.content,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      },
      components: blogMdxComponents,
    });
    indexContent = content;
  }

  const firstChapter = course.chapters[0];

  return (
    <main
      data-section-theme="light"
      className="min-h-screen bg-[var(--surface-light)] text-[var(--ink)]"
    >
      <div className="mx-auto w-full max-w-4xl px-5 pt-24 pb-20 md:px-6 md:pt-36 md:pb-24 lg:px-8">
        {/* Back to Learn */}
        <Reveal>
          <Link
            href="/learn"
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)] hover:text-[var(--ink)] transition-colors"
          >
            ← All courses
          </Link>
        </Reveal>

        {/* Header */}
        <header className="mb-10 flex flex-col gap-5 md:mb-14 md:gap-8">
          <Reveal>
            <SectionBadge tone="light">Course</SectionBadge>
          </Reveal>

          <Reveal>
            <h1 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--ink)] md:text-5xl lg:text-6xl">
              {course.title}
            </h1>
          </Reveal>

          <Reveal>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)] md:text-lg">
              {course.description}
            </p>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline-light)] bg-black/[0.04] px-3 py-1.5 text-xs font-semibold text-[var(--ink-muted)]">
                <FiBook className="text-sm" aria-hidden />
                {course.chapters.length} chapters
              </span>
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--hairline-light)] bg-black/[0.04] px-3 py-1.5 text-xs font-semibold text-[var(--ink-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {firstChapter ? (
            <Reveal>
              <Link
                href={`/learn/${courseSlug}/${firstChapter.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                Start chapter 1
                <FiArrowRight aria-hidden />
              </Link>
            </Reveal>
          ) : null}
        </header>

        <BlogSourceDisclaimer isFromKodeKloud={course.notesFromKodeKloud} />

        {/* Overview content from index.mdx */}
        {indexContent ? (
          <div className="mt-10 prose-content max-w-none overflow-x-auto text-[var(--ink-muted)] [&_a]:font-medium [&_a]:text-[var(--ink)] [&_a]:underline [&_a]:decoration-[var(--accent-mid)] [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:text-[var(--accent-mid)] [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:scroll-mt-28 [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-[var(--ink)] [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--ink)] [&_p]:leading-relaxed [&_p]:text-[var(--ink-muted)] [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1.5 [&_ul_li]:marker:text-[var(--accent-mid)]">
            {indexContent}
          </div>
        ) : null}

        {/* Chapter list */}
        <section className="mt-14">
          <Reveal>
            <h2 className="mb-6 text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">
              Chapters
            </h2>
          </Reveal>
          <ol className="flex flex-col gap-3">
            {course.chapters.map((chapter, index) => (
              <Reveal key={chapter.slug}>
                <li>
                  <Link
                    href={`/learn/${courseSlug}/${chapter.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-[var(--hairline-light)] bg-white p-4 transition-colors hover:border-[var(--accent-mid)] md:p-5"
                  >
                    <span
                      className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-black/[0.06] text-xs font-bold tabular-nums text-[var(--ink-subtle)] transition-colors group-hover:bg-[var(--accent-mid)]/15 group-hover:text-[var(--ink)]"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--accent-mid)]">
                        {chapter.title}
                      </p>
                      <p className="mt-1 min-h-[3.25em] text-sm leading-relaxed text-[var(--ink-muted)] line-clamp-2">
                        {chapter.description}
                      </p>
                    </div>
                    <FiArrowRight
                      className="flex-none self-center text-[var(--ink-subtle)] transition-colors group-hover:text-[var(--accent-mid)]"
                      aria-hidden
                    />
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
