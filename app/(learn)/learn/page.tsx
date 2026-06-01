import { LearnCourseCard } from "@/components/learn/LearnCourseCard";
import { SectionHeader } from "@/components/utils";
import { getAllCourses } from "@/lib/learn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn | Joan Gerard",
  description:
    "Structured courses on Linux, DevOps, and cloud fundamentals — chapter by chapter, with a focus on practical understanding.",
};

export default function LearnPage() {
  const courses = getAllCourses();

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
                isLast={i === courses.length - 1}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
