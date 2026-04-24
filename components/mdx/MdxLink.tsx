import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type AnchorProps = ComponentPropsWithoutRef<"a">;

function isHttpUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isInternalPath(href: string): boolean {
  return href.startsWith("/");
}

export function MdxLink({ href, rel, ...props }: AnchorProps) {
  if (!href) {
    return <a {...props} rel={rel} />;
  }

  if (isHttpUrl(href)) {
    const safeRel = rel ? `${rel} noopener noreferrer` : "noopener noreferrer";
    return <a {...props} href={href} target="_blank" rel={safeRel} />;
  }

  if (isInternalPath(href)) {
    return <Link href={href} {...props} />;
  }

  return <a {...props} href={href} rel={rel} />;
}
