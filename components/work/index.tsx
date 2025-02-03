"use client";
import React from "react";
import { work } from "@/constants/work";
import { ImageTextParallaxContent } from "../parallax/ImageTextParallaxContent";
import ProjectDescription from "./ProjectDescription";
import { SectionHeader } from "../utils/SectionHeader";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export const Work = () => {
  const topFeaturedWork = work.filter((el) => el.isFeatured == true);

  return (
    <div className="bg-black z-0" id="work">
      <div className="px-6 md:px-24">
        <SectionHeader title="Work" dir="l" />
      </div>

      {topFeaturedWork.map((el) => (
        <ImageTextParallaxContent
          imgUrl={el.imgUrl}
          subheading={el.subheading}
          heading={el.heading}
          key={el.subheading}
        >
          <ProjectDescription
            additionalTitle={el.additionalTitle}
            description={el.description}
            slug={el.slug}
            stack={el.stack}
          />
        </ImageTextParallaxContent>
      ))}
      <div className="flex justify-center">
        <Link
          href={`/work`}
          className="w-full rounded bg-neutral-900 px-9 py-4 text-lg text-white transition-colors hover:bg-neutral-700 md:w-fit"
        >
          See more projects <FiArrowUpRight className="inline" />
        </Link>
      </div>
    </div>
  );
};
