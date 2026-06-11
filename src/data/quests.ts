export type Quest = {
  id: string;
  title: string;
  hook: string;
  date: string;
  coverImage?: string;
  story: string[];
  gallery?: { type: "image" | "video"; src: string; caption?: string }[];
  takeaways: string[];
};

// Manual ordering — top of array shows first.
export const QUESTS: Quest[] = [
  {
    id: "crossed-khardung-la",
    title: "Crossed Khardung La on a bike",
    hook: "Altitude: 17,582 ft. Ego: significantly lower.",
    date: "2025-07-15",
    story: [
      "I'd wanted to do this for years. The kind of thing you bring up at dinners and then never actually book.",
      "Then one day I booked it. Two weeks of training that should've been two months. A borrowed jacket. A bike I'd ridden exactly twice before flying to Leh.",
      "The first three days were spent doing nothing — just letting the altitude work on me. By day four my heart rate at rest was higher than my usual running pace. I was convinced I'd made a mistake.",
      "The climb itself was quiet. Nobody talks at 17,000 feet, mostly because nobody has the breath. The wind sounds different up there — thinner, like it's been stretched.",
      "I cried a little at the top. Not from emotion. From the cold.",
    ],
    takeaways: [
      "Some experiences are worth the discomfort.",
      "Preparation matters less than persistence.",
      "Stories age better than comfort.",
    ],
  },
  {
    id: "stand-up-comedy",
    title: "Tried stand-up comedy",
    hook: "Respect for comedians increased by 1000%.",
    date: "2024-11-02",
    story: [
      "Five minutes at an open mic above a bar in Indiranagar. I wrote the set on a Sunday, rehearsed it to my mirror, and forgot two-thirds of it the moment I held the mic.",
      "The room was kind. Two jokes landed. One landed harder than I'd planned. The rest I delivered to people quietly checking the time.",
      "Walking out, a stranger said \"that was alright, man.\" I think about that sentence more often than I should.",
    ],
    takeaways: [
      "Writing jokes is easy. Holding silence is hard.",
      "Five minutes feels like forty.",
      "Doing the scary thing once permanently lowers the bar for the next one.",
    ],
  },
  {
    id: "ai-side-project-48-hours",
    title: "Built an AI side project in 48 hours",
    hook: "Sleep was optional.",
    date: "2025-03-22",
    story: [
      "A weekend hack — no scope, no users, no plan. Just a vague itch to ship something end to end without overthinking it.",
      "I started Friday after work with an idea I'd been turning over for weeks. By Saturday afternoon it was a working prototype. By Sunday night it had a landing page and three signups from friends who took pity on me.",
      "Most of it was duct tape. The interesting part wasn't the code — it was watching how fast the shape of the thing changed once I stopped designing in my head and started typing.",
    ],
    takeaways: [
      "Constraints generate momentum.",
      "A bad prototype beats a perfect plan.",
      "Sleep is, in fact, not optional. You just pretend it is for 48 hours.",
    ],
  },
  {
    id: "30-books-in-90-days",
    title: "Read 30 books in 90 days",
    hook: "Learned that buying books and reading books are unrelated activities.",
    date: "2024-06-30",
    story: [
      "I'd built up a shelf of unread books that was beginning to feel accusatory. So I set a rule: thirty books, ninety days, no exceptions.",
      "Some were great. Some I quit halfway through and counted anyway because I needed the number to work. I'd recommend about eight of them to anybody.",
      "The real change wasn't the books. It was the rhythm — opening a page instead of an app at certain points in the day. That habit outlived the challenge.",
    ],
    takeaways: [
      "Reading speed isn't the bottleneck. Attention is.",
      "Fiction trains empathy faster than self-help trains discipline.",
      "The bar for finishing a book should be lower than I'd been treating it.",
    ],
  },
  {
    id: "week-offline",
    title: "Spent a week offline",
    hook: "Turns out the world keeps functioning without notifications.",
    date: "2024-12-20",
    story: [
      "Phone in a drawer. Laptop closed. Auto-reply on. Seven days.",
      "The first 48 hours were uncomfortable in a way I didn't expect — like a small constant itch. Day three I noticed I was sleeping deeper. Day five I started writing in a notebook for the first time in years.",
      "Coming back online was strange. The volume of input felt absurd. I didn't fix the habit permanently, but I did learn that my baseline anxiety has a name and it lives in my pocket.",
    ],
    takeaways: [
      "Boredom is a creative state, not a bug.",
      "Most urgent things aren't.",
      "Silence is a skill I'd let atrophy.",
    ],
  },
  {
    id: "basic-photography",
    title: "Learned basic photography",
    hook: "Took 1,200 photos to get 12 I actually liked.",
    date: "2025-01-10",
    story: [
      "Bought a used mirrorless camera on a whim. Spent the first month shooting everything on auto, which felt like cheating, and the second month shooting everything on manual, which felt like failing.",
      "I read three books, watched too many YouTube videos, and walked around my city more than I had in years just to find things worth pointing at.",
      "The best photos I took were almost all accidents. The composed ones look composed. The accidents look alive.",
    ],
    takeaways: [
      "Volume beats technique early on.",
      "Light is the entire game.",
      "A camera makes you a better noticer, which is the actual point.",
    ],
  },
];
