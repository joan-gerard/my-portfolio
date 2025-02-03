import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { AiOutlineArrowRight } from "react-icons/ai";

const MyLinks = () => (
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-4 text-sm text-indigo-300">
      <span>My links</span>
      <AiOutlineArrowRight />
    </div>
    <div className="flex items-center text-lg gap-4">
      <Link
        className="text-zinc-300 hover:text-indigo-300 transition-colors"
        href="https://www.linkedin.com"
        target="_blank"
        rel="nofollow"
      >
        <SiLinkedin />
      </Link>
      <Link
        className="text-zinc-300 hover:text-indigo-300 transition-colors"
        href="https://www.github.com"
        target="_blank"
        rel="nofollow"
      >
        <SiGithub />
      </Link>
    </div>
  </div>
);

export default MyLinks;
