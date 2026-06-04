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
  did: string[];
  learnt: string[];
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
    title: "associate product manager 2",
    period: "2026 — now",
    blurb: "building supply chain products for b2b commerce.",
    did: [
      "placeholder — to be added.",
    ],
    learnt: [
      "placeholder — to be added.",
    ],
  },
  {
    company: "flipkart",
    title: "associate product manager 1",
    period: "2025 — now",
    blurb: "building supply chain products for b2b commerce.",
    did: [
      "onboarded new clients (coles, serhafen) to our logo list.",
      "owned roadmap for oms, returns & cx supply-chain module.",
      "created client-facing config layers to reduce change requests & dev bw.",
    ],
    learnt: [
      "b2b saas pming: product-led vs client-led approach.",
      "how a mature ecommerce supply chain comes together e2e.",
      "every problem becomes a people problem eventually.",
    ],
  },
  {
    company: "chiratae ventures",
    title: "investments intern",
    period: "early 2025",
    blurb: "early-stage consumertech, particular focus on travel, kids bpc & pet.",
    did: [
      "spoke to founders building weird, ambitious things.",
      "dug through markets, metrics and decks.",
      "wrote investment memos nobody reads unless they're important.",
    ],
    learnt: [
      "great founders see the world differently.",
      "market timing matters more than people admit.",
      "conviction is expensive.",
    ],
  },
  {
    company: "m2p fintech",
    title: "pm intern",
    period: "summer 2024",
    blurb: "worked on a b2b debit-card management suite.",
    did: [
      "scoped the card-management suite for b2b clients across sea & mena.",
      "learnt to write prds & work with sales + engg + design.",
      "turned rfp shortcomings into roadmap.",
    ],
    learnt: [
      "how regulated fintech really works under the hood.",
      "the value of a clean api contract.",
      "spent time understanding how money actually moves.",
    ],
  },
  {
    company: "desklamp",
    title: "strategy & growth intern",
    period: "summer 2022",
    blurb: "international markets.",
    did: [
      "ran early growth experiments.",
      "focussed on marketing framing for different cohorts.",
      "spoke to customers & clients and turned feedback into insights.",
    ],
    learnt: [
      "growth is rarely a marketing problem.",
      "distribution is harder than building.",
      "startups move on instinct until they can move on data.",
    ],
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
                <div className="mt-6 grid md:grid-cols-2 gap-5">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--eclipse-accent)] mb-3 lowercase">
                      what i did
                    </p>
                    <ul className="space-y-2 text-sm text-[color:var(--eclipse-foreground)]/75 leading-relaxed lowercase">
                      {r.did.map((d, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[var(--eclipse-accent)] mt-1.5 size-1 rounded-full bg-[var(--eclipse-accent)] shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--eclipse-accent)] mb-3 lowercase">
                      what i learnt
                    </p>
                    <ul className="space-y-2 text-sm text-[color:var(--eclipse-foreground)]/75 leading-relaxed lowercase">
                      {r.learnt.map((d, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[var(--eclipse-accent)] mt-1.5 size-1 rounded-full bg-[var(--eclipse-accent)] shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-24">
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