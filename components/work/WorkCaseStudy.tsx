import { Reveal } from "@/components/utils";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export interface WorkCaseStudyProps {
  imgUrl: string;
  title: string;
  tagline: string;
  category: string;
  slug: string;
}

/**
 * Portoz-style case-study row.
 *
 * A single tappable card containing a 16:9 thumbnail above a meta row
 * (category on the left, tagline on the right) and a large title with an
 * arrow affordance. Shared between the home-page `Work` section and the full
 * `/work` index so both render identical-feeling entries.
 */
export function WorkCaseStudy({
  imgUrl,
  title,
  tagline,
  category,
  slug,
}: WorkCaseStudyProps) {
  return (
    <Reveal width="w-full">
      <Link
        href={`/work/${slug}`}
        className="group block rounded-3xl border border-[var(--hairline-dark)] bg-black/20 p-4 md:p-6 transition-colors hover:border-white/25"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black">
          <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex items-center justify-between pt-5 pb-2 text-xs md:text-sm font-semibold uppercase tracking-[0.15em]">
          <span className="text-[var(--ink-dark-muted)]">{category}</span>
          <span className="text-[var(--ink-dark-subtle)]">{tagline}</span>
        </div>
        <div className="flex items-start justify-between gap-6 pt-2">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {title}
          </h3>
          <span
            className="mt-1 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[var(--hairline-dark)] text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[var(--ink)]"
            aria-hidden
          >
            <FiArrowUpRight className="text-lg" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default WorkCaseStudy;
