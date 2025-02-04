"use client";
import React, { useEffect, useRef } from "react";
import { work } from "@/constants/work";
import { useAnimation, useInView, motion } from "framer-motion";
import Reveal from "@/components/utils/Reveal";
import Link from "next/link";
import { AiFillGithub, AiOutlineExport } from "react-icons/ai";
import { Chip } from "@/components/utils/Chip";
import { SectionHeader } from "@/components/utils/SectionHeader";

interface Props {
  description: string[];
  liveUrl: string | null;
  imgUrl: string;
  stack: string[];
  subheading: string;
  githubUrl: string;
  slug: string;
}

const page = () => {
  return (
    <Reveal>
      <section className="px-6 my-8 lg:px-24 xl:px-36 mx-auto" id="projects">
        <SectionHeader title="Projects" dir="l" className="mb-12 mt-32" />

        <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
          {work.map((project) => {
            return <Project key={project.subheading} {...project} />;
          })}
        </div>
      </section>
    </Reveal>
  );
};

export default page;

function Project({
  liveUrl,
  description,
  imgUrl,
  subheading,
  githubUrl,
  stack,
  slug,
}: Props) {
  const controls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.75 }}
      >
        <div className="w-full aspect-video bg-zinc-700 relative rounded-lg overflow-hidden">
          <img
            src={imgUrl}
            alt={`An image of the ${subheading} project.`}
            className="absolute bottom-0 rounded"
          />
        </div>
        <div className="mt-6">
          <Reveal width="w-full">
            <div className="flex items-center gap-2 w-full">
              <h4 className="font-bold text-lg shrink-0 max-w-[calc(100%_-_150px)] text-white">
                {subheading}
              </h4>
              <div className="w-full h-[1px] bg-zinc-600" />
              {githubUrl && (
                <Link href={githubUrl} target="_blank" rel="nofollow">
                  <AiFillGithub className="text-xl text-zinc-300 hover:text-indigo-300 transition-colors" />
                </Link>
              )}
              {liveUrl && (
                <Link href={liveUrl} target="_blank" rel="nofollow">
                  <AiOutlineExport className="text-xl text-zinc-300 hover:text-indigo-300 transition-colors" />
                </Link>
              )}
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-4 my-2">
              {stack.map((el) => (
                <Chip key={el}>{el}</Chip>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <p className="text-zinc-300 leading-relaxed">
              {description[0]}
              <span className="inline-block text-sm text-indigo-300 cursor-pointer ml-2">
                <Link href={`/work/${slug}`}>Learn more {">"}</Link>
              </span>
            </p>
          </Reveal>
        </div>
      </motion.div>
    </>
  );
}
