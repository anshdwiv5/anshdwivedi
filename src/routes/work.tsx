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

// edit / add roles here
const ROLES: Role[] = [
  {
    company: "company name",
    title: "product manager",
    period: "2024 — present",
    blurb:
      "shipping things in the ai space. owning product strategy, working with eng + design to take 0→1 features from idea to launch.",
    tags: ["product", "ai", "0→1"],
  },
  {
    company: "previous company",
    title: "associate product manager",
    period: "2022 — 2024",
    blurb:
      "drove growth + activation experiments for a consumer product. ran a/b tests, talked to a lot of users, and learned what shipping really means.",
    tags: ["growth", "consumer"],
  },
  {
    company: "first gig",
    title: "product intern",
    period: "2021 — 2022",
    blurb:
      "first product role — wrote prds, learned the craft, and figured out that this was the thing.",
    tags: ["intern", "learning"],
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
      </div>
    </section>
  );
}