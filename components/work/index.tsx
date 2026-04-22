import { CtaButton, SectionHeader } from "@/components/utils";
import { work } from "@/constants/work";
import clsx from "clsx";
import { WorkCaseStudy } from "./WorkCaseStudy";

export const Work = () => {
  const featured = work.filter((el) => el.isFeatured);
  const recent = work.filter((el) => !el.isFeatured).slice(0, 3);
  const items = featured.concat(recent);
  // Only switch to a 2-col grid when we have ≥ 2 items; otherwise a single
  // card in a 2-col grid would leave an orphan empty column.
  const useGrid = items.length >= 2;

  return (
    <section
      id="work"
      data-section-theme="dark"
      className="bg-[var(--surface-dark)] text-white px-6 py-24 lg:px-24 xl:px-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tone="dark"
          eyebrow="Builds"
          title="Built with curiosity, crafted with care"
          kicker="A curated selection of products and experiments I have built, shipped, and continuously improved."
          align="center"
          className="mb-16 mx-auto"
        />

        <div
          className={clsx(
            useGrid
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
              : "space-y-4",
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

        <div className="mt-16 flex justify-center">
          <CtaButton href="/work" surface="dark" variant="outline">
            View all projects
          </CtaButton>
        </div>
      </div>
    </section>
  );
};
