import { createFileRoute } from "@tanstack/react-router";

import { HeroBackground } from "@/components/site/hero-background";
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
      style={{ background: "var(--eclipse-deep)" }}
    >
      <HeroBackground />
      <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-center relative z-10">
        <div>
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

        <div className="relative aspect-square max-w-[440px] mx-auto w-full reveal">
          {/* soft halo behind a transparent-bg portrait */}
          <div
            className="absolute inset-[5%] rounded-full animate-pulse-glow"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--eclipse-accent) 55%, transparent) 0%, color-mix(in oklab, var(--eclipse-accent) 18%, transparent) 35%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          {/* faint orbital ring */}
          <div
            className="absolute inset-[2%] rounded-full border animate-orbit-slow"
            style={{
              borderColor: "color-mix(in oklab, var(--eclipse-accent) 22%, transparent)",
              borderStyle: "dashed",
            }}
          />
          {/* photo slot — drop a transparent PNG here (no hard frame) */}
          <div className="relative w-full h-full flex items-end justify-center">
            {/*
              replace the <div> below with:
              <img src="/your-photo.png" alt="ansh dwivedi" className="w-full h-full object-contain" />
            */}
            <div className="w-[78%] h-[88%] flex items-center justify-center font-mono text-xs text-[color:var(--eclipse-muted)] lowercase tracking-widest">
              drop transparent png here
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
