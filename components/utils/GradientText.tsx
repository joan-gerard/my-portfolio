import clsx from "clsx";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Renders its children with the Portoz accent gradient (orange -> pink -> purple)
 * clipped to the text. Use on headings or inline spans where the word itself
 * should carry the gradient.
 */
export const GradientText = ({ children, className }: GradientTextProps) => {
  return (
    <span
      className={clsx(
        "bg-[image:var(--accent-gradient)] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
};

export default GradientText;
