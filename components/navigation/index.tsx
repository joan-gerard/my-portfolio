"use client";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import NavigationPanel from "./NavigationPanel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Reveal } from "@/components/utils";

const HOME_HERO_TITLE_ID = "home-hero-title";

const brandLinkClass =
  "text-white text-2xl font-medium uppercase";

function NavBrandLink() {
  return (
    <Reveal width="w-fit">
      <Link href="/" className={brandLinkClass}>
        Joan Gerard
      </Link>
    </Reveal>
  );
}

/**
 * Only mounted on `/`. Hides the nav name while the hero `<h1>` is visible;
 * initial state assumes it is in view so the duplicate name stays hidden.
 */
function HomeNavBrandLink() {
  const [titleInView, setTitleInView] = useState(true);

  useEffect(() => {
    const el = document.getElementById(HOME_HERO_TITLE_ID);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setTitleInView(entry.isIntersecting);
      },
      { threshold: 0, root: null }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (titleInView) return null;

  return <NavBrandLink />;
}

const Navigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid place-content-center relative z-50">
      <div className="flex items-center text-white fixed w-full p-4 bg-white/5 backdrop-blur">
        <div className="min-w-0 flex-1">
          {pathname === "/" ? (
            <HomeNavBrandLink />
          ) : (
            <NavBrandLink />
          )}
        </div>
        <motion.button
          whileHover={{ color: "#6366f1" }}
          whileTap={{ scale: 0.9, rotate: "180deg" }}
          onClick={() => setIsOpen(true)}
          className="text-3xl text-white transition-colors rounded-full"
        >
          <FiMenu />
        </motion.button>
      </div>
      <NavigationPanel isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navigation;
