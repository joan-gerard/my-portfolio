import {
  formatInterviewDate,
  parseInterviewTitle,
  type InterviewListItem,
} from "@/lib/interviews";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

type Props = {
  interview: InterviewListItem;
};

export function InterviewPrepCard({ interview }: Props) {
  const { company, subtitle } = parseInterviewTitle(interview.title);
  const formattedDate = formatInterviewDate(interview.date);

  return (
    <li>
      <Link
        href={`/interviews/${interview.slug}`}
        className="group block rounded-2xl border border-[#2a3344] bg-[#141a24] p-6 transition hover:border-[#3d4f6a] hover:bg-[#1a2230] md:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {interview.draft ? (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-amber-300">
                  Draft
                </span>
              ) : null}
              {interview.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#2f3b50] bg-[#0f141c] px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#8fa3bf]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6d8cb3]">
                {company}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">
                {subtitle || interview.title}
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-[#9fb0c8]">
              {interview.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
            <div className="inline-flex items-center gap-2 text-sm text-[#7f93ad]">
              <FiCalendar aria-hidden className="text-base" />
              <span>Updated {formattedDate}</span>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition group-hover:gap-3">
              Open prep
              <FiArrowRight aria-hidden className="text-base" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
