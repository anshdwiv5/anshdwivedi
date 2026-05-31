type Quest = {
  title: string;
  description: string;
  tag: string;
  year?: string;
  emoji?: string;
};

// Add more quests here — they'll render in the grid automatically.
const QUESTS: Quest[] = [
  {
    title: "Horse riding",
    description: "rode horses as a kid.",
    tag: "as a kid",
    emoji: "🐎",
  },
  {
    title: "Full marathon",
    description: "training for / running a full marathon this year.",
    tag: "this year",
    year: "2026",
    emoji: "🏃",
  },
  {
    title: "Standup comedy",
    description: "tried a standup set.",
    tag: "one-off",
    emoji: "🎤",
  },
];

export function SideQuests() {
  return (
    <section id="side-quests" className="relative py-32 md:py-40">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-4">
            03 — side quests
          </p>
          <h2 className="reveal text-4xl md:text-6xl font-semibold tracking-tight">
            Things I've{" "}
            <span className="text-[var(--eclipse-accent)]">tried</span>.
          </h2>
          <p className="reveal mt-5 text-lg text-[color:var(--eclipse-foreground)]/65 leading-relaxed">
            A running list of detours — past, present, and one-offs. Some
            stuck. Some really did not.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUESTS.map((q) => (
            <QuestCard key={q.title} quest={q} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuestCard({ quest }: { quest: Quest }) {
  return (
    <article
      className="reveal group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 cursor-default"
      style={{
        borderColor: "color-mix(in oklab, var(--eclipse-muted) 30%, transparent)",
        background: "color-mix(in oklab, var(--eclipse-surface) 35%, transparent)",
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow:
            "0 0 0 1px color-mix(in oklab, var(--eclipse-accent) 50%, transparent), 0 20px 50px -20px color-mix(in oklab, var(--eclipse-accent) 60%, transparent)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-5">
          <div className="text-3xl">{quest.emoji}</div>
          <span
            className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              color: "var(--eclipse-accent)",
              background: "color-mix(in oklab, var(--eclipse-accent) 12%, transparent)",
            }}
          >
            {quest.tag}
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-[var(--eclipse-accent)] transition-colors">
          {quest.title}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--eclipse-foreground)]/65 leading-relaxed">
          {quest.description}
        </p>
        {quest.year && (
          <p className="mt-4 font-mono text-[11px] text-[color:var(--eclipse-muted)]">
            {quest.year}
          </p>
        )}
      </div>
    </article>
  );
}