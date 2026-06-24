import type { LearnCheatsheetListItem } from "@/lib/learn";
import Link from "next/link";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";

type Props = {
  cheatsheet: LearnCheatsheetListItem;
};

export function LearnCheatsheetCard({ cheatsheet }: Props) {
  return (
    <li>
      <Link
        href={`/learn/cheatsheet/${cheatsheet.slug}`}
        className="group flex min-h-[5.5rem] items-center gap-4 rounded-2xl border border-[var(--hairline-dark)] bg-white/5 p-4 transition-colors hover:border-white/40 hover:bg-white/10 md:p-5"
      >
        <span
          className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white/10 text-[var(--ink-dark-muted)] transition-colors group-hover:bg-white/20 group-hover:text-white"
          aria-hidden
        >
          <FiBookOpen className="text-base" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white transition-colors group-hover:text-[var(--ink-dark-muted)]">
            {cheatsheet.title}
          </p>
          {cheatsheet.description ? (
            <p className="mt-0.5 line-clamp-1 text-sm text-[var(--ink-dark-muted)]">
              {cheatsheet.description}
            </p>
          ) : null}
        </div>

        <FiArrowRight
          className="flex-none text-[var(--ink-dark-subtle)] transition-colors group-hover:text-white"
          aria-hidden
        />
      </Link>
    </li>
  );
}
