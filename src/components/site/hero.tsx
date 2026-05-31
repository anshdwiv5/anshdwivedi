import { Eclipse } from "./eclipse";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container mx-auto px-6 md:px-10 pt-28 pb-20 grid md:grid-cols-[1.4fr_1fr] gap-12 items-center relative z-10">
        {/* Text */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-6 reveal">
            ✦ portfolio / 2026
          </p>
          <h1 className="reveal text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.95] font-semibold tracking-tight">
            Ansh
            <br />
            <span className="text-accent-glow">Dwivedi</span>
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg md:text-xl text-[color:var(--eclipse-foreground)]/75 leading-relaxed">
            figuring this AI stuff out{" "}
            <span className="text-[var(--eclipse-accent)]">(+ a few side quests)</span>
          </p>

          <div className="reveal mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("side-quests")}
              className="group relative px-6 py-3 rounded-full bg-[var(--eclipse-accent)] text-[var(--eclipse-deep)] font-medium text-sm transition-all duration-300 hover:shadow-[var(--shadow-eclipse)] hover:-translate-y-0.5"
            >
              Side quests <span className="ml-1 transition-transform group-hover:translate-x-0.5 inline-block">↓</span>
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-full border border-[color:var(--eclipse-muted)]/60 text-[var(--eclipse-foreground)] font-medium text-sm transition-all duration-300 hover:border-[var(--eclipse-accent)] hover:text-[var(--eclipse-accent)] hover:-translate-y-0.5"
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Eclipse + photo */}
        <div className="relative aspect-square max-w-[420px] mx-auto w-full reveal">
          <Eclipse className="absolute inset-0" />
          <div
            className="absolute inset-[18%] rounded-full overflow-hidden border-2 z-10"
            style={{
              borderColor: "color-mix(in oklab, var(--eclipse-accent) 50%, transparent)",
              boxShadow: "var(--shadow-eclipse)",
              background:
                "linear-gradient(135deg, var(--eclipse-surface), var(--eclipse-deep))",
            }}
          >
            {/* Replace src with your uploaded photo */}
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[color:var(--eclipse-muted)]">
              your photo
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--eclipse-muted)] animate-pulse-glow">
        scroll
      </div>
    </section>
  );
}