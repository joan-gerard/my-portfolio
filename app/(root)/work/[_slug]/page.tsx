import { CodeCard } from "@/components/CodeCard";
import Hero from "@/components/Hero";
import { StickyImage } from "@/components/parallax/ImageTextParallaxContent";
import { work } from "@/constants/work";
import React from "react";

const page = async ({ params }: { params: Promise<{ _slug: string }> }) => {
  const slug = (await params)._slug;
  const project = work.find((el) => el.slug === slug);

  return (
    <div className="bg-black h-screen z-0 relative">
      <Hero />
      <StickyImage imgUrl={project!.imgUrl} />
      <div className="mx-auto max-w-5xl gap-8 flex px-4 pb-24 pt-12 text-white">
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
      <div>
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
