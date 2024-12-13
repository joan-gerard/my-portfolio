import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const NavigationContent = ({
  setActive,
}: {
  setActive: (value: boolean) => void;
}) => {
  return (
    <nav className="fixed right-4 top-4 z-40 h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden">
      <Logo />
      <LinksContainer setActive={setActive} />
      <FooterCTAs />
    </nav>
  );
};

const Logo = () => {
  return (
    <motion.a
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, y: -12 }}
      href="#"
      className="grid h-20 relative left-6"
    >
      <p className="text-white text-2xl font-medium place-content-center">
        Joan Gerard
      </p>
    </motion.a>
  );
};

const LinksContainer = ({
  setActive,
}: {
  setActive: (value: boolean) => void;
}) => {
  return (
    <motion.div className="space-y-4 p-12 pl-4 md:pl-10">
      {LINKS.map((l, idx) => {
        return (
          <NavLink key={l.title} href={l.href} idx={idx} setActive={setActive}>
            {l.title}
          </NavLink>
        );
      })}
    </motion.div>
  );
};

const NavLink = ({
  children,
  href,
  idx,
  setActive,
}: {
  children: ReactNode;
  href: string;
  idx: number;
  setActive: (value: boolean) => void;
}) => {
  return (
    <motion.a
      initial={{ opacity: 0, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.75 + idx * 0.125,
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      exit={{ opacity: 0, y: -8 }}
      href={href}
      className="block text-5xl md:text-6xl font-medium text-white transition-colors opacity-80 uppercase"
      onClick={() => setActive(false)}
    >
      {children}
    </motion.a>
  );
};

const FooterCTAs = () => {
  return (
    <>
      <div className="absolute bottom-6 left-6 flex gap-4">
        {SOCIAL_CTAS.map((l, idx) => {
          return (
            <motion.a
              key={idx}
              href={l.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1 + idx * 0.125,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              exit={{ opacity: 0, y: -8 }}
            >
              <l.Component className="text-2xl text-white transition-colors hover:text-violet-300" />
            </motion.a>
          );
        })}
      </div>

      {/* <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.125,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, y: 8 }}
        className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-violet-700 px-3 py-3 text-4xl uppercase text-violet-200 transition-colors hover:bg-white hover:text-violet-600 md:bottom-4 md:right-4 md:px-6 md:text-2xl"
      >
        <span className="hidden md:block">contact us</span> <FiArrowRight />
      </motion.button> */}
    </>
  );
};

const LINKS = [
  {
    title: "Work",
    href: "#",
  },
  {
    title: "Skills",
    href: "#",
  },
  {
    title: "Experience",
    href: "#",
  },
  {
    title: "Contact",
    href: "#",
  },
];

const SOCIAL_CTAS = [
  {
    Component: SiGithub,
    href: "#",
  },
  {
    Component: SiLinkedin,
    href: "#",
  },
];
