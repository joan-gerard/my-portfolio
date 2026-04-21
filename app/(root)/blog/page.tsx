import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { SectionHeader } from "@/components/utils";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog | Joan Gerard",
  description: "Articles about learning, building, and TypeScript.",
};

type Props = {
  searchParams: Promise<{ showDrafts?: string }>;
};

function shouldShowDraftsInDev(rawValue: string | undefined): boolean {
  if (!rawValue) return true;
  return rawValue !== "0" && rawValue !== "false";
}

export default async function BlogPage({ searchParams }: Props) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const params = await searchParams;
  const showDrafts = isDevelopment
    ? shouldShowDraftsInDev(params.showDrafts)
    : false;
  const posts = getAllPosts({ includeDrafts: showDrafts });

  return (
    <main
      data-section-theme="dark"
      className="min-h-screen bg-[var(--surface-dark)] text-white"
    >
      <section className="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:pt-40 lg:px-12">
        <SectionHeader
          tone="dark"
          eyebrow="Blog"
          title="Notes from the workshop"
          kicker="I'm going through a DevOps course and writing about it as I go — what I'm learning, what I'm building, what broke, and how I fixed it. No polish, just honest progress."
          align="center"
          className="mx-auto mb-16 items-center text-center"
        />

        {isDevelopment ? (
          <div className="mb-10 flex items-center justify-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink-dark-muted)]">
              Show drafts?
            </span>
            <Link
              href={showDrafts ? "/blog?showDrafts=0" : "/blog?showDrafts=1"}
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                showDrafts
                  ? "border border-white/40 bg-white/10 text-white hover:bg-white/20"
                  : "border border-[var(--hairline-dark)] bg-black/30 text-[var(--ink-dark-muted)] hover:border-white/40 hover:text-white"
              }`}
            >
              {showDrafts ? "Yes" : "No"}
            </Link>
          </div>
        ) : null}

        {posts.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-[var(--hairline-dark)] bg-black/20 px-6 py-16 text-center text-[var(--ink-dark-muted)]">
            No posts yet. Add an MDX file under{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">
              content/blog
            </code>{" "}
            to get started.
          </p>
        ) : (
          <ul className="flex flex-col">
            {posts.map((post, i) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                isLast={i === posts.length - 1}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
