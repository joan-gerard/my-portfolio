"use client";

import {
  CtaButton,
  GradientText,
  Reveal,
  SectionBadge,
} from "@/components/utils";
import { CV_DOWNLOAD_FILENAME, CV_URL, SOCIAL_LINKS } from "@/constants/site";
import Image from "next/image";
import Link from "next/link";

const Hero_V3 = () => {
  return (
    <section
      id="hero"
      data-section-theme="light"
      className="relative bg-[var(--surface-light)] pt-32 pb-6 md:pt-40 md:pb-16"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8 flex flex-col items-center gap-10 md:gap-14 text-center">
        <Reveal width="w-fit">
          <SectionBadge tone="light">Hello! I am Joan Gerard</SectionBadge>
        </Reveal>

        <div className="relative z-10 w-full">
          <Reveal width="w-full">
            <h1
              id="home-hero-title"
              className="text-balance pb-2 md:pb-3 lg:pb-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight text-[var(--ink)]"
            >
              Full Stack <GradientText>&amp;</GradientText> DevOps Engineer
            </h1>
          </Reveal>
        </div>

        {/* Negative margin-top pulls the portrait up so its top edge overlaps the heading; z-0 keeps it behind the h1 (which is z-10). */}
        <div className="relative z-0 w-full -mt-16 md:-mt-28 lg:-mt-40">
          <Reveal width="w-full">
            <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-black/5 aspect-[4/5]">
              {/* TODO: replace with real portrait of Joan; placeholder-portrait.avif is temporary. */}
              <Image
                src="/placeholder-portrait.avif"
                alt="Professional portrait placeholder"
                fill
                priority
                sizes="(min-width: 768px) 576px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal width="w-full">
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <CtaButton
              href={CV_URL}
              download={CV_DOWNLOAD_FILENAME}
              surface="light"
              variant="outline"
            >
              Download CV
            </CtaButton>
            <div className="flex items-center justify-center gap-5">
              <Link
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-[var(--ink)] underline underline-offset-4 hover:text-[var(--ink-muted)] transition-colors"
              >
                GitHub
              </Link>
              <Link
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-[var(--ink)] underline underline-offset-4 hover:text-[var(--ink-muted)] transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero_V3;
