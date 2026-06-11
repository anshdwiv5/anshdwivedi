import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { PROJECTS } from "@/data/projects";
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
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <header className="max-w-2xl">
          <h1 className="reveal font-display text-5xl md:text-7xl tracking-[-0.03em] lowercase leading-[0.95]">
            building
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
          <p className="reveal mt-6 text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase">
            a small, deliberate set of things i'm actually building. fewer bets, more care.
          </p>
        </header>

        <div className="mt-16 grid gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: import("@/data/projects").Project;
  index: number;
}) {
  return (
    <Link
      to="/building/$slug"
      params={{ slug: project.slug }}
      style={{
        transitionDelay: `${index * 50}ms`,
        borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)",
      }}
      className="reveal group relative overflow-hidden rounded-3xl border bg-[var(--eclipse-surface)] p-7 md:p-10 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 85% 0%, color-mix(in oklab, var(--eclipse-accent) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative flex items-start gap-5 md:gap-8">
        <div
          className="shrink-0 grid place-items-center size-16 md:size-20 rounded-2xl border overflow-hidden text-3xl md:text-4xl"
          style={{
            borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)",
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--eclipse-accent) 14%, var(--eclipse-surface)), var(--eclipse-surface))",
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
            <span aria-hidden>{project.logo ?? "📦"}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl md:text-4xl tracking-[-0.02em] lowercase">
              {project.name}
            </h2>
            {project.status && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--eclipse-foreground)]/15 px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--eclipse-muted)] lowercase">
                <span className="size-1.5 rounded-full bg-[var(--eclipse-accent)] animate-pulse-glow" />
                {project.status}
              </span>
            )}
          </div>
          <p className="mt-3 max-w-xl text-sm md:text-base text-[color:var(--eclipse-foreground)]/65 leading-relaxed lowercase">
            {project.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--eclipse-foreground)] lowercase opacity-70 group-hover:opacity-100 transition">
            view project <ArrowUpRight className="size-3.5 text-[var(--eclipse-accent)]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
