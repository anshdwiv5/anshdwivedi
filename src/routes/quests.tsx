import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/quests")({
  head: () => ({
    meta: [
      { title: "side quests — ansh dwivedi" },
      { name: "description", content: "detours, hobbies, and one-offs ansh has tried." },
      { property: "og:title", content: "side quests — ansh dwivedi" },
      { property: "og:description", content: "things i've tried." },
    ],
  }),
  component: QuestsPage,
});

type Quest = {
  title: string;
  description: string;
  tag: string;
  year?: string;
  emoji?: string;
};

const QUESTS: Quest[] = [
  { title: "horse riding", description: "rode horses as a kid.", tag: "as a kid", emoji: "🐎" },
  { title: "full marathon", description: "training for / running a full marathon this year.", tag: "this year", year: "2026", emoji: "🏃" },
  { title: "standup comedy", description: "tried a standup set.", tag: "one-off", emoji: "🎤" },
];

function QuestsPage() {
  useReveal();
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-6 lowercase">
          04 — side quests
        </p>
        <h1 className="reveal text-4xl md:text-6xl font-semibold tracking-tight lowercase">
          things i've <span className="text-[var(--eclipse-accent)]">tried</span>.
        </h1>
        <p className="reveal mt-5 text-base md:text-lg text-[color:var(--eclipse-foreground)]/65 leading-relaxed max-w-xl mb-14 lowercase">
          a running list of detours — past, present, and one-offs. some stuck. some really did not.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUESTS.map((q) => (
            <article
              key={q.title}
              className="reveal group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                borderColor: "color-mix(in oklab, var(--eclipse-muted) 30%, transparent)",
                background: "color-mix(in oklab, var(--eclipse-surface) 35%, transparent)",
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="text-3xl">{q.emoji}</div>
                <span
                  className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    color: "var(--eclipse-accent)",
                    background: "color-mix(in oklab, var(--eclipse-accent) 12%, transparent)",
                  }}
                >
                  {q.tag}
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight group-hover:text-[var(--eclipse-accent)] transition-colors lowercase">
                {q.title}
              </h3>
              <p className="mt-2 text-sm text-[color:var(--eclipse-foreground)]/65 leading-relaxed lowercase">
                {q.description}
              </p>
              {q.year && (
                <p className="mt-4 font-mono text-[11px] text-[color:var(--eclipse-muted)] lowercase">
                  {q.year}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}