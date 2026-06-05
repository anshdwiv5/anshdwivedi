import { Footprints, Mic2, Mountain, Bike, type LucideIcon } from "lucide-react";

export type QuestEntry = {
  title: string;
  date?: string;
  location?: string;
  body: string;
  media?: { type: "image" | "video"; src: string; caption?: string }[];
};

export type Quest = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  intro?: string;
  entries: QuestEntry[];
};

export const QUESTS: Quest[] = [
  {
    slug: "endurance-running",
    title: "endurance running",
    description: "the long, slow, lonely kind. road, trail, and altitude.",
    icon: Footprints,
    intro:
      "started running because i needed to clear my head. now it's the thing that decides how the rest of the day goes.",
    entries: [
      {
        title: "pangong frozen lake 10k",
        date: "feb 2025",
        location: "ladakh, india",
        body: "ran a 10k on a frozen lake at ~14,000 ft. air thin, ice thinner. easily the most surreal start line of my life.",
        media: [],
      },
      {
        title: "freedom bangalore half marathon",
        date: "aug 2024",
        location: "bengaluru, india",
        body: "first official 21.1. negative split, finished strong, immediately signed up for the next one.",
        media: [],
      },
      {
        title: "full marathon, in training",
        date: "2026",
        body: "currently building base mileage for my first full. plan: tata mumbai marathon.",
        media: [],
      },
    ],
  },
  {
    slug: "horse-riding",
    title: "horse riding",
    description: "rode horses as a kid. still miss it.",
    icon: Mountain,
    entries: [],
  },
  {
    slug: "standup-comedy",
    title: "standup comedy",
    description: "did a 5-minute open mic. nobody walked out.",
    icon: Mic2,
    entries: [],
  },
  {
    slug: "cycling",
    title: "cycling",
    description: "weekend long rides around bangalore's outskirts.",
    icon: Bike,
    entries: [],
  },
];
