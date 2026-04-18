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
        "rounded-md bg-zinc-800 px-1.5 py-0.5 text-[0.9em] text-indigo-200",
        className,
      )}
    />
  );
}
