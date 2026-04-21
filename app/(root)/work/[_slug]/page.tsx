import { CodeCard } from "@/components/CodeCard";
import { Chip, CtaButton, Reveal, SectionBadge } from "@/components/utils";
import { BUILD_STATUS_LABEL, work } from "@/constants/work";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

type Props = {
  params: Promise<{ _slug: string }>;
};

export function generateStaticParams() {
  return work.map((project) => ({ _slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { _slug } = await params;
  const project = work.find((el) => el.slug === _slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: `${project.subheading} | Work`,
    description: project.heading,
  };
}

/**
 * Portoz-style case-study detail — kept on the site's dark surface.
 *
 * Mirrors the rhythm of `/blog/[slug]`: eyebrow pill → display heading →
 * lead paragraph → "Project details" metadata grid → hero image →
 * description body → optional code card → footer back-link. The palette
 * stays dark (per brand + user preference) but every token, component and
 * spacing rule is the same as the blog detail page so the two feel like
 * siblings.
 */
export default async function ProjectDetailPage({ params }: Props) {
  const { _slug } = await params;
  const project = work.find((el) => el.slug === _slug);
  if (!project) {
    notFound();
  }

  const hasCode =
    typeof project.javascriptCode === "string" &&
    project.javascriptCode.trim() !== "";

  // Reading column: everything except the hero image lives inside this narrow
  // track so line-lengths stay readable (~70–80 chars). The outer `article` at
  // `max-w-6xl` still matches the nav/section width, which lets the hero image
  // fill that wider band as requested.
  const narrowCol = "mx-auto w-full max-w-3xl";

  return (
    <main
      data-section-theme="dark"
      className="min-h-screen bg-[var(--surface-dark)] text-white"
    >
      <article className="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:pt-40 lg:px-12">
        <header className={`${narrowCol} mb-16 flex flex-col gap-8 md:gap-10`}>
          <Reveal>
            <SectionBadge tone="dark">Project</SectionBadge>
          </Reveal>

          <Reveal>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              {project.subheading}
            </h1>
          </Reveal>

          {/* KEEP COMMENTED OUT FOR NOW */}
          {/* {project.heading ? (
            <Reveal>
              <p className="text-base leading-relaxed text-[var(--ink-dark-muted)] md:text-lg">
                {project.heading}
              </p>
            </Reveal>
          ) : null}

          <Reveal>
            <h2 className="mt-4 text-lg font-semibold text-white md:text-xl">
              Project details
            </h2>
          </Reveal> */}

          <Reveal>
            <dl className="grid grid-cols-1 gap-y-6 border-y border-[var(--hairline-dark)] py-8 sm:grid-cols-2">
              <DetailItem label="Category">{project.category}</DetailItem>
              <DetailItem label="Status">
                {BUILD_STATUS_LABEL[project.status]}
              </DetailItem>
            </dl>
          </Reveal>
        </header>

        <Reveal>
          <div className="relative mb-16 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-black">
            <Image
              src={project.imgUrl}
              alt={project.subheading}
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        {project.stack.length > 0 ? (
          <Reveal>
            <div className={`${narrowCol} mb-12 flex flex-wrap gap-3`}>
              {project.stack.map((tech) => (
                <Chip key={tech} tone="dark">
                  {tech}
                </Chip>
              ))}
            </div>
          </Reveal>
        ) : null}

        {project.description && project.description.length > 0 ? (
          <div
            className={`${narrowCol} mb-12 space-y-6 text-base leading-relaxed text-[var(--ink-dark-muted)] md:text-lg`}
          >
            {project.description.map((paragraph, idx) => (
              <Reveal key={idx}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        ) : null}

        {(project.liveUrl || project.githubUrl) && (
          <Reveal>
            <div className={`${narrowCol} mb-4 flex flex-wrap gap-4`}>
              {project.liveUrl ? (
                <CtaButton
                  href={project.liveUrl}
                  external
                  surface="dark"
                  variant="solid"
                >
                  Visit live site
                </CtaButton>
              ) : null}
              {project.githubUrl ? (
                <CtaButton
                  href={project.githubUrl}
                  external
                  surface="dark"
                  variant="outline"
                >
                  View source
                </CtaButton>
              ) : null}
            </div>
          </Reveal>
        )}

        {hasCode ? (
          <Reveal>
            <div className={`${narrowCol} pt-16`}>
              <CodeCard
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                javascriptCode={project.javascriptCode ?? undefined}
                pythonCode={project.pythonCode}
              />
            </div>
          </Reveal>
        ) : null}

        <footer
          className={`${narrowCol} mt-24 border-t border-[var(--hairline-dark)] pt-12`}
        >
          <CtaButton
            href="/work"
            surface="dark"
            variant="outline"
            showArrow={false}
          >
            <span className="inline-flex items-center gap-2">
              <FiArrowLeft className="text-base" aria-hidden />
              Back to work
            </span>
          </CtaButton>
        </footer>
      </article>
    </main>
  );
}

function DetailItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-dark-subtle)] md:text-xs">
        {label}
      </dt>
      <dd className="text-base font-medium text-white md:text-lg">
        {children}
      </dd>
    </div>
  );
}
