import clsx from "clsx";

type Tone = "light" | "dark";

interface ChipProps {
  children: string;
  tone?: Tone;
  className?: string;
}

export const Chip = ({ children, tone = "light", className }: ChipProps) => {
  const toneClasses =
    tone === "light"
      ? "bg-black/5 text-[var(--ink)] border border-[var(--hairline-light)]"
      : "bg-white/5 text-white border border-[var(--hairline-dark)]";

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        toneClasses,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Chip;
