import { createFileRoute } from "@tanstack/react-router";

import { Eclipse } from "@/components/site/eclipse";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ansh dwivedi" },
      {
        name: "description",
        content: "ansh dwivedi — product, ai, and a few side quests.",
      },
      { property: "og:title", content: "ansh dwivedi" },
      { property: "og:description", content: "product, ai, and a few side quests." },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <section
      className="relative min-h-[calc(100vh-4rem-5rem)] flex items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-center relative z-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-6 reveal lowercase">
            ✦ portfolio / 2026
          </p>
          <h1 className="reveal text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-semibold tracking-tight lowercase">
            ansh
            <br />
            <span className="text-accent-glow">dwivedi</span>
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg md:text-xl text-[color:var(--eclipse-foreground)]/75 leading-relaxed lowercase">
            figuring this ai stuff out{" "}
            <span className="text-[var(--eclipse-accent)]">(+ a few side quests)</span>
          </p>
        </div>

        <div className="relative aspect-square max-w-[420px] mx-auto w-full reveal">
          <Eclipse className="absolute inset-0" />
          <div
            className="absolute inset-[18%] rounded-full overflow-hidden border-2 z-10"
            style={{
              borderColor: "color-mix(in oklab, var(--eclipse-accent) 50%, transparent)",
              boxShadow: "var(--shadow-eclipse)",
              background: "linear-gradient(135deg, var(--eclipse-surface), var(--eclipse-deep))",
            }}
          >
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[color:var(--eclipse-muted)] lowercase">
              your photo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
