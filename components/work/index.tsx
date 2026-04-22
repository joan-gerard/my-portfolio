import { CtaButton, SectionHeader } from "@/components/utils";
import { work } from "@/constants/work";
import { WorkCaseStudyList } from "./WorkCaseStudyList";

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
          title="Built with curiosity, crafted with care"
          kicker="A curated selection of products and experiments I have built, shipped, and continuously improved."
          align="center"
          className="mb-16 mx-auto"
        />

        <WorkCaseStudyList items={items} />

        <div className="mt-16 flex justify-center">
          <CtaButton href="/work" surface="dark" variant="outline">
            View all projects
          </CtaButton>
        </div>
      </div>
    </section>
  );
};
