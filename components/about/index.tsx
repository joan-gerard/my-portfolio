"use client";
import Reveal from "../utils/Reveal";
import { SectionHeader } from "../utils/SectionHeader";
import MyLinks from "./MyLinks";
import { Skills } from "./Skills";

const About = () => {
  return (
    <Reveal>
      <section id="about" className="px-6 my-8 lg:px-24 xl:px-36 mx-auto">
        <SectionHeader title="About" dir="l" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <Reveal>
            <div className="space-y-4">
              <p className="leading-relaxed text-zinc-200">
                Hey! I&apos;m Joan.
              </p>
              <p className="leading-relaxed text-zinc-200">
                I&apos;m a full stack engineer with around 4 years of hands-on
                development experience and 9 years in technical roles overall.
                I&apos;ve worked across the stack, from architecting backend
                APIs to building the interfaces people actually use.
              </p>
              <p className="leading-relaxed text-zinc-200">
                Right now I&apos;m expanding into DevOps. I&apos;m going through
                a structured course and documenting everything as I go,
                including the labs, the wins, the things that broke and why. You
                can follow along on the blog.
              </p>
              <p className="leading-relaxed text-zinc-200">
                I&apos;m also building MyHireView, a job application platform
                that lets candidates present themselves through CV uploads,
                video pitches, and shareable application pages, with analytics
                built in. It&apos;s a project I care about, and one I&apos;m
                using to put my growing DevOps knowledge into practice.
              </p>
              <p className="leading-relaxed text-zinc-200">
                When I&apos;m not building, I&apos;m probably troubleshooting
                something I definitely broke on purpose.
              </p>
              <p className="leading-relaxed text-zinc-200">
                I&apos;m currently open to full stack engineering roles. If what
                you&apos;re working on sounds interesting, reach out.
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
