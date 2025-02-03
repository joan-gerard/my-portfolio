import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { Chip } from "../Chip";

const ProjectDescription = ({
  additionalTitle,
  description,
  slug,
  stack,
}: {
  additionalTitle: string;
  description: string[];
  slug: string;
  stack: string[];
}) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 text-white">
    <div className="col-span-1  md:col-span-4">
      <h2 className="text-3xl font-bold">{additionalTitle}</h2>
      <div className="flex flex-wrap mt-8 gap-4">
        {stack.map((el) => (
          <Chip key={el}>
            {el}
          </Chip>
        ))}
      </div>
    </div>
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
