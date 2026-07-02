import {
  formatInterviewDate,
  parseInterviewTitle,
  type InterviewFrontmatter,
} from "@/lib/interviews";

type Props = {
  frontmatter: InterviewFrontmatter;
};

export function InterviewPrepHeader({ frontmatter }: Props) {
  const { company, subtitle } = parseInterviewTitle(frontmatter.title);
  const formattedDate = formatInterviewDate(frontmatter.date);

  return (
    <header className="mb-10 border-b border-[#2a3344] pb-8 md:mb-12">
      <div className="flex flex-wrap items-center gap-2">
        {frontmatter.draft ? (
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-amber-300">
            Draft
          </span>
        ) : null}
        {frontmatter.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#2f3b50] bg-[#0f141c] px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#8fa3bf]"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[#6d8cb3]">
        {company}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
        {subtitle || frontmatter.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#9fb0c8]">
        {frontmatter.description}
      </p>
      <p className="mt-4 text-sm text-[#7f93ad]">Last updated {formattedDate}</p>
    </header>
  );
}
