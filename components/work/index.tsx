"use client";
import { work } from "@/constants/work";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { ImageTextParallaxContent } from "../parallax/ImageTextParallaxContent";
import { SectionHeader } from "../utils";
import ProjectDescription from "./ProjectDescription";

export const Work = () => {
  const topFeaturedWork = work.filter((el) => el.isFeatured == true);

  return (
    <section className="z-0 px-6 my-8 lg:px-24 xl:px-36 mx-auto" id="work">
      <SectionHeader title="Work" dir="l" />

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
      <div className="flex justify-center mb-12">
        <Link
          href={`/work`}
          className="w-full rounded bg-[#6366f1] px-9 py-4 text-lg text-white transition-colors bg-opacity-80 hover:bg-opacity-100 md:w-fit"
        >
          See more projects <FiArrowUpRight className="inline" />
        </Link>
      </div>
    </section>
  );
};
