import { getAllPosts } from "@/lib/blog";
import Reveal from "@/components/utils/Reveal";
import { SectionHeader } from "@/components/utils/SectionHeader";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

export const metadata = {
  title: "Blog | Joan Gerard",
  description: "Articles about learning, building, and TypeScript.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Reveal>
      <section className="mx-auto my-8 w-full max-w-5xl px-6 lg:px-12 xl:px-8">
        <SectionHeader title="Blog" dir="l" className="mb-8 mt-32" />

        <p className="mb-14 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Notes from building things, digging into TypeScript and the web stack,
          and keeping track of what actually stuck.
        </p>

        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/20 px-6 py-16 text-center text-zinc-500">
            No posts yet. Add an MDX file under{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">
              content/blog
            </code>{" "}
            to get started.
          </p>
        ) : (
          <ul className="flex flex-col gap-8 pb-24 md:gap-10">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </section>
    </Reveal>
  );
}
