"use client";

import NavigationPanel from "@/components/navigation/NavigationPanel";
import { CtaButton } from "@/components/utils";
import { scrollToElementById } from "@/lib/scrollToSection";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiMenu } from "react-icons/fi";
import { useActiveSectionTheme, type NavTheme } from "./useActiveSectionTheme";

/**
 * In-page sections are referenced by their element id. External routes use a
 * full `href`. We treat these two kinds of links uniformly so the nav can
 * render a single link component that handles both cases.
 */
type NavLinkItem =
  | { label: string; kind: "section"; section: string }
  | { label: string; kind: "route"; href: string };

const LINKS: NavLinkItem[] = [
  { label: "About", kind: "section", section: "about" },
  { label: "Work", kind: "section", section: "work" },
  { label: "Experience", kind: "section", section: "experience" },
  { label: "Blog", kind: "route", href: "/blog" },
];

/**
 * Portoz-inspired floating pill navigation.
 *
 * - Left: brand link (auto-hides on the home hero to avoid duplicating the
 *   large hero title).
 * - Center (lg+): inline text links that smooth-scroll to in-page sections
 *   on `/` or navigate to standalone routes (e.g. /blog).
 * - Right: a primary "Contact" CTA (solid pill that flips black/white by
 *   surface), and a hamburger on mobile that opens the existing full-screen
 *   `NavigationPanel` drawer.
 *
 * Theme-aware via `useActiveSectionTheme` — the pill background, borders,
 * link colors and CTA all follow whichever `[data-section-theme]` section is
 * currently intersecting the top of the viewport.
 */
const NavigationV2 = () => {
  const pathname = usePathname();
  const theme = useActiveSectionTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pillSurface =
    theme === "light"
      ? "bg-[var(--surface-light)]/80 border-[var(--hairline-light)]"
      : "bg-[var(--surface-dark)]/70 border-[var(--hairline-dark)]";

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 md:top-6 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div
            className={clsx(
              "pointer-events-auto flex items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-md transition-colors duration-300 md:gap-6 md:px-4 md:py-2.5",
              pillSurface,
            )}
          >
            <NavBrand theme={theme} />

            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Primary"
            >
              {LINKS.map((link) => (
                <NavInlineLink
                  key={link.label}
                  link={link}
                  theme={theme}
                  pathname={pathname}
                />
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              {/*
                Responsive visibility lives on this wrapper, NOT on the
                CtaButton itself. `CtaButton`'s baseClasses hard-code
                `inline-flex`, and Tailwind's generated CSS emits `inline-flex`
                after `hidden`, so any `hidden` class we pass into the button
                is silently overridden by the cascade. Wrapping sidesteps that
                fight entirely: the wrapper's `display: none` hides the whole
                subtree below `lg`, the button's own display rules only kick
                in once the wrapper itself is visible.
              */}
              <div className="hidden lg:inline-flex">
                <ContactCta theme={theme} pathname={pathname} />
              </div>
              <MobileMenuButton
                theme={theme}
                onOpen={() => setIsDrawerOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <NavigationPanel isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </>
  );
};

export default NavigationV2;

/**
 * Brand link. Always visible — clicking it returns to the home route, and
 * the duplication-with-hero-title concern was considered cosmetic enough that
 * keeping the brand anchored on every page/scroll position is worth the
 * minor visual overlap at the very top of `/`.
 */
function NavBrand({ theme }: { theme: NavTheme }) {
  return (
    <Link
      href="/"
      aria-label="Joan Gerard — Home"
      className={clsx(
        "flex-shrink-0 text-base font-semibold uppercase tracking-[0.2em] transition-colors duration-300 md:text-lg",
        theme === "light" ? "text-[var(--ink)]" : "text-white",
      )}
    >
      Joan Gerard
    </Link>
  );
}

/**
 * Inline text link. Smooth-scrolls on `/` when pointing at a section id, or
 * hops to `/` first and scrolls after hydration. External-route links use a
 * normal `<Link>` and let Next handle navigation.
 */
function NavInlineLink({
  link,
  theme,
  pathname,
}: {
  link: NavLinkItem;
  theme: NavTheme;
  pathname: string;
}) {
  const router = useRouter();
  const pendingSectionRef = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === "/" && pendingSectionRef.current) {
      const id = pendingSectionRef.current;
      pendingSectionRef.current = null;
      scrollToElementById(id);
    }
  }, [pathname]);

  const colorClass =
    theme === "light"
      ? "text-[var(--ink)] hover:text-[var(--ink-muted)]"
      : "text-white hover:text-[var(--ink-dark-muted)]";

  const baseClass =
    "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors";

  if (link.kind === "route") {
    const isActive = pathname.startsWith(link.href);
    return (
      <Link
        href={link.href}
        aria-current={isActive ? "page" : undefined}
        className={clsx(
          baseClass,
          colorClass,
          isActive &&
            "underline decoration-[var(--accent-mid)] decoration-2 underline-offset-8",
        )}
      >
        {link.label}
      </Link>
    );
  }

  const section = link.section;
  const handleSectionClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== "/") {
      pendingSectionRef.current = section;
      router.push("/");
      return;
    }
    scrollToElementById(section);
  };

  return (
    <a
      href={`/#${section}`}
      onClick={handleSectionClick}
      className={clsx(baseClass, colorClass)}
    >
      {link.label}
    </a>
  );
}

/**
 * Primary CTA — the Portoz equivalent of "BOOK A CALL". Scrolls to `#contact`
 * on `/`, navigates home first otherwise. Uses the solid `CtaButton` variant
 * so it auto-flips black/white based on the active surface theme.
 */
function ContactCta({
  theme,
  pathname,
  className,
}: {
  theme: NavTheme;
  pathname: string;
  className?: string;
}) {
  const router = useRouter();
  const pendingRef = useRef(false);

  useEffect(() => {
    if (pathname === "/" && pendingRef.current) {
      pendingRef.current = false;
      scrollToElementById("contact");
    }
  }, [pathname]);

  const handleClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      e.preventDefault();
      pendingRef.current = true;
      router.push("/");
      return;
    }
    e.preventDefault();
    scrollToElementById("contact");
  };

  return (
    <CtaButton
      href="/#contact"
      surface={theme}
      variant="solid"
      onClick={handleClick}
      className={clsx(
        "text-[10px] md:text-xs px-4 md:px-5 py-2 md:py-2.5",
        className,
      )}
    >
      Contact
    </CtaButton>
  );
}

/**
 * Hamburger button that opens the full-screen `NavigationPanel`. Only shown
 * up to `lg` — at `lg+` the inline links cover every destination, so the
 * drawer is purely a mobile/tablet affordance.
 */
function MobileMenuButton({
  theme,
  onOpen,
}: {
  theme: NavTheme;
  onOpen: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9, rotate: "180deg" }}
      onClick={onOpen}
      aria-label="Open navigation"
      className={clsx(
        "flex h-9 w-9 items-center justify-center rounded-full text-xl transition-colors md:h-10 md:w-10 md:text-2xl lg:hidden",
        theme === "light" ? "text-[var(--ink)]" : "text-white",
      )}
    >
      <FiMenu />
    </motion.button>
  );
}
