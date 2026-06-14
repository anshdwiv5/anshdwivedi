import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { PROJECTS, type Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

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
        {/* Hero */}
        <header className="max-w-3xl">
          <h1 className="reveal font-display text-5xl md:text-7xl tracking-[-0.03em] lowercase leading-[0.95]">
            building
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
          <p className="reveal mt-6 text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase max-w-xl">
            a few attempts at turning "someone should build this" into "i built this."
          </p>
        </header>

        {/* Projects — alternating orientation for rhythm */}
        <div className="mt-16 md:mt-24 space-y-6 md:space-y-8">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

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

function ProjectLogo({
  project,
  dim = false,
  flipped = false,
}: {
  project: Project;
  dim?: boolean;
  flipped?: boolean;
}) {
  return (
    <div
      className={`aspect-[4/3] md:aspect-[5/4] w-full rounded-2xl overflow-hidden grid place-items-center text-7xl md:text-8xl ${
        dim ? "opacity-50 grayscale" : ""
      }`}
      style={{
        background: `linear-gradient(${
          flipped ? "225deg" : "135deg"
        }, color-mix(in oklab, var(--eclipse-accent) 22%, var(--eclipse-surface)), color-mix(in oklab, var(--eclipse-foreground) 4%, var(--eclipse-surface)))`,
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
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Alternate which side the visual sits on for a more dynamic layout.
  const flipped = index % 2 === 1;

  if (project.comingSoon) {
    return (
      <div
        style={{
          transitionDelay: `${index * 60}ms`,
          borderColor: "color-mix(in oklab, var(--eclipse-foreground) 14%, transparent)",
        }}
        className="reveal relative overflow-hidden rounded-[2rem] border border-dashed bg-[color:var(--eclipse-surface)]/60"
      >
        <div
          className={`grid md:grid-cols-12 items-stretch ${
            flipped ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="md:col-span-5 p-6 md:p-8">
            <ProjectLogo project={project} dim flipped={flipped} />
          </div>
          <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[color:var(--eclipse-foreground)]/15 px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--eclipse-muted)] lowercase">
              <span className="size-1.5 rounded-full bg-[var(--eclipse-accent)]" />
              coming soon
            </span>
            <h2 className="font-display mt-4 text-4xl md:text-6xl tracking-[-0.025em] lowercase leading-[0.95] text-[color:var(--eclipse-foreground)]/70">
              {project.name}
              <span className="text-[var(--eclipse-accent)]">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base md:text-lg text-[color:var(--eclipse-foreground)]/55 leading-relaxed lowercase">
              {project.tagline}
            </p>
            <p className="mt-3 max-w-xl text-sm md:text-base text-[color:var(--eclipse-foreground)]/45 leading-relaxed lowercase line-clamp-2">
              {project.description}
            </p>
            <span className="mt-7 text-sm font-medium text-[color:var(--eclipse-muted)] lowercase">
              the full story lands here soon.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        transitionDelay: `${index * 60}ms`,
        borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)",
      }}
      className="reveal group relative overflow-hidden rounded-[2rem] border bg-[var(--eclipse-surface)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 80% at ${
            flipped ? "15%" : "85%"
          } 0%, color-mix(in oklab, var(--eclipse-accent) 14%, transparent), transparent 70%)`,
        }}
      />

      <div
        className={`relative grid md:grid-cols-12 items-stretch ${
          flipped ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* visual side */}
        <div className="md:col-span-5 p-6 md:p-8">
          <ProjectLogo project={project} flipped={flipped} />
        </div>

        {/* content side */}
        <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="font-display text-4xl md:text-6xl tracking-[-0.025em] lowercase leading-[0.95]">
            {project.name}
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase">
            {project.tagline}
          </p>
          <p className="mt-3 max-w-xl text-sm md:text-base text-[color:var(--eclipse-foreground)]/55 leading-relaxed lowercase line-clamp-2">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            {project.useNowUrl && (
              <a
                href={project.useNowUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--eclipse-foreground)] px-4 py-2 text-xs font-medium text-[var(--eclipse-surface)] hover:bg-[color:var(--eclipse-foreground)]/85 transition-colors lowercase"
              >
                use now <ArrowUpRight className="size-3.5" />
              </a>
            )}
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--eclipse-foreground)] lowercase opacity-80 group-hover:opacity-100 transition">
              project overview
              <ArrowUpRight className="size-4 text-[var(--eclipse-accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* full-card click target → detail page (kept below the use-now CTA) */}
      <Link
        to="/building/$slug"
        params={{ slug: project.slug }}
        aria-label={`${project.name} — project overview`}
        className="absolute inset-0"
      />
    </div>
  );
}
