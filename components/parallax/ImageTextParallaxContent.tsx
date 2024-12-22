"use client";
import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";

const IMG_PADDING = 12;

export const ImageTextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}) => {
  const windowSize = useWindowSize();
  const { width: windowWidth } = windowSize;

  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[50vh] lg:h-[150vh] z-0">
        <StickyImage imgUrl={imgUrl} windowWidth={windowWidth} />
        <OverlayCopy
          heading={heading}
          subheading={subheading}
          windowWidth={windowWidth}
        />
      </div>
      {children}
    </div>
  );
};

export const StickyImage = ({
  imgUrl,
  windowWidth,
}: {
  imgUrl: string;
  windowWidth: number;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const scaleTransformRange = windowWidth < 1024 ? [1, 0.85] : [0.85, 0.75];

  const scale = useTransform(scrollYProgress, [0, 1], scaleTransformRange);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${(windowWidth < 1024 ? 32 : 2) * IMG_PADDING}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
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

const OverlayCopy = ({
  subheading,
  heading,
  windowWidth,
}: {
  subheading: string;
  heading: string;
  windowWidth: number;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yTransformRange = windowWidth < 1024 ? [-50, -450] : [250, -250];

  const y = useTransform(scrollYProgress, [0, 1], yTransformRange);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:text-2xllg:text-3xl lg:mb-4">
        {subheading}
      </p>
      <p className="text-center font-bold text-3xl md:text-5xl lg:text-7xl">{heading}</p>
    </motion.div>
  );
};
