"use client";

import { scrollToElementById } from "@/lib/scrollToSection";
import Link from "next/link";

const Hero_V3 = () => {
  return (
    <div className="relative flex min-h-full w-full flex-1 flex-col justify-center">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/55 via-black/45 to-black/60"
        aria-hidden
      />
      <div className="relative z-10 w-full px-6 py-16 text-center md:px-16 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-5">
            <div className="h-px w-20 bg-white/40" aria-hidden />
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-white/60 md:text-sm">
              Full-stack · DevOps
            </p>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            <h1
              id="home-hero-title"
              className="text-6xl font-extralight leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
            >
              Joan Gerard
            </h1>
            <p className="text-pretty text-base leading-relaxed text-white/85 md:text-lg lg:text-xl">
              Full Stack Engineer with a growing DevOps skill set. I build
              thoughtful web applications and I am currently learning how to
              ship and run them better.
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base text-white/80 md:text-lg"
            aria-label="Hero navigation"
          >
            <a
              href="#about"
              className="transition-colors hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                scrollToElementById("about");
              }}
            >
              About
            </a>
            <span className="text-white/35" aria-hidden>
              /
            </span>
            <a
              href="#work"
              className="transition-colors hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                scrollToElementById("work");
              }}
            >
              Work
            </a>
            <span className="text-white/35" aria-hidden>
              /
            </span>
            <Link href="/blog" className="transition-colors hover:text-white">
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Hero_V3;
