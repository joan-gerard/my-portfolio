"use client";

import { useState } from "react";
import { BlogToc } from "@/components/blog/BlogToc";
import { FiList } from "react-icons/fi";

type TocItem = {
  id: string;
  label: string;
};

type BlogTocMobileProps = {
  items: TocItem[];
};

export function BlogTocMobile({ items }: BlogTocMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items.length) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 xl:hidden">
      {isOpen ? (
        <div
          id="mobile-toc-panel"
          className="w-[min(20rem,calc(100vw-3rem))] rounded-2xl bg-[var(--surface-light)] p-4 shadow-lg"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
              On this page
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-1 text-xs font-medium text-[var(--ink-muted)] hover:bg-black/5 hover:text-[var(--ink)]"
              aria-label="Close table of contents"
            >
              Close
            </button>
          </div>
          <div className="max-h-[50vh] overflow-y-auto pr-1">
            <BlogToc items={items} onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ink)] text-white shadow-md transition hover:bg-black"
        aria-expanded={isOpen}
        aria-controls="mobile-toc-panel"
        aria-label={isOpen ? "Hide table of contents" : "Show table of contents"}
      >
        <FiList className="text-lg" aria-hidden />
      </button>
    </div>
  );
}
