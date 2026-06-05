import { LearnArticleCard } from "@/components/learn/LearnArticleCard";
import { LearnCourseCard } from "@/components/learn/LearnCourseCard";
import { SectionHeader } from "@/components/utils";
import { getAllArticles, getAllCourses } from "@/lib/learn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn | Joan Gerard",
  description:
    "Structured courses on Linux, DevOps, and cloud fundamentals — chapter by chapter, with a focus on practical understanding.",
};

export default function LearnPage() {
  const courses = getAllCourses();
  const articles = getAllArticles();

  return (
    <div
      data-section-theme="dark"
      className="min-h-screen bg-[var(--surface-dark)] text-white"
    >
      <section className="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:pt-40 lg:px-12">
        <SectionHeader
          tone="dark"
          eyebrow="Learn"
          title="Courses & notes"
          kicker="Structured notes from courses I'm working through — split into chapters so you can start anywhere and navigate like a wiki."
          align="center"
          className="mx-auto mb-16 items-center text-center"
          as="h1"
        />

        {/* Courses */}
        {courses.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-[var(--hairline-dark)] bg-black/20 px-6 py-16 text-center text-[var(--ink-dark-muted)]">
            No courses yet. Add an MDX directory under{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">
              content/learn
            </code>{" "}
            to get started.
          </p>
        ) : (
          <ul className="flex flex-col">
            {courses.map((course, i) => (
              <LearnCourseCard
                key={course.slug}
                course={course}
                isLast={i === courses.length - 1 && articles.length === 0}
              />
            ))}
          </ul>
        )}

        {/* Standalone articles */}
        {articles.length > 0 ? (
          <section className="mt-20">
            <div className="mb-8 border-t border-[var(--hairline-dark)] pt-12">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink-dark-muted)]">
                Notes &amp; reference
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Standalone articles
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {articles.map((article) => (
                <LearnArticleCard key={article.slug} article={article} />
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </div>
  );
}
