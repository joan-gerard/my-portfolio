import clsx from "clsx";
import { ReactNode } from "react";
import Reveal from "./Reveal";
import SectionBadge from "./SectionBadge";

type Tone = "light" | "dark";

interface SectionHeaderProps {
  /** Uppercase eyebrow text shown inside the gradient pill. */
  eyebrow?: string;
  /** Main display heading. */
  title: ReactNode;
  /** Optional lead paragraph below the heading. */
  kicker?: ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}

/**
 * Portoz-style section header: eyebrow pill + large bold heading + optional kicker.
 * Reveals on scroll via the existing `Reveal` primitive.
 */
export const SectionHeader = ({
  eyebrow,
  title,
  kicker,
  tone = "light",
  align = "left",
  className,
}: SectionHeaderProps) => {
  const headingColor = tone === "light" ? "text-[var(--ink)]" : "text-white";
  const kickerColor =
    tone === "light"
      ? "text-[var(--ink-muted)]"
      : "text-[var(--ink-dark-muted)]";
  const alignClass =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div
      className={clsx("flex flex-col gap-5 md:gap-6", alignClass, className)}
    >
      {eyebrow ? (
        <Reveal>
          <SectionBadge tone={tone}>{eyebrow}</SectionBadge>
        </Reveal>
      ) : null}
      <Reveal>
        <h2
          className={clsx(
            "text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance",
            headingColor,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {kicker ? (
        <Reveal>
          <p
            className={clsx(
              "max-w-xl text-base md:text-lg leading-relaxed",
              // Reveal forces its wrapper to w-full, so a block <p> with
              // max-w-xl won't auto-centre. Force mx-auto when the header is
              // center-aligned so the kicker tracks the heading above it.
              align === "center" && "mx-auto",
              kickerColor,
            )}
          >
            {kicker}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
};

export default SectionHeader;
