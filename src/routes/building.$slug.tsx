import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { PROJECTS } from "@/data/projects";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/building/$slug")({
  head: ({ params }) => {
    const p = PROJECTS.find((x) => x.slug === params.slug);
    const title = p ? p.name : "project";
    return {
      meta: [
        { title: `${title.toLowerCase()} · building · ansh dwivedi` },
        { name: "description", content: p?.tagline ?? "a project from ansh's workshop." },
        { property: "og:title", content: title.toLowerCase() },
        { property: "og:description", content: p?.tagline ?? "a project from ansh's workshop." },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  useReveal();
  const { slug } = Route.useParams();
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) throw notFound();
  const project = PROJECTS[idx];
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  return (
    <article className="relative py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <Link
          to="/building"
          className="reveal inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-accent)] transition-colors mb-10 lowercase"
        >
          <ArrowLeft className="size-3.5" /> back to building
        </Link>

        {/* Header */}
        <header className="reveal flex items-start gap-5">
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
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] lowercase">
                {project.name}
                <span className="text-[var(--eclipse-accent)]">.</span>
              </h1>
              {project.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--eclipse-foreground)]/15 px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--eclipse-muted)] lowercase">
                  <span className="size-1.5 rounded-full bg-[var(--eclipse-accent)] animate-pulse-glow" />
                  {project.status}
                </span>
              )}
            </div>
            <p className="mt-3 text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase">
              {project.tagline}
            </p>
          </div>
        </header>

        {/* Overview */}
        <section className="reveal mt-14">
          <p className="text-xs font-medium tracking-wider text-[color:var(--eclipse-muted)] lowercase mb-4">
            overview
          </p>
          <div className="space-y-5 text-[color:var(--eclipse-foreground)]/85 leading-relaxed text-[17px] lowercase">
            {project.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="reveal mt-16">
          <p className="text-xs font-medium tracking-wider text-[color:var(--eclipse-muted)] lowercase mb-4">
            screens
          </p>
          {project.images && project.images.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {project.images.map((m, i) => (
                <figure key={i} className="m-0">
                  <img
                    src={m.src}
                    alt={m.caption ?? project.name}
                    loading="lazy"
                    className="w-full rounded-xl border border-[color:var(--eclipse-foreground)]/10"
                  />
                  {m.caption && (
                    <figcaption className="mt-1 text-[11px] text-[color:var(--eclipse-muted)] lowercase">
                      {m.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl border border-dashed border-[color:var(--eclipse-foreground)]/15 bg-[color:var(--eclipse-foreground)]/[0.02] flex items-center justify-center text-[11px] text-[color:var(--eclipse-muted)] lowercase"
                >
                  image slot
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Architecture */}
        {project.architecture && project.architecture.length > 0 && (
          <section className="reveal mt-16">
            <p className="text-xs font-medium tracking-wider text-[color:var(--eclipse-muted)] lowercase mb-4">
              architecture
            </p>
            <div className="space-y-5 text-[color:var(--eclipse-foreground)]/85 leading-relaxed text-[15px] lowercase">
              {project.architecture.map((a, i) => (
                <p key={i}>{a}</p>
              ))}
            </div>
          </section>
        )}

        {/* Stack */}
        {project.stack && project.stack.length > 0 && (
          <section className="reveal mt-16">
            <p className="text-xs font-medium tracking-wider text-[color:var(--eclipse-muted)] lowercase mb-4">
              stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[color:var(--eclipse-foreground)]/12 bg-[color:var(--eclipse-foreground)]/[0.02] px-3 py-1 text-xs font-medium text-[color:var(--eclipse-foreground)]/75 lowercase"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <section className="reveal mt-16 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--eclipse-foreground)]/15 px-4 py-2 text-xs font-medium text-[color:var(--eclipse-foreground)]/80 hover:text-[var(--eclipse-foreground)] hover:border-[color:var(--eclipse-accent)]/50 transition-all lowercase"
              >
                {l.label} <ArrowUpRight className="size-3.5 text-[var(--eclipse-accent)]" />
              </a>
            ))}
          </section>
        )}

        {/* Prev / Next */}
        <nav className="reveal mt-16 grid grid-cols-2 gap-3 pt-8 border-t border-[color:var(--eclipse-foreground)]/10">
          {prev ? (
            <Link
              to="/building/$slug"
              params={{ slug: prev.slug }}
              className="group rounded-xl border border-[color:var(--eclipse-foreground)]/10 p-4 hover:border-[color:var(--eclipse-foreground)]/25 transition-colors"
            >
              <p className="text-[11px] tracking-wider text-[color:var(--eclipse-muted)] lowercase flex items-center gap-1.5">
                <ArrowLeft className="size-3" /> previous
              </p>
              <p className="mt-1.5 text-sm font-medium text-[var(--eclipse-foreground)] lowercase line-clamp-2">
                {prev.name}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/building/$slug"
              params={{ slug: next.slug }}
              className="group rounded-xl border border-[color:var(--eclipse-foreground)]/10 p-4 hover:border-[color:var(--eclipse-foreground)]/25 transition-colors text-right"
            >
              <p className="text-[11px] tracking-wider text-[color:var(--eclipse-muted)] lowercase flex items-center justify-end gap-1.5">
                next <ArrowRight className="size-3" />
              </p>
              <p className="mt-1.5 text-sm font-medium text-[var(--eclipse-foreground)] lowercase line-clamp-2">
                {next.name}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </article>
  );
}
