import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import Reveal from "@/components/utils/Reveal";
import { SectionHeader } from "@/components/utils/SectionHeader";

export const metadata = {
  title: "Blog | Joan Gerard",
  description: "Articles about learning, building, and TypeScript.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Reveal>
      <section className="mx-auto my-8 w-full px-6 lg:px-24 xl:px-36">
        <SectionHeader title="Blog" dir="l" className="mb-12 mt-32" />

        <ul className="flex flex-col gap-10 pb-24">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-xl font-bold text-white transition-colors group-hover:text-indigo-300">
                  {post.title}
                </h2>
                <time
                  dateTime={post.date}
                  className="mt-1 block text-sm text-zinc-500"
                >
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <p className="mt-2 leading-relaxed text-zinc-300">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
