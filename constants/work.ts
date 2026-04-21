import { githubRepoUrl } from "./site";

/**
 * `Build` is the generic unit shown on the Work surfaces (home-page section,
 * `/work` index, `/work/[_slug]` detail). The term is intentionally broad so
 * it can cover shipped apps, WIP products, DevOps labs, prototypes and
 * internal tooling without any of them feeling mislabelled.
 *
 * Two fields are the reason this schema exists:
 * - `category` — a small, human-readable vocabulary that tells the reader at
 *   a glance what *kind* of thing they're looking at (a full-stack app vs a
 *   DevOps lab vs a prototype). Previously we showed `stack[0]` in that slot
 *   which made every card read like a tech tag ("Next.js 16"); `category`
 *   gives each card an honest label instead.
 * - `status` — a machine-readable lifecycle state. Previously we inferred
 *   status from whether `liveUrl` existed, which silently lied about labs
 *   and WIP items. Now each build declares its own state and the UI maps it
 *   to a human label via `BUILD_STATUS_LABEL`.
 */
export type BuildCategory =
  | "Full-stack app"
  | "DevOps lab"
  | "Infrastructure"
  | "Prototype"
  | "Tooling";

export type BuildStatus = "live" | "in-progress" | "completed" | "shelved";

/**
 * Presentation strings for `BuildStatus`. Centralised here so the card, the
 * detail page and any future surface (status pill, filter dropdown, etc.)
 * all show the exact same wording.
 */
export const BUILD_STATUS_LABEL: Record<BuildStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  completed: "Completed",
  shelved: "Shelved",
};

export interface Build {
  slug: string;
  subheading: string;
  heading: string;
  category: BuildCategory;
  status: BuildStatus;
  description: string[];
  stack: string[];
  imgUrl: string;
  githubUrl: string;
  liveUrl: string | null;
  isFeatured?: boolean;
  additionalTitle?: string;
  javascriptCode?: string | null;
  pythonCode?: string;
}

export const work: Build[] = [
  {
    imgUrl: "/my-hire-view-1.webp",
    subheading: "MyHireView",
    slug: "my-hire-view",
    heading: "Stand out. Get seen.",
    category: "Full-stack app",
    status: "live",
    additionalTitle: "Additional content explaining the above card here",
    description: [
      "MyHireView is a modern application platform that transforms how job seekers present themselves to recruiters.",
      "By combining CV uploads, video pitches, and shareable application pages with built-in analytics, MyHireView empowers candidates to stand out in competitive job markets while providing recruiters with a streamlined, friction-free viewing experience.",
    ],
    stack: [
      "Next.js 16",
      "PostgreSQL",
      "Supabase",
      "Tailwind",
      "GitHub Actions",
    ],
    githubUrl: githubRepoUrl("my-hire-view"),
    liveUrl: "https://hireview-two.vercel.app/",
    javascriptCode: null,
    isFeatured: true,
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Pitch Portal",
    slug: "pitch-portal",
    heading: "Never compromise.",
    category: "Full-stack app",
    status: "live",
    additionalTitle: "Additional content explaining the above card here",
    description: [
      "2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima maiores voluptate est ut saepe accusantium maxime doloremque nulla consectetur possimus.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reiciendis blanditiis aliquam aut fugit sint",
    ],
    stack: ["Next.js 15", "Appwrite"],
    githubUrl: githubRepoUrl("pitch-portal"),
    liveUrl: "https://pitch-portal.vercel.app/",
    javascriptCode: `import { initializeSDK } from "your-package";

    // Pitch Portal
    const app = initializeSDK({
        apiKey: "sk_abc123"
    });
      
    app.doCoolThing();`,
    pythonCode: `import your_package
        
    app = your_package.init({
        "api_key": "sk_abc123"
    })
      
    app.do_cool_thing()`,
    isFeatured: false,
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Aora",
    slug: "aora",
    heading: "Dress for the best.",
    category: "Prototype",
    status: "in-progress",
    additionalTitle: "Additional content explaining the above card here",
    stack: ["Next.js 15", "Appwrite", "CMS"],
    description: [
      "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima maiores voluptate est ut saepe accusantium maxime doloremque nulla consectetur possimus.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reiciendis blanditiis aliquam aut fugit sint",
    ],
    githubUrl: githubRepoUrl("react-native-practice"),
    liveUrl: null,
    javascriptCode: `import { initializeSDK } from "your-package";
    
    const app = initializeSDK({
        apiKey: "sk_abc123"
    });
      
    app.doCoolThing();`,
    pythonCode: `import your_package
        
    app = your_package.init({
        "api_key": "sk_abc123"
    })
      
    app.do_cool_thing()`,
    isFeatured: false,
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Portfolio 2",
    slug: "portfolio-2",
    heading: "Built for all of us.",
    category: "Full-stack app",
    status: "live",
    additionalTitle: "Additional content explaining the above card here",
    description: [
      "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima maiores voluptate est ut saepe accusantium maxime doloremque nulla consectetur possimus.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reiciendis blanditiis aliquam aut fugit sint",
    ],
    stack: ["Next.js 15", "Appwrite", "CMS", "Auth", "Express"],
    githubUrl: githubRepoUrl("my-portfolio"),
    liveUrl: "https://my-portfolio-opal-seven-60.vercel.app/",
    javascriptCode: `import { initializeSDK } from "your-package";

// Portfolio
const app = initializeSDK({
    apiKey: "sk_abc123"
});
  
app.doCoolThing();`,
    pythonCode: `import your_package
    
app = your_package.init({
    "api_key": "sk_abc123"
})
  
app.do_cool_thing()`,
    isFeatured: false,
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Pitch Portal 2",
    slug: "pitch-portal-2",
    heading: "Never compromise.",
    category: "Full-stack app",
    status: "live",
    additionalTitle: "Additional content explaining the above card here",
    description: [
      "2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima maiores voluptate est ut saepe accusantium maxime doloremque nulla consectetur possimus.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reiciendis blanditiis aliquam aut fugit sint",
    ],
    stack: ["Next.js 15", "Appwrite"],
    githubUrl: githubRepoUrl("pitch-portal"),
    liveUrl: "https://pitch-portal.vercel.app/",
    javascriptCode: `import { initializeSDK } from "your-package";

    // Pitch Portal
    const app = initializeSDK({
        apiKey: "sk_abc123"
    });
      
    app.doCoolThing();`,
    pythonCode: `import your_package
        
    app = your_package.init({
        "api_key": "sk_abc123"
    })
      
    app.do_cool_thing()`,
    isFeatured: false,
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subheading: "Aora 2",
    slug: "aora-2",
    heading: "Dress for the best.",
    category: "Prototype",
    status: "in-progress",
    additionalTitle: "Additional content explaining the above card here",
    stack: ["Next.js 15", "Appwrite", "CMS"],
    description: [
      "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima maiores voluptate est ut saepe accusantium maxime doloremque nulla consectetur possimus.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reiciendis blanditiis aliquam aut fugit sint",
    ],
    githubUrl: githubRepoUrl("react-native-practice"),
    liveUrl: null,
    javascriptCode: `import { initializeSDK } from "your-package";
    
    const app = initializeSDK({
        apiKey: "sk_abc123"
    });
      
    app.doCoolThing();`,
    pythonCode: `import your_package
        
    app = your_package.init({
        "api_key": "sk_abc123"
    })
      
    app.do_cool_thing()`,
    isFeatured: false,
  },
];
