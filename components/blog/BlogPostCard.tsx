import { formatBlogDate, type BlogPostListItem } from "@/lib/blog";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { Chip } from "../utils";

type Props = {
  post: BlogPostListItem;
};

export function BlogPostCard({ post }: Props) {
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 transition-all duration-300 hover:border-indigo-500/35 hover:bg-zinc-900/55 md:p-8"
      >
        <time
          dateTime={post.date}
          className="mb-4 block text-xs font-medium tracking-wide text-zinc-500"
        >
          {formatBlogDate(post.date)}
        </time>

        <h2 className="text-xl font-bold leading-snug text-white transition-colors group-hover:text-indigo-200 md:text-2xl">
          {post.title}
        </h2>

        <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-zinc-400">
          {post.description}
        </p>

        {post.tags && post.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Chip key={tag} tone="dark">
                {tag}
              </Chip>
            ))}
          </div>
        ) : null}

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition group-hover:gap-3 group-hover:text-indigo-300">
          Read article
          <FiArrowUpRight className="text-lg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </li>
  );
}
