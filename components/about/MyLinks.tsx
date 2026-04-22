import LinkedInIcon from "@/components/utils/LinkedInIcon";
import { SOCIAL_LINKS } from "@/constants/site";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

const MyLinks = () => (
  <div className="flex items-center text-xl gap-4">
    <Link
      className="text-[var(--ink)] hover:text-[var(--accent-mid)] transition-colors"
      href={SOCIAL_LINKS.linkedin}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="LinkedIn"
    >
      <LinkedInIcon className="w-[1em] h-[1em]" />
    </Link>
    <Link
      className="text-[var(--ink)] hover:text-[var(--accent-mid)] transition-colors"
      href={SOCIAL_LINKS.github}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label="GitHub"
    >
      <SiGithub />
    </Link>
  </div>
);

export default MyLinks;
