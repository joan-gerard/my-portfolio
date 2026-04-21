"use client";

import { CtaButton, GradientText, Reveal, SectionBadge } from "@/components/utils";
import Image from "next/image";
import Link from "next/link";

const Hero_V3 = () => {
  return (
    <section
      id="hero"
      data-section-theme="light"
      className="relative bg-[var(--surface-light)] pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8 flex flex-col items-center gap-10 md:gap-14 text-center">
        <Reveal width="w-fit">
          <SectionBadge tone="light">Hello! I am Joan Gerard</SectionBadge>
        </Reveal>

        <Reveal width="w-full">
          <h1
            id="home-hero-title"
            className="text-balance pb-2 md:pb-3 lg:pb-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight text-[var(--ink)]"
          >
            Full Stack <GradientText>&amp;</GradientText> DevOps engineer
          </h1>
        </Reveal>

        <Reveal width="w-full">
          <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-[var(--ink-muted)]">
            I build thoughtful web applications and am currently expanding into
            DevOps, documenting everything as I go.
          </p>
        </Reveal>

        <Reveal width="w-full">
          <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-black/5 aspect-[16/10]">
            <Image
              src="/home-hero-2.jpg"
              alt="Joan Gerard"
              fill
              priority
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal width="w-full">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <CtaButton
              href="https://www.linkedin.com/in/joangerard/"
              external
              surface="light"
              variant="outline"
            >
              Download CV
            </CtaButton>
            <Link
              href="https://github.com/joan-gerard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-[var(--ink)] underline underline-offset-4 hover:text-[var(--ink-muted)] transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/joangerard/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-[var(--ink)] underline underline-offset-4 hover:text-[var(--ink-muted)] transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero_V3;
