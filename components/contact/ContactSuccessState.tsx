import { SOCIAL_LINKS } from "@/constants/site";
import Link from "next/link";

interface ContactSuccessStateProps {
  onReset: () => void;
}

export function ContactSuccessState({ onReset }: ContactSuccessStateProps) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-4">
      <p className="text-[var(--ink)] font-medium">
        Thanks — your message is on its way.
      </p>
      <p className="text-[var(--ink-muted)]">
        I&apos;ll get back to you within 48 hours. In the meantime, feel free to{" "}
        <Link
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-[var(--accent-mid)]"
        >
          say hi on LinkedIn
        </Link>
        .
      </p>
      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--ink-muted)] underline underline-offset-4 hover:text-[var(--ink)]"
        >
          Send another message
        </button>
      </div>
    </div>
  );
}
