"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const LiquidSideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid place-content-center relative z-10">
      <div className="flex items-center text-white fixed justify-between w-full p-4 bg-white/5 backdrop-blur">
        <p className="text-white text-2xl font-medium">JOAN GERARD</p>
        <motion.button
          whileHover={{ rotate: "180deg" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="text-3xl text-white transition-colors rounded-full"
        >
          <FiMenu />
        </motion.button>
      </div>
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const Nav = ({
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
        whileHover={{ rotate: "180deg" }}
        onClick={() => setIsOpen(false)}
        whileTap={{ scale: 0.9 }}
      >
        <FiX />
      </motion.button>
      <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-4 absolute bottom-8 left-8"
      >
        <NavLink setIsOpen={setIsOpen} text="work" />
        <NavLink setIsOpen={setIsOpen} text="skills" />
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
  const handleScroll = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    // <Link href={`#${text}`}>
    <motion.p
      className="inline-block text-white opacity-80 w-fit font-extrabold text-7xl hover:opacity-100 transition-colors uppercase"
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

export default LiquidSideNav;

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
