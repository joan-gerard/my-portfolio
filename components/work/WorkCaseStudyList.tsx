import clsx from "clsx";
import type { Build } from "@/constants/work";
import { WorkCaseStudy } from "./WorkCaseStudy";

interface WorkCaseStudyListProps {
  items: Build[];
  className?: string;
}

export function WorkCaseStudyList({ items, className }: WorkCaseStudyListProps) {
  const useGrid = items.length >= 2;

  return (
    <div
      className={clsx(
        useGrid ? "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8" : "space-y-4",
        className,
      )}
    >
      {items.map((item) => (
        <WorkCaseStudy
          key={item.slug}
          imgUrl={item.imgUrl}
          title={item.subheading}
          tagline={item.heading}
          category={item.category}
          slug={item.slug}
        />
      ))}
    </div>
  );
}
