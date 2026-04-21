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
 *
 * Rendered as two nested spans: the outer holds the gradient as a
 * `background-image` (via Tailwind's `bg-[image:var(--…)]` syntax — the bare
 * `bg-[var(--…)]` form would compile to `background-color` which is invalid
 * for a `linear-gradient()` value and would render nothing). The inner span
 * fills with the surface color, leaving just the 1px padding of the outer
 * span visible as the gradient ring.
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
        "bg-[image:var(--accent-gradient)]",
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
