"use client";
import React from "react";
import { Skills } from "./Skills";
import { SectionHeader } from "./SectionHeader";
import MyLinks from "./MyLinks";
import Reveal from "./Reveal";

const About = () => {
  return (
    <Reveal>
      <section id="about" className="px-6 my-8 md:px-24 mx-auto">
        <SectionHeader title="About" dir="l" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <Reveal>
            <div className="space-y-4">
              <p className="leading-relaxed text-zinc-300">
                Hey! I&apos;m Bob, if you haven&apos;t already gathered that by
                now. I&apos;m a painter turned software engineer from Daytona,
                Florida. I specialize in the backend, primarily Node and Rust,
                but love building with whatever tools are right for the job.
              </p>
              <p className="leading-relaxed text-zinc-300">
                I currently work for Google on Google Photos. I also toss in my
                ¢2 with the design systems teams from time to time (once an
                artist, always an artist, amirite?).
              </p>
              <p className="leading-relaxed text-zinc-300">
                Outside of work, I still love to paint. Any given Sunday
                you&apos;ll find me scribbling some happy clouds with my son ☁️
                I even teach courses online if you&apos;re looking to learn!
              </p>
              <p className="leading-relaxed text-zinc-300">
                I&apos;m passively looking for new positions where I can merge
                my love for code with my love for the canvas. If you think
                you&apos;ve got an opening that I might like, let&apos;s connect
                🔗
              </p>
              <MyLinks />
            </div>
          </Reveal>

          <Skills />
        </div>
      </section>
    </Reveal>
  );
};

export default About;
