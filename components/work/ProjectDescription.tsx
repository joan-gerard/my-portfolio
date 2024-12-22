import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const ProjectDescription = ({
  additionalTitle,
  description,
  slug,
}: {
  additionalTitle: string;
  description: string[];
  slug: string;
}) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 text-white">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      {additionalTitle}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <div className="mb-8">
        {description.map((el) => (
          <p className="mb-4 text-xl text-neutral-200 md:text-2xl" key={el}>
            {el}
          </p>
        ))}
      </div>
      <Link
        href={`/work/${slug}`}
        className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit"
      >
        Learn more <FiArrowUpRight className="inline" />
      </Link>
    </div>
  </div>
);

export default ProjectDescription;
