import { CodeCard } from "@/components/CodeCard";
import { StickyImageNew } from "@/components/parallax/StickyImageNew";
import { PageHeader, Reveal } from "@/components/utils";
import { work } from "@/constants/work";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ _slug: string }> }) => {
  const slug = (await params)._slug;
  const project = work.find((el) => el.slug === slug);
  if (!project) {
    notFound();
  }

  const javascriptCode = project.javascriptCode;
  const showCodeCard =
    typeof javascriptCode === "string" && javascriptCode.trim() !== "";

  return (
    <div
      data-section-theme="dark"
      className="bg-[var(--surface-dark)] text-white"
    >
      <Reveal>
        <div className="px-6 my-8 lg:px-24 xl:px-36 mx-auto w-full">
          <PageHeader
            title={project.subheading}
            dir="l"
            className="mb-10 mt-32 "
          />

          <StickyImageNew imgUrl={project.imgUrl} />
          <div className="mx-auto gap-8 flex pb-24 pt-12 text-white z-0 leading-relaxed">
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Id bibendum
              dis imperdiet pulvinar blandit pulvinar; sollicitudin justo. Sit
              pellentesque potenti volutpat vulputate metus. Suspendisse neque
              porttitor sed sollicitudin elit magna. Posuere aenean parturient
              ullamcorper ad mus parturient. Consectetur donec congue suscipit
              laoreet taciti natoque class arcu. Litora efficitur est potenti;
              penatibus viverra mus bibendum rutrum libero. Suscipit dui
              facilisis senectus iaculis in suscipit mi leo.
            </p>
          </div>
          {showCodeCard && (
            <div className="pb-24">
              <CodeCard
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                javascriptCode={javascriptCode}
                pythonCode={project.pythonCode}
              />
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
};

export default page;
