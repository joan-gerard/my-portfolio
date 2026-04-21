"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavTheme = "light" | "dark";

/** Where the nav pill sits — probe just below it, near the top of the viewport. */
const TOP_PROBE_OFFSET = 80;
/** Mirrors the back-to-top button's offset from the bottom of the viewport. */
const BOTTOM_PROBE_OFFSET = 80;

/**
 * Which edge of the viewport a caller wants to read the active section from.
 *
 * - `"top"`: read the section just below the top of the viewport (nav pill).
 * - `"bottom"`: read the section just above the bottom of the viewport
 *   (floating affordances like the back-to-top button).
 */
export type ThemeProbeAnchor = "top" | "bottom";

/**
 * Tracks the currently-visible `[data-section-theme]` element that crosses a
 * probe line in the viewport so floating UI can swap between light and dark
 * palettes as the user scrolls across alternating sections.
 *
 * Walks sections in reverse so the bottom-most section whose top is above the
 * probe line wins — that's the section the probe currently sits inside.
 * Tied to `scroll` and `resize` so consumers stay in sync in all cases
 * (initial render, keyboard paging, viewport changes, etc).
 *
 * ### Why `anchor` exists
 *
 * Different floating affordances live at different edges of the viewport. The
 * nav pill reads what's at the top; the back-to-top button needs to read what
 * it is physically hovering above, i.e. what's at the bottom. Passing
 * `"bottom"` moves the probe line to `viewportHeight - BOTTOM_PROBE_OFFSET`
 * so the returned theme matches whatever section is immediately under the
 * bottom-right corner of the viewport.
 *
 * ### Why `pathname` is a dependency
 *
 * Consumers stay mounted across client-side route changes (they live in the
 * shared layout). If we query `[data-section-theme]` only on mount, every
 * subsequent navigation leaves us holding references to the previous page's
 * DOM nodes — `getBoundingClientRect` on those stale nodes returns zeros and
 * the theme freezes. Re-keying the effect on `pathname` re-queries the
 * sections that belong to the page the user just navigated to.
 *
 * Next.js also performs the new page's initial scroll restoration before this
 * effect re-runs, so a single `resolveFromPosition` call after re-querying is
 * enough to land on the correct theme.
 */
export function useActiveSectionTheme(
  anchor: ThemeProbeAnchor = "top",
): NavTheme {
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

    // Probe Y is dynamic for the "bottom" anchor because the viewport height
    // can change with mobile URL-bar collapse, device rotation, etc. Recompute
    // on every resolve rather than caching.
    const getProbeY = () =>
      anchor === "bottom"
        ? window.innerHeight - BOTTOM_PROBE_OFFSET
        : TOP_PROBE_OFFSET;

    const resolveFromPosition = () => {
      if (sections.length === 0) return;
      const probeY = getProbeY();
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
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
  }, [pathname, anchor]);

  return theme;
}
