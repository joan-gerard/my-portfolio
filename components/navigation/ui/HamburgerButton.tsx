import { motion } from "framer-motion";
import { useEffect } from "react";

export const HamburgerButton = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (value: boolean) => void;
}) => {
  // Add useEffect to toggle body scroll
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [active]);

  return (
    <>
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        variants={UNDERLAY_VARIANTS}
        style={{ top: 24, right: 24 }}
        className="fixed z-10 rounded-xl bg-red-400 overflow-hidden"
      />
{/* bg-zinc-950 */}
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive(!active)}
        className={`group fixed right-6 top-6 z-50 h-10 w-10 transition-all bg-black ${
          active ? "rounded-bl-xl rounded-tr-xl" : "rounded-xl"
        }`}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block h-0.5 w-4 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block h-0.5 w-4 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block h-0.5 w-2 bg-white"
          style={{ x: "-50%", y: "50%" }}
        />
      </motion.button>
    </>
  );
};

const UNDERLAY_VARIANTS = {
  open: {
    width: "calc(100% - 30px)",
    height: "calc(100vh - 30px)",
    transition: { type: "spring", mass: 1, stiffness: 900, damping: 90 },
  },
  closed: {
    width: "40px",
    height: "40px",
    transition: {
      delay: 0.75,
      type: "spring",
      mass: 1,
      stiffness: 900,
      damping: 50,
    },
  },
};

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 4px)",
    },
  },
};
