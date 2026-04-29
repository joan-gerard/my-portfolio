import { CtaButton, Reveal, SectionBadge, SectionHeader } from "@/components/utils";
import {
  DEVOPS_TOTAL_DAYS,
  getPublishedDevOpsDays,
} from "@/constants/devopsChallenge";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "100 Days of DevOps",
  description:
    "Challenge hub with daily DevOps tasks, learning notes, and progress updates.",
};

export default function DevOpsChallengeHubPage() {
  const publishedDays = getPublishedDevOpsDays();
  const publishedCount = publishedDays.length;
  const completionPercent = Math.round((publishedCount / DEVOPS_TOTAL_DAYS) * 100);

  return (
    <main
      data-section-theme="light"
      className="min-h-screen bg-(--surface-light) text-(--ink)"
    >
      <section className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20 md:pt-36 lg:px-10">
        <div className="mb-10">
          <SectionHeader
            eyebrow="Challenge Hub"
            title="100 Days of DevOps"
            kicker="A focused day-by-day challenge where I practice Linux and DevOps fundamentals in public."
            className="mb-8"
          />

          <Reveal>
            <div className="rounded-2xl border border-(--hairline-light) bg-white p-5 md:p-6">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-(--ink)">Progress</p>
                <p className="text-sm text-(--ink-muted)">
                  {publishedCount}/{DEVOPS_TOTAL_DAYS} days
                </p>
              </div>
              <div className="h-2 w-full rounded-full bg-black/10">
                <div
                  className="h-2 rounded-full bg-[image:var(--accent-gradient)]"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
          </Reveal>
        </div>

        <section className="mb-12">
          <Reveal>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-(--ink)">
                Published days
              </h2>
              <SectionBadge tone="light">{publishedCount} live</SectionBadge>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {publishedDays.map((day) => (
              <Reveal key={day.slug}>
                <article className="rounded-2xl border border-(--hairline-light) bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--ink-subtle)">
                    Day {day.day}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-(--ink)">
                    {day.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--ink-muted)">
                    {day.task}
                  </p>
                  <div className="mt-4">
                    <CtaButton
                      href={`/devops-100-days/${day.slug}`}
                      surface="light"
                      variant="outline"
                    >
                      Read day {day.day}
                    </CtaButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-(--ink)">
              Upcoming days
            </h2>
          </Reveal>
          <Reveal>
            <div className="rounded-2xl border border-(--hairline-light) bg-white p-5 md:p-6">
              <ul className="grid gap-2 text-sm text-(--ink-muted) sm:grid-cols-2 lg:grid-cols-3">
                {Array.from(
                  { length: DEVOPS_TOTAL_DAYS - publishedCount },
                  (_, idx) => {
                    const dayNumber = publishedCount + idx + 1;
                    return (
                      <li key={dayNumber}>
                        <span className="font-semibold text-(--ink)">
                          Day {dayNumber}
                        </span>{" "}
                        - Coming soon
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          </Reveal>
        </section>

        <footer className="mt-12">
          <Link
            href="/"
            className="text-sm font-medium text-(--ink) underline decoration-(--accent-mid) underline-offset-4 transition-colors hover:text-(--accent-mid)"
          >
            Back to homepage
          </Link>
        </footer>
      </section>
    </main>
  );
}
