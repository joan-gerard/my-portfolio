"use client";
import { CtaButton, Reveal, SectionHeader } from "../utils";
import MyLinks from "./MyLinks";
import { Skills } from "./Skills";

const About = () => {
  return (
    <section
      id="about"
      data-section-theme="light"
      className="bg-[var(--surface-light)] px-6 py-24 lg:px-24 xl:px-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tone="light"
          eyebrow="Core Experience"
          title={
            <>
              I blend <em className="not-italic">engineering</em> with a
              learner&apos;s mindset
            </>
          }
          kicker="Full-stack by trade, DevOps in the making. I build web apps people actually use and document the journey along the way."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 md:gap-16">
          <Reveal width="w-full">
            <div className="space-y-4">
              <p className="leading-relaxed text-[var(--ink)]">
                Hey! I&apos;m Joan.
              </p>
              <p className="leading-relaxed text-[var(--ink)]">
                I&apos;m a full stack engineer with around 4 years of hands-on
                development experience and 9 years in technical roles overall.
                I&apos;ve worked across the stack, from architecting backend
                APIs to building the interfaces people actually use.
              </p>
              <p className="leading-relaxed text-[var(--ink)]">
                Right now I&apos;m expanding into DevOps. I&apos;m going through
                a structured course and documenting everything as I go,
                including the labs, the wins, the things that broke and why. You
                can follow along on the blog.
              </p>
              <p className="leading-relaxed text-[var(--ink)]">
                I&apos;m also building MyHireView, a job application platform
                that lets candidates present themselves through CV uploads,
                video pitches, and shareable application pages, with analytics
                built in. It&apos;s a project I care about, and one I&apos;m
                using to put my growing DevOps knowledge into practice.
              </p>
              <p className="leading-relaxed text-[var(--ink)]">
                When I&apos;m not building, I&apos;m probably troubleshooting
                something I definitely broke on purpose.
              </p>
              <p className="leading-relaxed text-[var(--ink)]">
                I&apos;m currently open to full stack engineering roles. If what
                you&apos;re working on sounds interesting, reach out.
              </p>

              <div className="pt-6 flex flex-wrap items-center gap-6">
                <CtaButton href="#contact" surface="light">
                  Book a call
                </CtaButton>
                <MyLinks />
              </div>
            </div>
          </Reveal>

          <Skills />
        </div>
      </div>
    </section>
  );
};

export default About;
