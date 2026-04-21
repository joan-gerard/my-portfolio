import { CtaButton, SectionHeader } from "@/components/utils";
import { work } from "@/constants/work";
import { WorkCaseStudy } from "./WorkCaseStudy";

export const Work = () => {
  const featured = work.filter((el) => el.isFeatured);
  const recent = work.filter((el) => !el.isFeatured).slice(0, 3);
  const items = featured.concat(recent);

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
          title="Meet with creative things"
          kicker="A selection of things I've built, shipped and tinkered with."
          align="center"
          className="mb-16 mx-auto"
        />

        <div className="space-y-4">
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
