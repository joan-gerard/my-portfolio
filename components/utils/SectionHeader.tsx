import clsx from "clsx";
import Reveal from "./Reveal";

interface Props {
  title: string;
  dir?: "l" | "r";
  className?: string;
}

export const SectionHeader = ({ title, dir = "r", className }: Props) => {
  return (
    <div
      className={clsx("flex items-center gap-8", className)}
      style={{ flexDirection: dir === "r" ? "row" : "row-reverse" }}
    >
      <div className="w-full h-[1px] bg-zinc-700" />
      <h2>
        <Reveal>
          <span className="text-3xl md:text-5xl text-white font-black text-end uppercase">
            {title}
          </span>
        </Reveal>
      </h2>
    </div>
  );
};
