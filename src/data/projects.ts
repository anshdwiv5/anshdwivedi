export type ProjectImage = { src: string; caption?: string };

export type Project = {
  slug: string;
  name: string;
  // A logo can be an emoji (default) or an image path; if `logoImage` is set it
  // is rendered instead of the emoji.
  logo?: string;
  logoImage?: string;
  status?: string;
  tagline: string;
  // Short description used on the listing card.
  description: string;
  // Detailed content for the project page.
  overview: string[];
  images?: ProjectImage[];
  architecture?: string[];
  stack?: string[];
  links?: { label: string; href: string }[];
};

// Fewer entries than quests, by design. Large feature cards.
export const PROJECTS: Project[] = [
  {
    slug: "project-one",
    name: "project one",
    logo: "🛠️",
    status: "in progress",
    tagline: "a short, punchy line about what it does.",
    description:
      "placeholder for the first thing i'm building. swap in the product name, a logo, and a one-line pitch.",
    overview: [
      "placeholder overview. open with what the product is and the problem it solves in plain language.",
      "follow with why you're building it, who it's for, and what makes the approach different.",
    ],
    images: [],
    architecture: [
      "high-level architecture goes here: the main components and how they talk to each other.",
      "call out the interesting decisions and the trade-offs behind them.",
    ],
    stack: ["react", "typescript", "tanstack", "your-backend-here"],
    links: [],
  },
  {
    slug: "project-two",
    name: "project two",
    logo: "⚡",
    status: "exploring",
    tagline: "another short line describing the second build.",
    description:
      "placeholder for the second project. replace with the real name, imagery, and a crisp summary.",
    overview: [
      "placeholder overview for the second project. describe the idea and the itch that started it.",
      "add context on progress so far and where it's headed next.",
    ],
    images: [],
    architecture: [
      "sketch the architecture: data flow, services, and the pieces worth explaining.",
    ],
    stack: ["react", "typescript", "your-stack-here"],
    links: [],
  },
];
