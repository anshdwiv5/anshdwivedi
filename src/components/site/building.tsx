type Project = {
  name: string;
  tagline: string;
  blurb: string;
  tags: string[];
  href?: string;
  emoji?: string;
};

// Add new projects here later — same shape, same card.
const PROJECTS: Project[] = [
  {
    name: "Tsundoku",
    tagline: "the books I bought faster than I read.",
    blurb:
      "A personal reading + to-be-read tracker, named for the Japanese word for piling up books unread. Track what's on your shelf, what you're mid-way through, and what you keep meaning to start.",
    tags: ["side project", "reading", "in progress"],
    emoji: "📚",
  },
];

export function Building() {
  return (
    <section id="building" className="relative py-32 md:py-40 bg-[color:var(--eclipse-surface)]/30">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <div>
            <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-4">
              02 — building
            </p>
            <h2 className="reveal text-4xl md:text-6xl font-semibold tracking-tight">
              Currently shipping.
            </h2>
          </div>
        </div>

        <div className="grid gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
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
        <div className="text-5xl">{project.emoji}</div>
        <div>
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="mt-2 text-[var(--eclipse-accent)] font-mono text-sm">
            {project.tagline}
          </p>
          <p className="mt-5 text-[color:var(--eclipse-foreground)]/75 leading-relaxed max-w-2xl">
            {project.blurb}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
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
          href={project.href ?? "#"}
          className="self-center justify-self-start md:justify-self-end font-mono text-sm text-[var(--eclipse-accent)] hover:text-[color:var(--eclipse-foreground)] transition-colors"
        >
          peek →
        </a>
      </div>
    </article>
  );
}