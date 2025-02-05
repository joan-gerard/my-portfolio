"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";

const NavigationPanel = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) => {
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
      className="fixed top-0 bottom-0 w-screen bg-black"
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      <motion.button
        className="text-3xl text-white border-[1px] border-transparent transition-colors rounded-full absolute top-4 right-4"
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
        <NavLink setIsOpen={setIsOpen} text="contact" />
      </motion.div>
    </motion.nav>
  );
};

const NavLink = ({
  text,
  setIsOpen,
}: {
  text: string;
  setIsOpen: (arg: boolean) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // console.log("pathname", pathname);

  const handleScroll = (id: string) => {
    setIsOpen(false);

    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - 120;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    // If not on homepage, navigate first then scroll
    if (pathname !== "/") {
      router.push("/");
      setTimeout(scrollToElement, 100);
      return;
    }

    // Already on homepage, just scroll
    scrollToElement();
  };
  return (
    // <Link href={`#${text}`}>
    <motion.p
      className="inline-block text-white opacity-80 w-fit font-extrabold text-4xl sm:text-6xl md:text-7xl hover:opacity-100 transition-colors uppercase hover:cursor-pointer"
      variants={navLinkVariants}
      transition={{
        type: "spring",
        damping: 5,
      }}
      onClick={() => handleScroll(text)}
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
