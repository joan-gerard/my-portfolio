import clsx from "clsx";
import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";

type Surface = "light" | "dark";
type Variant = "solid" | "outline";

interface BaseProps {
  children: ReactNode;
  /**
   * The surface the button sits on. `solid` inverts (black pill on light
   * surfaces, white pill on dark surfaces). `outline` uses the gradient
   * border regardless of surface.
   */
  surface?: Surface;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
}

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type CtaButtonProps = AnchorProps | ButtonProps;

const baseClasses =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs md:text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-200";

function getSolidClasses(surface: Surface): string {
  return surface === "light"
    ? "bg-[var(--ink)] text-white hover:bg-black/85"
    : "bg-white text-[var(--ink)] hover:bg-white/90";
}

function getOutlineInnerClasses(surface: Surface): string {
  return surface === "light"
    ? "bg-[var(--surface-light)] text-[var(--ink)] hover:bg-white"
    : "bg-[var(--surface-dark)] text-white hover:bg-black/70";
}

/**
 * Portoz-style call-to-action. Renders as `<Link>` when `href` is provided,
 * otherwise as `<button>`. Supports a solid variant (automatic colour flip
 * based on `surface`) and an outline variant with a gradient ring.
 */
export const CtaButton = (props: CtaButtonProps) => {
  const {
    children,
    surface = "light",
    variant = "solid",
    showArrow = true,
    className,
    ...rest
  } = props;

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <FiArrowUpRight className="text-base md:text-lg" aria-hidden />
      ) : null}
    </>
  );

  if (variant === "outline") {
    const wrapperClass = clsx(
      "inline-flex rounded-full p-px bg-[image:var(--accent-gradient)]",
      className,
    );
    const innerClass = clsx(baseClasses, getOutlineInnerClasses(surface));

    if ("href" in rest && rest.href) {
      const { href, external, ...anchorRest } = rest as AnchorProps;
      const externalProps = external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};
      return (
        <Link href={href} className={wrapperClass} {...externalProps} {...anchorRest}>
          <span className={innerClass}>{content}</span>
        </Link>
      );
    }

    const { type = "button", ...buttonRest } = rest as ButtonProps;
    return (
      <button type={type} className={wrapperClass} {...buttonRest}>
        <span className={innerClass}>{content}</span>
      </button>
    );
  }

  const solidClass = clsx(baseClasses, getSolidClasses(surface), className);

  if ("href" in rest && rest.href) {
    const { href, external, ...anchorRest } = rest as AnchorProps;
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link href={href} className={solidClass} {...externalProps} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonProps;
  return (
    <button type={type} className={solidClass} {...buttonRest}>
      {content}
    </button>
  );
};

export default CtaButton;
