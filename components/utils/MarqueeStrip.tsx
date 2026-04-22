"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";

type Tone = "light" | "dark";

interface MarqueeStripProps {
  items: string[];
  tone?: Tone;
  /** Seconds for one full cycle. Lower = faster. */
  duration?: number;
  /** Controls the font size / padding. */
  size?: "md" | "lg";
  className?: string;
}

/**
 * Horizontally scrolling band of large outlined words, matching the
 * "Pixel-Perfect Design • Creative Design • ..." strip on Portoz.
 *
 * Implementation: two identical tracks are rendered side-by-side and the
 * parent slides by exactly -50% of its width, producing a seamless loop.
 */
export const MarqueeStrip = ({
  items,
  tone = "dark",
  duration = 30,
  size = "lg",
  className,
}: MarqueeStripProps) => {
  const shouldReduceMotion = useReducedMotion();

  const surface =
    tone === "dark"
      ? "bg-[var(--surface-dark)] text-white"
      : "bg-[var(--surface-light)] text-[var(--ink)]";

  const rule =
    tone === "dark"
      ? "border-[var(--hairline-dark)]"
      : "border-[var(--hairline-light)]";

  const fontSize =
    size === "lg"
      ? "text-5xl md:text-7xl lg:text-8xl"
      : "text-3xl md:text-4xl lg:text-5xl";

  const paddingY = size === "lg" ? "py-12 md:py-16" : "py-8 md:py-10";
  const marqueeAnimationProps = shouldReduceMotion
    ? {}
    : {
        animate: { x: ["0%", "-50%"] },
        transition: {
          duration,
          ease: "linear" as const,
          repeat: Infinity,
        },
      };

  return (
    <div
      className={clsx(
        "relative overflow-hidden border-y",
        surface,
        rule,
        paddingY,
        className,
      )}
      role="marquee"
      aria-label={items.join(", ")}
    >
      <motion.div
        className="flex w-max whitespace-nowrap"
        {...marqueeAnimationProps}
      >
        {[0, 1].map((track) => (
          <ul
            key={track}
            aria-hidden={track === 1}
            className={clsx(
              "flex shrink-0 items-center gap-10 md:gap-16 pr-10 md:pr-16",
              fontSize,
              "font-extrabold tracking-tight",
            )}
          >
            {items.map((item, itemIndex) => (
              <li
                key={`${track}-${itemIndex}-${item}`}
                className="flex items-center gap-10 md:gap-16"
              >
                <span>{item}</span>
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full bg-[image:var(--accent-gradient)]"
                />
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
