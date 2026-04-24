"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

type BlogTocProps = {
  items: TocItem[];
  onNavigate?: () => void;
};

export function BlogToc({ items, onNavigate }: BlogTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    if (!headings.length) return;

    const updateActiveFromScrollPosition = () => {
      // Use a top offset so the active section reflects what the reader is
      // currently viewing under the sticky header.
      const activationOffset = 140;
      const scrollY = window.scrollY + activationOffset;

      let nextActiveId = headings[0].id;
      for (const heading of headings) {
        if (heading.offsetTop <= scrollY) {
          nextActiveId = heading.id;
        } else {
          break;
        }
      }

      setActiveId(nextActiveId);
    };

    updateActiveFromScrollPosition();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.4, 0.7, 1],
      },
    );

    for (const heading of headings) observer.observe(heading);
    window.addEventListener("scroll", updateActiveFromScrollPosition, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveFromScrollPosition);
    };
  }, [items]);

  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-2">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={onNavigate}
                className={
                  "text-sm transition-colors " +
                  (isActive
                    ? "font-semibold text-[var(--ink)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]")
                }
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
