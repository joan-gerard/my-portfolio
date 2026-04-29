import { CtaButton, Reveal, SectionHeader } from "@/components/utils";

const DevOpsChallengeSpotlight = () => {
  return (
    <section
      id="devops-challenge"
      data-section-theme="light"
      className="bg-(--surface-light) px-6 py-20 md:py-24 lg:px-24 xl:px-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tone="light"
          eyebrow="Learning in Public"
          title="100 Days of DevOps"
          kicker="I am documenting one practical challenge per day, including the context, the task, and what I learned along the way."
          className="mb-10"
        />

        <Reveal width="w-full">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
              <div>
                <p className="text-(--ink) text-base leading-relaxed md:text-lg">
                  Follow the challenge hub to explore each daily post as it is
                  published. I share the task context, command-level solution,
                  and practical takeaways from each lab.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-black/10 bg-(--surface-light) px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-(--ink)">
                    Day 1 Published
                  </span>
                  <span className="rounded-full border border-black/10 bg-(--surface-light) px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-(--ink)">
                    99 Days Coming
                  </span>
                  <span className="rounded-full border border-black/10 bg-(--surface-light) px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-(--ink)">
                    Linux + DevOps Labs
                  </span>
                </div>

                <div className="pt-7 flex flex-wrap items-center gap-4">
                  <CtaButton href="/devops-100-days" surface="light">
                    Open challenge hub
                  </CtaButton>
                  <CtaButton
                    href="/devops-100-days/day-1-linux-user-setup"
                    surface="light"
                    variant="outline"
                  >
                    Read Day 1
                  </CtaButton>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-(--surface-light) p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--ink-muted)">
                  Current focus
                </p>
                <p className="mt-2 text-(--ink) font-semibold">
                  Linux user management and hardening basics
                </p>
                <p className="mt-3 text-sm leading-relaxed text-(--ink-muted)">
                  Working through realistic admin tasks to build confidence with
                  user accounts, permissions, and secure defaults.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default DevOpsChallengeSpotlight;
