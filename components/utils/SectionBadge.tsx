import clsx from "clsx";
import { ReactNode } from "react";

type Tone = "light" | "dark";

interface SectionBadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

/**
 * Small uppercase pill with a gradient border (orange -> pink -> purple).
 * Rendered as two nested spans: the outer holds the gradient background,
 * the inner masks everything except the 1px ring, using the surface color
 * so the gradient only shows as a thin outline.
 */
export const SectionBadge = ({
  children,
  tone = "light",
  className,
}: SectionBadgeProps) => {
  const innerBg =
    tone === "light" ? "bg-[var(--surface-light)]" : "bg-[var(--surface-dark)]";
  const innerText = tone === "light" ? "text-[var(--ink)]" : "text-white";

  return (
    <span
      className={clsx(
        "inline-flex rounded-full p-px",
        "bg-[var(--accent-gradient)]",
        className,
      )}
    >
      <span
        className={clsx(
          "inline-flex items-center rounded-full px-3 py-1.5",
          "text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em]",
          innerBg,
          innerText,
        )}
      >
        {children}
      </span>
    </span>
  );
};

export default SectionBadge;
