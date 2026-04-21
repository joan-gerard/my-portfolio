import { formatBlogDate, type BlogPostListItem } from "@/lib/blog";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type Props = {
  post: BlogPostListItem;
  /**
   * When true, this row shows its bottom divider (use on the last item so the
   * list closes with a hairline, matching Portoz's case-study layout).
   */
  isLast?: boolean;
};

/**
 * Portoz-style case-study row for blog posts.
 *
 * Layout mirrors the Work section: meta row (category + date) above a large
 * title, with an arrow affordance on the right. A top hairline separates each
 * row; the last row also renders a bottom hairline so the list is closed.
 */
export function BlogPostCard({ post, isLast = false }: Props) {
  const category = post.tags?.[0] ?? "Article";

  return (
    <li
      className={`border-t border-[var(--hairline-dark)] ${
        isLast ? "border-b" : ""
      }`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group grid grid-cols-[1fr_auto] items-end gap-6 py-10 md:py-14"
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm font-semibold uppercase tracking-[0.15em]">
            <span className="text-[var(--ink-dark-muted)]">{category}</span>
            <time
              dateTime={post.date}
              className="text-[var(--ink-dark-subtle)]"
            >
              {formatBlogDate(post.date)}
            </time>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white transition-colors group-hover:text-[var(--ink-dark-muted)]">
            {post.title}
          </h2>

          {post.description ? (
            <p className="max-w-2xl text-sm md:text-base leading-relaxed text-[var(--ink-dark-muted)]">
              {post.description}
            </p>
          ) : null}
        </div>

        <span
          className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full border border-[var(--hairline-dark)] text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[var(--ink)]"
          aria-hidden
        >
          <FiArrowUpRight className="text-xl" />
        </span>
      </Link>
    </li>
  );
}
