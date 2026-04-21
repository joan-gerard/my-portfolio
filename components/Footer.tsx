import { CtaButton, GradientText, Reveal } from "@/components/utils";
import {
  CV_DOWNLOAD_FILENAME,
  CV_URL,
  MAILTO_HREF,
  SITE_EMAIL,
  SOCIAL_LINKS,
} from "@/constants/site";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      data-section-theme="dark"
      className="bg-[var(--surface-dark)] text-white"
    >
      <div className="border-b border-[var(--hairline-dark)] px-6 py-20 lg:px-24 xl:px-36">
        <div className="mx-auto max-w-6xl">
          <Reveal width="w-full">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Let&apos;s create something{" "}
              <GradientText>amazing &amp; extraordinary</GradientText> together.
            </h2>
          </Reveal>
          <Reveal width="w-full">
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6 text-[var(--ink-dark-muted)]">
              <Link
                href={MAILTO_HREF}
                className="text-base md:text-lg font-medium underline underline-offset-4 hover:text-white transition-colors"
              >
                {SITE_EMAIL}
              </Link>
              <Link
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base md:text-lg font-medium underline underline-offset-4 hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
              <CtaButton
                href={CV_URL}
                download={CV_DOWNLOAD_FILENAME}
                surface="dark"
                variant="outline"
              >
                Download CV
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="px-6 py-8 lg:px-24 xl:px-36">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-sm text-[var(--ink-dark-subtle)] md:flex-row md:items-center">
          <p className="text-xl font-extrabold text-white uppercase tracking-tight">
            Joan Gerard
          </p>
          <p>© {year} Joan Gerard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
