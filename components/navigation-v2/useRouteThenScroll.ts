"use client";

import { scrollToElementById } from "@/lib/scrollToSection";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent as ReactMouseEvent, useEffect, useRef } from "react";

/**
 * Handles the shared nav behavior for in-page anchors:
 * - on `/`, smooth-scroll directly
 * - on other routes, navigate home first and then scroll after route change
 */
export function useRouteThenScroll(sectionId: string) {
  const pathname = usePathname();
  const router = useRouter();
  const pendingRef = useRef(false);

  useEffect(() => {
    if (pathname === "/" && pendingRef.current) {
      pendingRef.current = false;
      scrollToElementById(sectionId);
    }
  }, [pathname, sectionId]);

  const onClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (pathname !== "/") {
      pendingRef.current = true;
      router.push("/");
      return;
    }

    scrollToElementById(sectionId);
  };

  return { onClick };
}
