"use client";

import { useActiveSectionTheme } from "@/components/navigation-v2/useActiveSectionTheme";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

/**
 * Scroll distance (in pixels) before the button appears. Roughly half a
 * viewport on a typical laptop — enough to signal "the user has committed to
 * reading" without cluttering the first fold.
 */
const SHOW_THRESHOLD_PX = 400;

/**
 * Floating "back to top" button.
 *
 * - Mounted once in the root layout so it's available on every route.
 * - Hidden until the user has scrolled past `SHOW_THRESHOLD_PX`; fades in
 *   with Framer Motion so it feels intentional rather than popping.
 * - Theme-aware via `useActiveSectionTheme` — mirrors the nav pill's solid
 *   CTA styling: black pill on light sections, white pill on dark sections.
 * - Respects `prefers-reduced-motion` by disabling Framer Motion animations
 *   and switching scroll behavior from `smooth` to instant (`auto`).
 */
const BackToTop = () => {
  // The button floats near the bottom of the viewport, so it needs to reflect
  // the section *there*, not the one currently under the nav pill at the top.
  const theme = useActiveSectionTheme("bottom");
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_THRESHOLD_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  const colorClass =
    theme === "light"
      ? "bg-[var(--ink)] text-white hover:bg-black/85"
      : "bg-white text-[var(--ink)] hover:bg-white/90";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.2 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
          className={clsx(
            "fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors md:bottom-8 md:right-8 md:h-14 md:w-14",
            colorClass,
          )}
        >
          <FiArrowUp className="text-lg md:text-xl" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};

export default BackToTop;
