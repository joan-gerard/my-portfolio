"use client";
import { Reveal } from "@/components/utils";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import NavigationPanel from "./NavigationPanel";

type NavTheme = "light" | "dark";

const HOME_HERO_TITLE_ID = "home-hero-title";

const brandLinkBase = "text-2xl font-medium uppercase";

function NavBrandLink({ theme }: { theme: NavTheme }) {
  return (
    <Reveal width="w-fit">
      <Link
        href="/"
        className={clsx(
          brandLinkBase,
          theme === "light" ? "text-[var(--ink)]" : "text-white",
        )}
      >
        Joan Gerard
      </Link>
    </Reveal>
  );
}

/**
 * Only mounted on `/`. Hides the nav name while the hero `<h1>` is visible;
 * initial state assumes it is in view so the duplicate name stays hidden.
 */
function HomeNavBrandLink({ theme }: { theme: NavTheme }) {
  const [titleInView, setTitleInView] = useState(true);

  useEffect(() => {
    const el = document.getElementById(HOME_HERO_TITLE_ID);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setTitleInView(entry.isIntersecting);
      },
      { threshold: 0, root: null },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (titleInView) return null;

  return <NavBrandLink theme={theme} />;
}

/**
 * Tracks the currently-visible `[data-section-theme]` element that crosses the
 * top of the viewport so the nav bar can swap between light and dark palettes
 * as the user scrolls across alternating sections.
 *
 * We use an IntersectionObserver with a very thin band near the top of the
 * viewport so the nav flips as soon as the next section's leading edge reaches
 * the nav. A scroll fallback handles the initial render and edge cases where
 * the observer hasn't fired yet.
 */
function useActiveSectionTheme(): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("light");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-theme]"),
    );
    if (sections.length === 0) return;

    const PROBE_Y = 80;

    const themeFor = (el: HTMLElement): NavTheme => {
      const value = el.dataset.sectionTheme;
      return value === "dark" ? "dark" : "light";
    };

    const resolveFromPosition = () => {
      // Walk sections in reverse so the bottom-most section whose top is above
      // the probe wins; that's the section the probe line currently sits in.
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

const Navigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useActiveSectionTheme();

  const barSurface =
    theme === "light"
      ? "bg-[var(--surface-light)]/70 border-[var(--hairline-light)]"
      : "bg-[var(--surface-dark)]/60 border-[var(--hairline-dark)]";

  const buttonColor =
    theme === "light" ? "text-[var(--ink)]" : "text-white";

  return (
    <div className="grid place-content-center relative z-50">
      <div
        className={clsx(
          "flex items-center fixed w-full py-4 px-6 lg:px-24 xl:px-36 backdrop-blur-md border-b transition-colors duration-300",
          barSurface,
        )}
      >
        <div className="min-w-0 flex-1">
          {pathname === "/" ? (
            <HomeNavBrandLink theme={theme} />
          ) : (
            <NavBrandLink theme={theme} />
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9, rotate: "180deg" }}
          onClick={() => setIsOpen(true)}
          className={clsx(
            "text-3xl transition-colors rounded-full",
            buttonColor,
          )}
          aria-label="Open navigation"
        >
          <FiMenu />
        </motion.button>
      </div>
      <NavigationPanel isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navigation;
