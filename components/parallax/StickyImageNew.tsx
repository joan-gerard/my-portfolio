"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";

const IMG_PADDING = 12;

export const StickyImageNew = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const windowSize = useWindowSize();
  const { width: windowWidth } = windowSize;

  const scaleTransformRange = windowWidth < 768 ? [0.95, 0.80] : [0.8, 0.7];

  const scale = useTransform(scrollYProgress, [0, 1], scaleTransformRange);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="overflow-hidden rounded-3xl aspect-[3/2]"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};
