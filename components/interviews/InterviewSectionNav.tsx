"use client";

import type { TocItem } from "@/lib/mdx-toc";
import { useEffect, useState } from "react";

type Props = {
  items: TocItem[];
};

export function InterviewSectionNav({ items }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Prep sections">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d8cb3]">
        Jump to
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  item.level === 3 ? "pl-5" : ""
                } ${
                  isActive
                    ? "bg-emerald-500/10 font-semibold text-emerald-300"
                    : "text-[#9fb0c8] hover:bg-[#1a2230] hover:text-white"
                }`}
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
