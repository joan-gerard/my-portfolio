"use client";
import React from "react";
import Reveal from "../utils/Reveal";
import { SectionHeader } from "../utils/SectionHeader";
import { experience } from "@/constants/experience";
import { Chip } from "../utils/Chip";

const Experience = () => {
  return (
    <Reveal>
      <section className="px-6 my-8 lg:px-24 xl:px-36 mx-auto" id="experience">
        <SectionHeader title="Experience" dir="l" className="mb-12" />
        {experience.map((item) => (
          <ExperienceItem key={item.title} {...item} />
        ))}
      </section>
    </Reveal>
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
  tech,
}: ExperienceItemProps) {
  return (
    <Reveal>
      <div className="mb-6 border-b pb-6 border-zinc-700">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-xl text-white">{title}</span>
          <span className="text-white">{time}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-indigo-300 font-bold">{position}</span>
          <span className="text-white">{location}</span>
        </div>
        <p className="mb-6 text-zinc-300 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
