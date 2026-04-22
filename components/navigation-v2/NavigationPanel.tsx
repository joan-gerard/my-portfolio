"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type MutableRefObject } from "react";
import { FiX } from "react-icons/fi";
import { scrollToElementById } from "@/lib/scrollToSection";

const NavigationPanel = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) => {
  const pathname = usePathname();
  const pendingSectionRef = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === "/" && pendingSectionRef.current) {
      const id = pendingSectionRef.current;
      pendingSectionRef.current = null;
      scrollToElementById(id);
    }
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <motion.nav
      className="fixed top-0 bottom-0 z-50 w-screen bg-black"
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      <motion.button
        className="text-3xl text-white border border-transparent transition-colors rounded-full absolute top-4 right-4"
        whileHover={{ color: "#6366f1" }}
        onClick={() => setIsOpen(false)}
        whileTap={{ scale: 0.9, rotate: "180deg" }}
      >
        <FiX />
      </motion.button>
      <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-4 absolute bottom-8 left-8"
      >
        <NavLink
          setIsOpen={setIsOpen}
          text="about"
          pendingSectionRef={pendingSectionRef}
        />
        <NavLink
          setIsOpen={setIsOpen}
          text="work"
          pendingSectionRef={pendingSectionRef}
        />
        <NavLink
          setIsOpen={setIsOpen}
          text="experience"
          pendingSectionRef={pendingSectionRef}
        />
        <NavLink
          setIsOpen={setIsOpen}
          text="blog"
          href="/blog"
          isActive={pathname === "/blog"}
        />
        <NavLink
          setIsOpen={setIsOpen}
          text="contact"
          pendingSectionRef={pendingSectionRef}
        />
      </motion.div>
    </motion.nav>
  );
};

const NavLink = ({
  text,
  setIsOpen,
  href,
  isActive = false,
  pendingSectionRef,
}: {
  text: string;
  setIsOpen: (arg: boolean) => void;
  href?: string;
  isActive?: boolean;
  pendingSectionRef?: MutableRefObject<string | null>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (href) {
      setIsOpen(false);
      router.push(href);
      return;
    }

    setIsOpen(false);

    if (pathname !== "/") {
      if (pendingSectionRef) {
        pendingSectionRef.current = text;
      }
      router.push("/");
      return;
    }

    scrollToElementById(text);
  };
  return (
    <motion.p
      className={clsx(
        "inline-block w-fit font-extrabold text-4xl uppercase transition-colors hover:cursor-pointer sm:text-6xl md:text-7xl",
        isActive
          ? "text-indigo-400 opacity-100"
          : "text-white opacity-80 hover:opacity-100",
      )}
      variants={navLinkVariants}
      transition={{
        type: "spring",
        damping: 5,
      }}
      onClick={handleClick}
      rel="nofollow"
    >
      {text}
    </motion.p>
  );
};
export default NavigationPanel;

const navVariants = {
  open: {
    x: "0%",
    borderTopLeftRadius: "0vw",
    borderBottomLeftRadius: "0vw",
    opacity: 1,
  },
  closed: {
    x: "100%",
    borderTopLeftRadius: "50vw",
    borderBottomLeftRadius: "50vw",
    opacity: 0,
  },
};

const linkWrapperVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navLinkVariants = {
  open: { x: 0 },
  closed: { x: 25 },
};
