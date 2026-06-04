import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { QUESTS } from "@/data/quests";

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

function QuestsPage() {
  useReveal();
  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <h1 className="reveal text-4xl md:text-6xl font-semibold tracking-tight lowercase">
          things i've <span className="text-[var(--eclipse-accent)]">tried</span>.
        </h1>
        <p className="reveal mt-5 text-base md:text-lg text-[color:var(--eclipse-foreground)]/65 leading-relaxed max-w-xl mb-12 lowercase">
          a running list of detours — past, present, and one-offs. tap one to dive in.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUESTS.map((q) => {
            const Icon = q.icon;
            return (
            <Link
              key={q.slug}
              to="/quests/$slug"
              params={{ slug: q.slug }}
              className="reveal group relative block rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "color-mix(in oklab, var(--eclipse-muted) 30%, transparent)",
                background: "color-mix(in oklab, var(--eclipse-surface) 35%, transparent)",
              }}
            >
              <div className="mb-6 flex items-start justify-between">
                <div
                  className="relative inline-flex items-center justify-center size-14 rounded-2xl border transition-all duration-300 group-hover:scale-105"
                  style={{
                    borderColor: "color-mix(in oklab, var(--eclipse-accent) 35%, transparent)",
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--eclipse-accent) 18%, transparent), color-mix(in oklab, var(--eclipse-surface) 60%, transparent))",
                    boxShadow:
                      "0 0 24px -6px color-mix(in oklab, var(--eclipse-accent) 40%, transparent)",
                  }}
                >
                  <Icon
                    className="size-6 text-[var(--eclipse-accent)] group-hover:text-[var(--eclipse-foreground)] transition-colors"
                    strokeWidth={1.6}
                  />
                </div>
                {q.entries.length > 0 && (
                  <span className="text-[11px] font-medium tracking-wide text-[color:var(--eclipse-muted)] lowercase">
                    {q.entries.length} {q.entries.length === 1 ? "entry" : "entries"}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold tracking-tight group-hover:text-[var(--eclipse-accent)] transition-colors lowercase">
                {q.title}
              </h3>
              <p className="mt-2 text-sm text-[color:var(--eclipse-foreground)]/65 leading-relaxed lowercase">
                {q.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-[12px] text-[var(--eclipse-accent)] lowercase group-hover:gap-2 transition-all">
                open →
              </span>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}