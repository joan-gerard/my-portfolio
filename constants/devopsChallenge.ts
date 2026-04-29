export type DevOpsDay = {
  day: number;
  slug: string;
  title: string;
  status: "published" | "coming-soon";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  task: string;
  whyItMatters: string;
  solutionSteps: string[];
  verification: string[];
  takeaway: string;
};

const publishedDays: DevOpsDay[] = [
  {
    day: 1,
    slug: "day-1-linux-user-setup",
    title: "Linux User Setup with Non-Interactive Shell",
    status: "published",
    difficulty: "Beginner",
    topics: ["Linux", "Users", "Security"],
    task: "Create user `mariyam` on App Server 3 with a non-interactive shell.",
    whyItMatters:
      "Service accounts should not expose an interactive shell. This reduces accidental misuse and hardens server access.",
    solutionSteps: [
      "Connect to App Server 3 with privileged access.",
      "Create the account with a non-login shell (for example `/sbin/nologin` or `/usr/sbin/nologin`).",
      "Validate that the shell entry in `/etc/passwd` is non-interactive.",
      "Attempt a login check to confirm the account cannot open a normal session.",
    ],
    verification: [
      "`getent passwd mariyam` shows the expected non-login shell.",
      "An interactive switch attempt is blocked (for example with `su - mariyam`).",
    ],
    takeaway:
      "For automation-only identities, least-privilege includes limiting shell access, not just permissions.",
  },
  {
    day: 2,
    slug: "day-2-linux-group-permissions-basics",
    title: "Linux Group Permissions Basics",
    status: "published",
    difficulty: "Beginner",
    topics: ["Linux", "Groups", "Permissions"],
    task: "Create a shared group and grant controlled write access to a team directory.",
    whyItMatters:
      "Groups let you scale access cleanly without assigning direct permissions user by user.",
    solutionSteps: [
      "Create a dedicated group for the team.",
      "Assign users to the group and apply group ownership on the shared path.",
      "Set permission bits so the group can collaborate safely.",
      "Use the setgid bit on the directory so new files inherit the same group.",
    ],
    verification: [
      "Users in the group can create and edit files in the shared folder.",
      "Users outside the group cannot modify the same files.",
    ],
    takeaway:
      "Good group design is one of the fastest wins for secure and maintainable Linux administration.",
  },
  {
    day: 3,
    slug: "day-3-log-audit-and-troubleshooting",
    title: "Log Audit and Troubleshooting Basics",
    status: "published",
    difficulty: "Beginner",
    topics: ["Linux", "Logs", "Troubleshooting"],
    task: "Investigate a service issue by reading system and application logs.",
    whyItMatters:
      "Logs are your primary source of runtime truth. Fast diagnosis depends on filtering signal from noise.",
    solutionSteps: [
      "Start with service status to confirm impact and timestamps.",
      "Inspect relevant logs with targeted filters (time range, keywords, errors).",
      "Correlate findings across system and app logs.",
      "Record root cause notes and the exact fix performed.",
    ],
    verification: [
      "Service status returns healthy after remediation.",
      "No recurring critical errors in the recent log window.",
    ],
    takeaway:
      "A repeatable troubleshooting checklist is often more valuable than any single command.",
  },
  {
    day: 4,
    slug: "day-4-systemd-service-management",
    title: "Systemd Service Management",
    status: "published",
    difficulty: "Beginner",
    topics: ["Linux", "Systemd", "Operations"],
    task: "Configure and manage a service lifecycle with systemd best practices.",
    whyItMatters:
      "Reliable startup, restart policies, and clear unit ownership are foundational for stable production systems.",
    solutionSteps: [
      "Review or create a unit file with explicit execution settings.",
      "Reload systemd daemon and enable service startup behavior.",
      "Test start, stop, and restart paths safely.",
      "Inspect service logs through journal tooling for runtime feedback.",
    ],
    verification: [
      "Service starts successfully and survives a restart cycle.",
      "Expected enablement state is visible in systemd output.",
    ],
    takeaway:
      "Operational maturity starts with predictable service behavior and documented lifecycle controls.",
  },
  {
    day: 5,
    slug: "day-5-basic-backup-validation",
    title: "Basic Backup Validation",
    status: "published",
    difficulty: "Intermediate",
    topics: ["Backups", "Reliability", "Validation"],
    task: "Run a backup flow and validate restore readiness with sample data.",
    whyItMatters:
      "Backups are only useful if restores work. Validation closes the gap between policy and real recoverability.",
    solutionSteps: [
      "Trigger or review the scheduled backup job execution.",
      "Confirm backup artifact integrity and retention metadata.",
      "Perform a scoped restore test on a safe target path.",
      "Document restoration timing and outcome for future runbooks.",
    ],
    verification: [
      "Backup artifact exists and matches expected timestamp window.",
      "Restore test completes with readable, correct data.",
    ],
    takeaway:
      "Recovery confidence comes from tested restores, not from successful backup logs alone.",
  },
];

export const DEVOPS_TOTAL_DAYS = 100;

export function getPublishedDevOpsDays(): DevOpsDay[] {
  return publishedDays;
}

export function getDevOpsDayBySlug(slug: string): DevOpsDay | undefined {
  return publishedDays.find((entry) => entry.slug === slug);
}
