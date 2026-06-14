export type ProjectImage = { src: string; caption?: string };

export type Project = {
  slug: string;
  name: string;
  // A logo can be an emoji (default) or an image path; if `logoImage` is set it
  // is rendered instead of the emoji.
  logo?: string;
  logoImage?: string;
  status?: string;
  // Punchy one-liner.
  tagline: string;
  // ~2 line description used on the listing card.
  description: string;
  // When true, the card renders a "coming soon" template and is not clickable.
  comingSoon?: boolean;
  // External link for the "use now" CTA. Omitted = CTA hidden.
  useNowUrl?: string;
  // Optional lead-in shown above the sections on the detail page.
  overview?: string[];
  // The four narrative sections (each is a list of paragraphs).
  problemSpace?: string[];
  solutionSpace?: string[];
  insights?: string[];
  build?: string[];
  images?: ProjectImage[];
  links?: { label: string; href: string }[];
};

// Fewer entries than quests, by design. Large feature cards.
export const PROJECTS: Project[] = [
  {
    slug: "project-one",
    name: "project one",
    logo: "🛠️",
    status: "live",
    tagline: "a short, punchy line about what it does.",
    description:
      "placeholder for the first thing i'm building. two lines that say what it is and who it's for, then get out of the way.",
    useNowUrl: "https://example.com",
    overview: [
      "placeholder overview. one or two lines that frame the whole thing before the reader dives into the sections.",
    ],
    problemSpace: [
      "placeholder for the problem space. what's broken, who feels it, and why the existing options fall short.",
      "add the context and constraints that made this worth building in the first place.",
    ],
    solutionSpace: [
      "placeholder for the solution space. the core idea, the bet, and the shape of the thing you built.",
      "call out the key product decisions and what you deliberately chose not to do.",
    ],
    insights: [
      "placeholder for insights. what surprised you, what users actually did, and what you'd tell your past self.",
    ],
    build: [
      "placeholder for the build. how it's put together, the interesting technical calls, and the trade-offs behind them.",
    ],
    images: [],
    links: [],
  },
  {
    slug: "project-two",
    name: "project two",
    logo: "⚡",
    status: "coming soon",
    comingSoon: true,
    tagline: "another short line describing the second build.",
    description:
      "placeholder for the second project. swap in the real name, imagery, and a crisp two-line summary when it's ready.",
  },
];
