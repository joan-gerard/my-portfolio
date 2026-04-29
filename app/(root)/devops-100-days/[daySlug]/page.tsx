import { CtaButton, Reveal, SectionBadge } from "@/components/utils";
import {
  getDevOpsDayBySlug,
  getPublishedDevOpsDays,
} from "@/constants/devopsChallenge";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

type Props = {
  params: Promise<{ daySlug: string }>;
};

export function generateStaticParams() {
  return getPublishedDevOpsDays().map((day) => ({ daySlug: day.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { daySlug } = await params;
  const day = getDevOpsDayBySlug(daySlug);

  if (!day) {
    return { title: "Challenge day not found" };
  }

  return {
    title: `Day ${day.day}: ${day.title} | 100 Days of DevOps`,
    description: day.task,
  };
}

export default async function DevOpsChallengeDayPage({ params }: Props) {
  const { daySlug } = await params;
  const day = getDevOpsDayBySlug(daySlug);

  if (!day) {
    notFound();
  }

  return (
    <main
      data-section-theme="light"
      className="min-h-screen bg-(--surface-light) text-(--ink)"
    >
      <article className="mx-auto w-full max-w-4xl px-6 pt-28 pb-20 md:pt-36 lg:px-10">
        <header className="mb-10">
          <Reveal>
            <SectionBadge tone="light">Day {day.day}</SectionBadge>
          </Reveal>
          <Reveal>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-(--ink) md:text-5xl">
              {day.title}
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-4 text-base leading-relaxed text-(--ink-muted) md:text-lg">
              {day.task}
            </p>
          </Reveal>
        </header>

        <section className="mb-8 rounded-2xl border border-(--hairline-light) bg-white p-5 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-subtle)">
            Challenge metadata
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-black/10 bg-(--surface-light) px-3 py-1 text-xs font-medium text-(--ink)">
              {day.difficulty}
            </span>
            {day.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-black/10 bg-(--surface-light) px-3 py-1 text-xs font-medium text-(--ink)"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-(--hairline-light) bg-white p-5 md:p-6">
          <h2 className="mb-3 text-2xl font-bold text-(--ink)">Why this matters</h2>
          <p className="text-(--ink-muted) leading-relaxed">{day.whyItMatters}</p>
        </section>

        <section className="mb-8 rounded-2xl border border-(--hairline-light) bg-white p-5 md:p-6">
          <h2 className="mb-3 text-2xl font-bold text-(--ink)">Solution outline</h2>
          <ol className="list-decimal space-y-2 pl-5 text-(--ink-muted)">
            {day.solutionSteps.map((step) => (
              <li key={step} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-8 rounded-2xl border border-(--hairline-light) bg-white p-5 md:p-6">
          <h2 className="mb-3 text-2xl font-bold text-(--ink)">Verification checklist</h2>
          <ul className="list-disc space-y-2 pl-5 text-(--ink-muted)">
            {day.verification.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 rounded-2xl border border-(--hairline-light) bg-white p-5 md:p-6">
          <h2 className="mb-3 text-2xl font-bold text-(--ink)">Key takeaway</h2>
          <p className="text-(--ink-muted) leading-relaxed">{day.takeaway}</p>
        </section>

        <footer className="flex flex-wrap items-center gap-4">
          <CtaButton
            href="/devops-100-days"
            surface="light"
            variant="outline"
            showArrow={false}
          >
            <span className="inline-flex items-center gap-2">
              <FiArrowLeft className="text-base" aria-hidden />
              Back to challenge hub
            </span>
          </CtaButton>
        </footer>
      </article>
    </main>
  );
}
