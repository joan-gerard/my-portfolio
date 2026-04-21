"use client";

import { usePathname } from "next/navigation";
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
 *
 * ### Why `pathname` is a dependency
 *
 * The nav stays mounted across client-side route changes (it lives in the
 * shared layout). If we query `[data-section-theme]` only on mount, every
 * subsequent navigation leaves us holding references to the previous page's
 * DOM nodes — `getBoundingClientRect` on those stale nodes returns zeros and
 * the nav theme freezes. Re-keying the effect on `pathname` re-queries the
 * sections that belong to the page the user just navigated to.
 *
 * Next.js also performs the new page's initial scroll restoration before this
 * effect re-runs, so a single `resolveFromPosition` call after re-querying is
 * enough to land on the correct theme.
 */
export function useActiveSectionTheme(): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("light");
  const pathname = usePathname();

  useEffect(() => {
    // Defer the first resolve by one frame so the new page's sections have
    // mounted by the time we query — otherwise we'd occasionally grab zero
    // sections right after a route change (before React commits the new tree).
    let rafId = 0;
    let sections: HTMLElement[] = [];

    const themeFor = (el: HTMLElement): NavTheme => {
      const value = el.dataset.sectionTheme;
      return value === "dark" ? "dark" : "light";
    };

    const resolveFromPosition = () => {
      if (sections.length === 0) return;
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
          setTheme(themeFor(sections[i]));
          return;
        }
      }
      setTheme(themeFor(sections[0]));
    };

    const refreshSections = () => {
      sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section-theme]"),
      );
      resolveFromPosition();
    };

    rafId = window.requestAnimationFrame(refreshSections);

    const onScrollOrResize = () => resolveFromPosition();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [pathname]);

  return theme;
}
