"use client";

import { useEffect, useState } from "react";

export type NavTheme = "light" | "dark";

const PROBE_Y = 80;

/**
 * Tracks the currently-visible `[data-section-theme]` element that crosses the
 * top of the viewport so the nav bar can swap between light and dark palettes
 * as the user scrolls across alternating sections.
 *
 * Walks sections in reverse so the bottom-most section whose top is above the
 * probe line wins — that's the section the probe currently sits inside.
 * Tied to `scroll` and `resize` so the nav stays in sync in all cases
 * (initial render, keyboard paging, viewport changes, etc).
 */
export function useActiveSectionTheme(): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("light");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-theme]"),
    );
    if (sections.length === 0) return;

    const themeFor = (el: HTMLElement): NavTheme => {
      const value = el.dataset.sectionTheme;
      return value === "dark" ? "dark" : "light";
    };

    const resolveFromPosition = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
          setTheme(themeFor(sections[i]));
          return;
        }
      }
      setTheme(themeFor(sections[0]));
    };

    resolveFromPosition();

    const onScrollOrResize = () => resolveFromPosition();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return theme;
}
