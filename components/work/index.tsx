"use client";
import React from "react";
import { work } from "@/constants/work";
import { ImageTextParallaxContent } from "../parallax/ImageTextParallaxContent";
import ProjectDescription from "./ProjectDescription";

export const Work = () => {
  return (
    <div className="bg-black z-0" id="work">
      {work.map((el) => (
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
          />
        </ImageTextParallaxContent>
      ))}
    </div>
  );
};

