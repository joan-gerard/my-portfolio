import { WorkCaseStudy } from "@/components/work/WorkCaseStudy";
import { CtaButton, SectionHeader } from "@/components/utils";
import { work } from "@/constants/work";

export const metadata = {
  title: "Work | Joan Gerard",
  description:
    "A full archive of the products, prototypes and side projects I've shipped.",
};

/**
 * Full `/work` index — mirrors Portoz's `/case-study` page:
 * a large headline introduces the archive, followed by a vertical stack of
 * case-study rows rendered with the same `WorkCaseStudy` card used on the
 * home-page Work section.
 */
export default function WorkPage() {
  return (
    <main
      data-section-theme="dark"
      className="min-h-screen bg-[var(--surface-dark)] text-white"
    >
      <section className="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:pt-40 lg:px-12">
        <SectionHeader
          tone="dark"
          eyebrow="Case Study"
          title="Meet with creative things"
          kicker="A full archive of the products, prototypes and side projects I've built and shipped."
          align="center"
          className="mx-auto mb-16 items-center text-center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {work.map((item) => (
            <WorkCaseStudy
              key={item.slug}
              imgUrl={item.imgUrl}
              title={item.subheading}
              tagline={item.heading}
              category={item.stack[0] ?? "Project"}
              slug={item.slug}
            />
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <CtaButton href="/#contact" surface="dark" variant="outline">
            Start a project
          </CtaButton>
        </div>
      </section>
    </main>
  );
}
