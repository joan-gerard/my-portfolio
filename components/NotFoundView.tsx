import Link from "next/link";
import { FiArrowRight, FiHome } from "react-icons/fi";

const primaryLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 px-5 py-2.5 text-sm font-medium text-indigo-200 transition hover:border-indigo-400/70 hover:bg-indigo-500/20 hover:text-white";

const secondaryLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-indigo-500/40 hover:bg-zinc-900/70 hover:text-white";

export function NotFoundView() {
  return (
    <section className="mx-auto my-8 w-full max-w-2xl px-6 pb-24 lg:px-12 xl:px-8">
      <p className="mb-2 text-sm font-medium uppercase tracking-wide text-indigo-400">
        404
      </p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Page not found
      </h1>
      <p className="mb-10 max-w-lg text-lg leading-relaxed text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link href="/" className={primaryLinkClass}>
          <FiHome className="text-base" aria-hidden />
          Back to home
        </Link>
        <Link href="/work" className={secondaryLinkClass}>
          View work
          <FiArrowRight className="text-base" aria-hidden />
        </Link>
        <Link href="/blog" className={secondaryLinkClass}>
          Blog
          <FiArrowRight className="text-base" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
