import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { PROJECTS } from "@/data/projects";
import { ArrowUpRight, Hammer, Sparkles, Wrench } from "lucide-react";

export const Route = createFileRoute("/building")({
  head: () => ({
    meta: [
      { title: "building · ansh dwivedi" },
      { name: "description", content: "products and tools ansh is building on the side." },
      { property: "og:title", content: "building · ansh dwivedi" },
      { property: "og:description", content: "things i'm building." },
    ],
  }),
  component: BuildingPage,
});

function BuildingPage() {
  useReveal();
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        {/* Hero — mirrors homepage highlight reel */}
        <header className="max-w-3xl">
          <p className="reveal text-xs font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">
            the workshop
          </p>
          <h1 className="reveal font-display mt-3 text-5xl md:text-7xl tracking-[-0.03em] lowercase leading-[0.95]">
            building
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
          <p className="reveal mt-6 text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase max-w-xl">
            a small, deliberate set of things i'm actually building. fewer bets, more care —
            shipped on nights and weekends.
          </p>

          {/* tiny stat strip — adds context like a product page */}
          <dl className="reveal mt-8 grid grid-cols-3 gap-3 md:gap-4 max-w-md">
            {[
              { k: "shipped", v: String(PROJECTS.length) },
              { k: "in progress", v: String(PROJECTS.filter((p) => p.status === "in progress").length) },
              { k: "exploring", v: String(PROJECTS.filter((p) => p.status === "exploring").length) },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border bg-[var(--eclipse-surface)] px-4 py-3"
                style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)" }}
              >
                <dt className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--eclipse-muted)]">{s.k}</dt>
                <dd className="font-display mt-1 text-2xl md:text-3xl tracking-tight lowercase">{s.v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Featured products — alternating zig-zag, apple-style bands */}
        <div className="mt-20 md:mt-28 space-y-20 md:space-y-28">
          {PROJECTS.map((p, i) => (
            <ProjectBand key={p.slug} project={p} index={i} />
          ))}
        </div>

        {/* Workshop principles — small highlight reel of how i build */}
        <section className="mt-24 md:mt-32">
          <p className="reveal text-xs font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">
            workshop notes
          </p>
          <h2 className="reveal font-display mt-3 text-3xl md:text-5xl tracking-[-0.02em] lowercase">
            how this stuff actually gets made.
          </h2>
          <div className="mt-10 grid gap-4 md:gap-5 md:grid-cols-3">
            {[
              {
                icon: <Sparkles className="size-4" />,
                title: "scratch your own itch",
                body: "if i wouldn't use it on a tuesday afternoon, it doesn't get built.",
              },
              {
                icon: <Hammer className="size-4" />,
                title: "ship the ugly v1",
                body: "taste shows up later. momentum shows up first or not at all.",
              },
              {
                icon: <Wrench className="size-4" />,
                title: "keep the surface small",
                body: "one screen, one promise. expand only when the promise holds.",
              },
            ].map((n) => (
              <div
                key={n.title}
                className="reveal rounded-3xl border bg-[var(--eclipse-surface)] p-6 md:p-7"
                style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)" }}
              >
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-[color:var(--eclipse-accent)]/10 text-[var(--eclipse-accent)]">
                  {n.icon}
                </span>
                <h3 className="font-display mt-4 text-xl md:text-2xl tracking-tight lowercase">{n.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--eclipse-foreground)]/65 leading-relaxed lowercase">
                  {n.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA card */}
        <Link
          to="/contact"
          className="reveal mt-16 md:mt-24 group block overflow-hidden rounded-3xl border bg-[var(--eclipse-foreground)] p-8 md:p-12 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
          style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 80%, transparent)" }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-[11px] font-medium tracking-[0.2em] text-[var(--eclipse-accent)] uppercase">
                got an idea?
              </span>
              <h3 className="font-display mt-3 text-2xl md:text-4xl tracking-[-0.02em] text-[var(--eclipse-surface)] lowercase max-w-xl">
                if it's weird enough to be interesting, i probably want to hear about it.
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--eclipse-accent)] lowercase">
              start a conversation <ArrowUpRight className="size-4" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function ProjectBand({
  project,
  index,
}: {
  project: import("@/data/projects").Project;
  index: number;
}) {
  // alternating zig-zag: even index = visual left, odd index = visual right
  const flipped = index % 2 === 1;
  return (
    <Link
      to="/building/$slug"
      params={{ slug: project.slug }}
      style={{
        transitionDelay: `${index * 60}ms`,
        borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)",
      }}
      className="reveal group relative block overflow-hidden rounded-[2rem] border bg-[var(--eclipse-surface)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            `radial-gradient(ellipse 60% 80% at ${flipped ? "15%" : "85%"} 0%, color-mix(in oklab, var(--eclipse-accent) 14%, transparent), transparent 70%)`,
        }}
      />
      <div
        className={`relative grid md:grid-cols-12 gap-0 md:gap-10 items-stretch ${
          flipped ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* visual side */}
        <div className="md:col-span-5 relative p-6 md:p-8">
          <div
            className="aspect-square md:aspect-[4/5] w-full rounded-2xl overflow-hidden grid place-items-center text-7xl md:text-8xl"
            style={{
              background: `linear-gradient(${flipped ? "225deg" : "135deg"}, color-mix(in oklab, var(--eclipse-accent) 22%, var(--eclipse-surface)), color-mix(in oklab, var(--eclipse-foreground) 4%, var(--eclipse-surface)))`,
              border: "1px solid color-mix(in oklab, var(--eclipse-foreground) 8%, transparent)",
            }}
          >
            {project.logoImage ? (
              <img
                src={project.logoImage}
                alt={`${project.name} logo`}
                className="size-full object-cover"
                loading="lazy"
              />
            ) : (
              <span aria-hidden className="drop-shadow-[0_10px_30px_rgba(184,115,51,0.3)]">
                {project.logo ?? "📦"}
              </span>
            )}
          </div>
        </div>

        {/* content side */}
        <div className={`md:col-span-7 p-6 md:p-10 flex flex-col justify-center ${flipped ? "md:pr-12 md:pl-0" : "md:pl-0 md:pr-12"}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">
              project 0{index + 1}
            </span>
            {project.status && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--eclipse-foreground)]/15 px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--eclipse-muted)] lowercase">
                <span className="size-1.5 rounded-full bg-[var(--eclipse-accent)] animate-pulse-glow" />
                {project.status}
              </span>
            )}
          </div>
          <h2 className="font-display mt-3 text-4xl md:text-6xl tracking-[-0.025em] lowercase leading-[0.95]">
            {project.name}
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase max-w-xl">
            {project.tagline}
          </p>
          <p className="mt-3 max-w-xl text-sm md:text-base text-[color:var(--eclipse-foreground)]/55 leading-relaxed lowercase">
            {project.description}
          </p>

          {project.stack && project.stack.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[color:var(--eclipse-foreground)]/12 bg-[color:var(--eclipse-foreground)]/[0.02] px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--eclipse-foreground)]/70 lowercase"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--eclipse-foreground)] lowercase opacity-80 group-hover:opacity-100 transition">
            view project <ArrowUpRight className="size-4 text-[var(--eclipse-accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
