import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "work — ansh dwivedi" },
      { name: "description", content: "work experience of ansh dwivedi — product roles across teams and startups." },
      { property: "og:title", content: "work — ansh dwivedi" },
      { property: "og:description", content: "where i've worked and what i shipped." },
    ],
  }),
  component: WorkPage,
});

type Role = {
  company: string;
  title: string;
  period: string;
  blurb: string;
  tags?: string[];
};

type Edu = {
  school: string;
  degree: string;
  period: string;
  blurb: string;
};

// edit / add roles here
const ROLES: Role[] = [
  {
    company: "flipkart",
    title: "associate product manager",
    period: "2025 — now",
    blurb: "building b2b commerce + supply chain products.",
    tags: ["b2b", "supply chain", "commerce"],
  },
  {
    company: "chiratae ventures",
    title: "investments intern",
    period: "early 2025",
    blurb: "early-stage consumertech. looked at deals, did the digging.",
    tags: ["vc", "consumertech", "deals"],
  },
  {
    company: "m2p fintech",
    title: "pm intern",
    period: "summer 2024",
    blurb: "worked on a b2b debit-card management suite.",
    tags: ["fintech", "b2b", "cards"],
  },
  {
    company: "desklamp",
    title: "strategy & growth intern",
    period: "summer 2022",
    blurb: "international markets.",
    tags: ["strategy", "growth", "international"],
  },
];

// edit / add education here
const EDU: Edu[] = [
  {
    school: "iit madras",
    degree: "b.tech",
    period: "2021 — 2025",
    blurb: "institute basketball team. plus a few too many clubs: saarang, e-cell, finclub, yrf, culinary.",
  },
  {
    school: "sanskriti school",
    degree: "science, econ, math",
    period: "",
    blurb: "new delhi.",
  },
];

function WorkPage() {
  useReveal();
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-6 lowercase">
          02 — work
        </p>
        <h1 className="reveal text-4xl md:text-6xl font-semibold tracking-tight mb-4 lowercase">
          where i've been<span className="text-[var(--eclipse-accent)]">.</span>
        </h1>
        <p className="reveal text-base md:text-lg text-[color:var(--eclipse-foreground)]/65 leading-relaxed mb-14 max-w-xl lowercase">
          a chronological-ish list of roles. shorter than a resume, longer than a tweet.
        </p>

        <ol className="relative space-y-6">
          {ROLES.map((r) => (
            <li key={r.company + r.period} className="reveal">
              <article
                className="group relative rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: "color-mix(in oklab, var(--eclipse-muted) 30%, transparent)",
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--eclipse-surface) 55%, transparent), color-mix(in oklab, var(--eclipse-deep) 60%, transparent))",
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight lowercase">
                    {r.title}{" "}
                    <span className="text-[var(--eclipse-accent)]">@ {r.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-[color:var(--eclipse-muted)] lowercase">
                    {r.period}
                  </span>
                </div>
                <p className="text-sm md:text-base text-[color:var(--eclipse-foreground)]/75 leading-relaxed lowercase">
                  {r.blurb}
                </p>
                {r.tags && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
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
                )}
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-24">
          <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-6 lowercase">
            03 — education
          </p>
          <h2 className="reveal text-3xl md:text-5xl font-semibold tracking-tight mb-12 lowercase">
            where i learned things<span className="text-[var(--eclipse-accent)]">.</span>
          </h2>

          <ol className="relative space-y-6">
            {EDU.map((e) => (
              <li key={e.school + e.period} className="reveal">
                <article
                  className="group relative rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: "color-mix(in oklab, var(--eclipse-muted) 30%, transparent)",
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--eclipse-surface) 55%, transparent), color-mix(in oklab, var(--eclipse-deep) 60%, transparent))",
                  }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight lowercase">
                      {e.degree}{" "}
                      <span className="text-[var(--eclipse-accent)]">@ {e.school}</span>
                    </h3>
                    {e.period && (
                      <span className="font-mono text-xs text-[color:var(--eclipse-muted)] lowercase">
                        {e.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm md:text-base text-[color:var(--eclipse-foreground)]/75 leading-relaxed lowercase">
                    {e.blurb}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}