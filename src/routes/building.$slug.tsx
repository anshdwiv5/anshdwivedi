import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { PROJECTS, type Project } from "@/data/projects";
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

type Section = { id: string; label: string; body: string[] };

function getSections(project: Project): Section[] {
  return [
    { id: "problem-space", label: "problem space", body: project.problemSpace ?? [] },
    { id: "solution-space", label: "solution space", body: project.solutionSpace ?? [] },
    { id: "insights", label: "insights", body: project.insights ?? [] },
    { id: "build", label: "build", body: project.build ?? [] },
  ].filter((s) => s.body.length > 0);
}

function ProjectDetail() {
  useReveal();
  const { slug } = Route.useParams();
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const project = idx === -1 ? undefined : PROJECTS[idx];
  const sections = project ? getSections(project) : [];

  // Hooks must run unconditionally — keep them above any early returns.
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!project || project.comingSoon || sections.length === 0) return;
    setActive(sections[0].id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!project) throw notFound();
  if (project.comingSoon) return <ComingSoonDetail project={project} />;

  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="relative py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <div className="grid md:grid-cols-[210px_minmax(0,1fr)] gap-10 md:gap-16">
          {/* ---------- Left handbar ---------- */}
          <aside className="md:sticky md:top-24 md:self-start">
            <Link
              to="/building"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-accent)] transition-colors lowercase"
            >
              <ArrowLeft className="size-3.5" /> back to building
            </Link>

            {sections.length > 0 && (
              <nav className="mt-8 hidden md:block">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[color:var(--eclipse-muted)] mb-4">
                  on this page
                </p>
                <ul className="space-y-1 border-l border-[color:var(--eclipse-foreground)]/12">
                  {sections.map((s) => {
                    const isActive = active === s.id;
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => scrollTo(s.id)}
                          className={`-ml-px block border-l-2 pl-4 py-1.5 text-left text-sm lowercase transition-colors ${
                            isActive
                              ? "border-[var(--eclipse-accent)] text-[var(--eclipse-foreground)] font-medium"
                              : "border-transparent text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-foreground)]"
                          }`}
                        >
                          {s.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </aside>

          {/* ---------- Content ---------- */}
          <div className="min-w-0">
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

            {/* Use now / links */}
            {(project.useNowUrl || (project.links && project.links.length > 0)) && (
              <div className="reveal mt-8 flex flex-wrap items-center gap-3">
                {project.useNowUrl && (
                  <a
                    href={project.useNowUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--eclipse-foreground)] px-4 py-2 text-xs font-medium text-[var(--eclipse-surface)] hover:bg-[color:var(--eclipse-foreground)]/85 transition-colors lowercase"
                  >
                    use now <ArrowUpRight className="size-3.5" />
                  </a>
                )}
                {project.links?.map((l) => (
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
              </div>
            )}

            {/* Overview lead */}
            {project.overview && project.overview.length > 0 && (
              <div className="reveal mt-10 space-y-5 text-[color:var(--eclipse-foreground)]/85 leading-relaxed text-lg md:text-xl lowercase">
                {project.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {/* Sections */}
            <div className="mt-14 md:mt-20 space-y-16 md:space-y-24">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="reveal scroll-mt-28">
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-[color:var(--eclipse-accent)]">
                    {s.label}
                  </p>
                  <div className="mt-5 space-y-5 text-[color:var(--eclipse-foreground)]/85 leading-relaxed text-[17px] lowercase">
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}

              {/* Optional gallery */}
              {project.images && project.images.length > 0 && (
                <section className="reveal">
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-[color:var(--eclipse-accent)] mb-5">
                    screens
                  </p>
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
                </section>
              )}
            </div>

            {/* Prev / Next */}
            <nav className="reveal mt-20 grid grid-cols-2 gap-3 pt-8 border-t border-[color:var(--eclipse-foreground)]/10">
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
        </div>
      </div>
    </article>
  );
}

function ComingSoonDetail({ project }: { project: Project }) {
  return (
    <article className="relative py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <Link
          to="/building"
          className="reveal inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-accent)] transition-colors mb-12 lowercase"
        >
          <ArrowLeft className="size-3.5" /> back to building
        </Link>
        <span className="reveal inline-flex items-center gap-1.5 rounded-full border border-[color:var(--eclipse-foreground)]/15 px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--eclipse-muted)] lowercase">
          <span className="size-1.5 rounded-full bg-[var(--eclipse-accent)]" />
          coming soon
        </span>
        <h1 className="reveal font-display mt-5 text-5xl md:text-7xl tracking-[-0.03em] lowercase leading-[0.95]">
          {project.name}
          <span className="text-[var(--eclipse-accent)]">.</span>
        </h1>
        <p className="reveal mt-6 text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase max-w-xl">
          {project.tagline} the full write-up lands here soon.
        </p>
      </div>
    </article>
  );
}
