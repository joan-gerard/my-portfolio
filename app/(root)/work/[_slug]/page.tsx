import { CodeCard } from "@/components/CodeCard";
import { StickyImageNew } from "@/components/parallax/StickyImageNew";
import { SectionHeader } from "@/components/utils/SectionHeader";
import { work } from "@/constants/work";

const page = async ({ params }: { params: Promise<{ _slug: string }> }) => {
  const slug = (await params)._slug;
  const project = work.find((el) => el.slug === slug);

  return (
    <div className="bg-black h-full z-0 relative">
      {/* <Hero /> */}
      <SectionHeader title={project!.subheading} dir="l" className="mb-10 mt-32 px-6 my-8 lg:px-24 xl:px-36 mx-auto" />

      <StickyImageNew imgUrl={project!.imgUrl} />
      <div className="mx-auto max-w-5xl gap-8 flex px-4 pb-24 pt-12 text-white z-0">
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Id bibendum dis
          imperdiet pulvinar blandit pulvinar; sollicitudin justo. Sit
          pellentesque potenti volutpat vulputate metus. Suspendisse neque
          porttitor sed sollicitudin elit magna. Posuere aenean parturient
          ullamcorper ad mus parturient. Consectetur donec congue suscipit
          laoreet taciti natoque class arcu. Litora efficitur est potenti;
          penatibus viverra mus bibendum rutrum libero. Suscipit dui facilisis
          senectus iaculis in suscipit mi leo.
        </p>
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Id bibendum dis
          imperdiet pulvinar blandit pulvinar; sollicitudin justo. Sit
          pellentesque potenti volutpat vulputate metus. Suspendisse neque
          porttitor sed sollicitudin elit magna. Posuere aenean parturient
          ullamcorper ad mus parturient. Consectetur donec congue suscipit
          laoreet taciti natoque class arcu. Litora efficitur est potenti;
          penatibus viverra mus bibendum rutrum libero. Suscipit dui facilisis
          senectus iaculis in suscipit mi leo.
        </p>
      </div>
      <div className="pb-24">
        <CodeCard
          githubUrl={project?.githubUrl}
          liveUrl={project?.liveUrl}
          javascriptCode={project?.javascriptCode}
          pythonCode={project?.pythonCode}
        />
      </div>
    </div>
  );
};

export default page;
