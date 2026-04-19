import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const Hero_V2 = () => {
  return (
    <div className="relative flex min-h-full w-full flex-1 flex-col justify-center">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-transparent"
        aria-hidden
      />
      <div className="relative w-full px-6 py-12 md:px-24">
        <div className="flex max-w-3xl flex-col gap-8 border-l-4 border-indigo-500 pl-6 md:pl-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            Full-stack · DevOps
          </p>
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
              Joan
            </span>
            <span className="text-4xl font-black uppercase leading-none tracking-tight text-white/90 md:text-6xl lg:text-7xl">
              Gerard
            </span>
          </div>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-white/95 md:text-lg">
            Full Stack Engineer with a growing DevOps skill set. I build
            thoughtful web applications and I am currently learning how to ship
            and run them better.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-indigo-400/80 hover:bg-white/15"
            >
              View work
              <FiArrowUpRight
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero_V2;
