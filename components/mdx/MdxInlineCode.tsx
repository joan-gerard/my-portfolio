import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export function MdxInlineCode({
  className,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={clsx(
        "rounded-md border border-[var(--hairline-light)] bg-black/[0.06] px-1.5 py-0.5 text-[0.9em] font-mono text-[var(--ink)]",
        className,
      )}
    />
  );
}
