"use client";
import {
  CtaButton,
  GradientText,
  Reveal,
  SectionHeader,
} from "@/components/utils";
import { experience } from "@/constants/experience";

const Experience = () => {
  return (
    <section
      id="experience"
      data-section-theme="light"
      className="bg-[var(--surface-light)] px-6 pt-24 pb-14 md:py-24 lg:px-24 xl:px-36"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeader
            tone="light"
            eyebrow="Career Journey"
            title={
              <>
                I blend creativity with{" "}
                <span className="whitespace-nowrap">technical expertise</span>
              </>
            }
            kicker="Nine years in technical roles, four of them shipping web applications end-to-end. Here is where I have spent that time."
          />
          <Reveal width="w-fit">
            <CtaButton href="#contact" surface="light">
              Book a call
            </CtaButton>
          </Reveal>
        </div>

        <ol className="flex flex-col">
          {experience.map((item) => (
            <ExperienceItem key={`${item.title}-${item.time}`} {...item} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;

interface ExperienceItemProps {
  title: string;
  position: string;
  time: string;
  location: string;
  description: string;
  tech: string[];
}

function ExperienceItem({
  title,
  position,
  time,
  location,
  description,
}: ExperienceItemProps) {
  return (
    <li className="border-b border-[var(--hairline-light)] py-6 first:pt-0 last:border-b-0">
      <Reveal width="w-full">
        <div>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em]">
            <GradientText>{title}</GradientText>
          </p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--ink)]">
              {position}
            </h3>
            <span className="pt-1 text-sm text-[var(--ink-subtle)] whitespace-nowrap">
              {time}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-4 text-sm text-[var(--ink-muted)]">
            <span>{location}</span>
          </div>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--ink-muted)]">
            {description}
          </p>
        </div>
      </Reveal>
    </li>
  );
}
