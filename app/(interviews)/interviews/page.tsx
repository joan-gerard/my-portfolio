import { InterviewPrepCard } from "@/components/interviews/InterviewPrepCard";
import { getAllInterviews } from "@/lib/interviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Prep",
  description: "Private interview call preparation notes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InterviewsPage() {
  const interviews = getAllInterviews();

  return (
    <div className="min-h-screen bg-[#0a0e14] text-white">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <header className="mb-12 md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2a3344] bg-[#141a24] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8fa3bf]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            Private workspace
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Interview prep
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#9fb0c8]">
            Rehearsal notes, role breakdowns, and scripted answers for upcoming
            calls. Bookmark this page — it is not linked from the public site.
          </p>
        </header>

        {interviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#2a3344] bg-[#141a24] px-6 py-16 text-center">
            <p className="text-[#9fb0c8]">No interview prep files yet.</p>
            <p className="mt-2 text-sm text-[#7f93ad]">
              Add an MDX file under{" "}
              <code className="rounded bg-[#0f141c] px-1.5 py-0.5 text-emerald-300">
                content/interview-prep
              </code>
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-5">
            {interviews.map((interview) => (
              <InterviewPrepCard key={interview.slug} interview={interview} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
