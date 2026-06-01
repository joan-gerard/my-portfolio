export type LearnChapter = {
  /** URL segment and MDX filename (without .mdx) */
  slug: string;
  /** Display title shown in sidebar and chapter nav */
  title: string;
  /** Short summary shown on the course landing page */
  description: string;
};

export type LearnCourse = {
  /** URL segment — /learn/[slug] */
  slug: string;
  title: string;
  description: string;
  tags: string[];
  /** When true, show the KodeKloud course-notes disclaimer */
  notesFromKodeKloud?: boolean;
  chapters: LearnChapter[];
};

export const fundamentalsOfDevopsCourse: LearnCourse = {
  slug: "fundamentals-of-devops",
  title: "Fundamentals of DevOps",
  description:
    "A structured journey through DevOps culture, people, processes, and tooling — from the origin story through CI/CD, LEAN thinking, and modern delivery metrics.",
  tags: ["DevOps", "Fundamentals"],
  notesFromKodeKloud: true,
  chapters: [
    {
      slug: "introduction",
      title: "Introduction and What is DevOps",
      description:
        "Origins of DevOps, why IT delivery struggles at scale, and the core definition, principles, antipatterns, and adjacent frameworks.",
    },
    {
      slug: "people",
      title: "People",
      description:
        "DevOps culture, shared values, cross-functional team design, and people-centered scenarios from leadership, development, and operations.",
    },
    {
      slug: "process",
      title: "Process",
      description:
        "Automation patterns, maturity models, LEAN principles, and collaboration and security practices in DevOps teams.",
    },
    {
      slug: "product-and-technology",
      title: "Product and Technology",
      description:
        "CI/CD pipelines, infrastructure as code, observability, and the tooling landscape that underpins modern DevOps delivery.",
    },
    {
      slug: "summary",
      title: "Summary and Closing",
      description:
        "Key takeaways from the full course, recommended next steps, and resources for going deeper.",
    },
  ],
};

export const linuxForBeginnersCourse: LearnCourse = {
  slug: "linux-for-beginners",
  title: "Linux for Beginners",
  description:
    "A ground-up Linux course covering the shell, core OS concepts, package management, networking, security, storage, and service management — all through the lens of DevOps practice.",
  tags: ["Linux", "DevOps"],
  notesFromKodeKloud: true,
  chapters: [
    {
      slug: "introduction",
      title: "Introduction",
      description:
        "Why Linux matters for DevOps, common beginner challenges, and a map of everything the course covers.",
    },
    {
      slug: "working-with-shell-1",
      title: "Working with the Shell — Part 1",
      description:
        "Shell basics, home directory, command types, shell flavours, Bash features, environment variables, and prompt customisation.",
    },
    {
      slug: "core-concepts",
      title: "Linux Core Concepts",
      description:
        "The Linux kernel, boot process, runlevels, file types, filesystem hierarchy, and the overall OS architecture.",
    },
    {
      slug: "package-management",
      title: "Linux Package Management",
      description:
        "Linux distributions, RPM, YUM, DPKG, APT, and how to install, update, and remove software reliably.",
    },
    {
      slug: "working-with-shell-2",
      title: "Working with the Shell — Part 2",
      description:
        "File compression and archival, searching with find and locate, I/O redirection, pipes, and VI editor fundamentals.",
    },
    {
      slug: "networking",
      title: "Networking",
      description:
        "Network interfaces, IP addressing, routing, DNS resolution, and practical troubleshooting tools.",
    },
    {
      slug: "security-and-permissions",
      title: "Security and File Permissions",
      description:
        "Linux file permissions, ownership, access control lists, SSH hardening, and sudo configuration.",
    },
    {
      slug: "systemd",
      title: "Service Management with SYSTEMD",
      description:
        "SYSTEMD architecture, unit files, service lifecycle commands, journalctl, and creating custom services.",
    },
    {
      slug: "storage",
      title: "Storage in Linux",
      description:
        "Block devices, disk partitioning, filesystems, mounting, NFS, and logical volume management (LVM).",
    },
  ],
};

export const learnCourses: LearnCourse[] = [
  linuxForBeginnersCourse,
  fundamentalsOfDevopsCourse,
];

export function getCourseBySlug(slug: string): LearnCourse | null {
  return learnCourses.find((c) => c.slug === slug) ?? null;
}

export function getChapterBySlug(
  course: LearnCourse,
  chapterSlug: string,
): LearnChapter | null {
  return course.chapters.find((ch) => ch.slug === chapterSlug) ?? null;
}
