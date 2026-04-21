/**
 * Single source of truth for the site owner's public contact URLs.
 *
 * Anywhere a component needs to link to LinkedIn, GitHub, or an email — or
 * build a per-project GitHub repo URL — it should import from here rather
 * than hard-code the string. A change of handle becomes a one-file edit.
 */

/** Contact email. Used both as the visible label and the `mailto:` href. */
export const SITE_EMAIL = "joan.gerard@outlook.com";

/** Pre-built `mailto:` href so call sites don't concatenate. */
export const MAILTO_HREF = `mailto:${SITE_EMAIL}`;

/**
 * GitHub username. Kept module-private on purpose: callers go through
 * `SOCIAL_LINKS.github` (for the profile page) or `githubRepoUrl(repo)` (for
 * per-project repos) — both derive from this same handle. Hiding it prevents
 * drift between the profile URL and repo URLs.
 */
const GITHUB_USERNAME = "joan-gerard";

/** LinkedIn vanity slug (the part after `/in/`). Same rationale as above. */
const LINKEDIN_SLUG = "joangerard";

/** Canonical external profile URLs. */
export const SOCIAL_LINKS = {
  linkedin: `https://www.linkedin.com/in/${LINKEDIN_SLUG}/`,
  github: `https://github.com/${GITHUB_USERNAME}`,
} as const;

/**
 * Build a URL for one of the site owner's GitHub repositories. Prefer this
 * helper over hard-coding the prefix in data files.
 *
 * @example githubRepoUrl("my-portfolio") // → https://github.com/joan-gerard/my-portfolio
 */
export const githubRepoUrl = (repoName: string): string =>
  `https://github.com/${GITHUB_USERNAME}/${repoName}`;

/**
 * Public path to the downloadable CV, served from `public/`. Same-origin is
 * intentional: the anchor `download` attribute is only honoured by browsers
 * when the file lives on the same origin as the page that triggered it.
 */
export const CV_URL = "/joan-gerard-cv.pdf";

/**
 * Filename the browser suggests to the user when the CV is saved. Decoupled
 * from the URL path so the public URL stays short while the downloaded file
 * lands in the user's Downloads folder with a descriptive name.
 */
export const CV_DOWNLOAD_FILENAME = "Joan-Gerard-Software-Engineer-CV.pdf";
