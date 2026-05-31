import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/building")({
  head: () => ({
    meta: [
      { title: "building — ansh dwivedi" },
      { name: "description", content: "things ansh is currently building on the side." },
      { property: "og:title", content: "building — ansh dwivedi" },
      { property: "og:description", content: "currently shipping." },
    ],
  }),
  component: BuildingPage,
});

type Project = {
  name: string;
  tagline: string;
  blurb: string;
  tags: string[];
  href?: string;
  emoji?: string;
};

const PROJECTS: Project[] = [
  {
    name: "tsundoku",
    tagline: "the books i bought faster than i read.",
    blurb:
      "a personal reading + to-be-read tracker, named for the japanese word for piling up books unread. track what's on your shelf, what you're mid-way through, and what you keep meaning to start.",
    tags: ["side project", "reading", "in progress"],
    emoji: "📚",
  },
];

function BuildingPage() {
  useReveal();
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-6 lowercase">
          03 — building
        </p>
        <h1 className="reveal text-4xl md:text-6xl font-semibold tracking-tight mb-14 lowercase">
          currently shipping<span className="text-[var(--eclipse-accent)]">.</span>
        </h1>

        <div className="grid gap-6">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="reveal group relative rounded-3xl border p-8 md:p-10 transition-all duration-500 hover:-translate-y-1"
              style={{
                borderColor: "color-mix(in oklab, var(--eclipse-muted) 35%, transparent)",
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--eclipse-surface) 70%, transparent), color-mix(in oklab, var(--eclipse-deep) 60%, transparent))",
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 80% 0%, color-mix(in oklab, var(--eclipse-accent) 18%, transparent), transparent 70%)",
                }}
              />
              <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start">
                <div className="text-5xl">{p.emoji}</div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight lowercase">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[var(--eclipse-accent)] font-mono text-sm lowercase">
                    {p.tagline}
                  </p>
                  <p className="mt-5 text-[color:var(--eclipse-foreground)]/75 leading-relaxed max-w-2xl lowercase">
                    {p.blurb}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border"
                        style={{
                          borderColor: "color-mix(in oklab, var(--eclipse-muted) 50%, transparent)",
                          color: "var(--eclipse-foreground)",
                          background: "color-mix(in oklab, var(--eclipse-deep) 40%, transparent)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={p.href ?? "#"}
                  className="self-center justify-self-start md:justify-self-end font-mono text-sm text-[var(--eclipse-accent)] hover:text-[color:var(--eclipse-foreground)] transition-colors lowercase"
                >
                  peek →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}