import clsx from "clsx";
import type { ReactNode } from "react";

type Tone = "light" | "dark";

interface DetailsGridProps {
  tone: Tone;
  className?: string;
  children: ReactNode;
}

interface DetailsGridItemProps {
  tone: Tone;
  label: string;
  children: ReactNode;
}

export function DetailsGrid({ tone, className, children }: DetailsGridProps) {
  return (
    <dl
      className={clsx(
        "grid grid-cols-1 gap-y-6 border-y py-8",
        tone === "light"
          ? "border-[var(--hairline-light)] sm:grid-cols-3"
          : "border-[var(--hairline-dark)] sm:grid-cols-2",
        className,
      )}
    >
      {children}
    </dl>
  );
}

export function DetailsGridItem({ tone, label, children }: DetailsGridItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <dt
        className={clsx(
          "text-[10px] font-semibold uppercase tracking-[0.2em] md:text-xs",
          tone === "light"
            ? "text-[var(--ink-subtle)]"
            : "text-[var(--ink-dark-subtle)]",
        )}
      >
        {label}
      </dt>
      <dd
        className={clsx(
          "text-base font-medium md:text-lg",
          tone === "light" ? "text-[var(--ink)]" : "text-white",
        )}
      >
        {children}
      </dd>
    </div>
  );
}
