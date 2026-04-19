"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

const NavigationPanel = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) => {
  const pathname = usePathname();

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
        <NavLink setIsOpen={setIsOpen} text="about" />
        <NavLink setIsOpen={setIsOpen} text="work" />
        <NavLink setIsOpen={setIsOpen} text="experience" />
        <NavLink
          setIsOpen={setIsOpen}
          text="blog"
          href="/blog"
          isActive={pathname === "/blog"}
        />
        <NavLink setIsOpen={setIsOpen} text="contact" />
      </motion.div>
    </motion.nav>
  );
};

const NavLink = ({
  text,
  setIsOpen,
  href,
  isActive = false,
}: {
  text: string;
  setIsOpen: (arg: boolean) => void;
  href?: string;
  isActive?: boolean;
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

    const scrollToElement = () => {
      const element = document.getElementById(text);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - 120;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    if (pathname !== "/") {
      router.push("/");
      setTimeout(scrollToElement, 100);
      return;
    }

    scrollToElement();
  };
  return (
    // <Link href={`#${text}`}>
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
      // whileHover={{
      //   y: -15,
      //   rotate: "-7.5deg",
      // }}
      rel="nofollow"
    >
      {text}
    </motion.p>
    // </Link>
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
