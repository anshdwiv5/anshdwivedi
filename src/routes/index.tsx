import { createFileRoute } from "@tanstack/react-router";

import { HeroBackground } from "@/components/site/hero-background";
import { useReveal } from "@/hooks/use-reveal";
import portrait from "@/assets/ansh-portrait.png";

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
      className="relative min-h-[calc(100svh-4rem-5rem)] flex items-center overflow-hidden"
      style={{ background: "var(--eclipse-deep)" }}
    >
      <HeroBackground />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 py-12 sm:py-16 md:py-24 grid md:grid-cols-[1.25fr_1fr] gap-10 md:gap-16 items-center relative z-10">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="reveal text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.95] font-semibold tracking-tight lowercase">
            ansh
            <br />
            <span className="text-accent-glow">dwivedi</span>
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
          <p className="reveal mt-6 md:mt-8 max-w-xl mx-auto md:mx-0 text-base sm:text-lg md:text-xl text-[color:var(--eclipse-foreground)]/75 leading-relaxed lowercase">
            figuring this ai stuff out{" "}
            <span className="text-[var(--eclipse-accent)]">(+ a few side quests)</span>
          </p>
        </div>

        <div className="relative aspect-square w-[78vw] max-w-[360px] md:max-w-[440px] mx-auto reveal order-1 md:order-2">
          {/* big soft halo behind transparent portrait */}
          <div
            className="absolute inset-[-6%] rounded-full animate-pulse-glow"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, #c084fc 0%, color-mix(in oklab, #8b5cf6 55%, transparent) 25%, color-mix(in oklab, #22d3ee 25%, transparent) 55%, transparent 75%)",
              filter: "blur(40px)",
              opacity: 0.65,
            }}
          />
          {/* dashed orbital ring */}
          <div
            className="absolute inset-[2%] rounded-full border animate-orbit-slow"
            style={{
              borderColor: "color-mix(in oklab, var(--eclipse-accent) 35%, transparent)",
              borderStyle: "dashed",
            }}
          />
          {/* counter-rotating thin ring */}
          <div
            className="absolute inset-[-4%] rounded-full border animate-orbit-rev"
            style={{
              borderColor: "color-mix(in oklab, #ec4899 30%, transparent)",
              borderStyle: "dotted",
            }}
          />
          {/* portrait */}
          <img
            src={portrait}
            alt="ansh dwivedi"
            loading="eager"
            className="relative z-10 w-full h-full object-contain drop-shadow-[0_25px_45px_rgba(124,58,237,0.45)]"
          />
        </div>
      </div>
    </section>
  );
}
