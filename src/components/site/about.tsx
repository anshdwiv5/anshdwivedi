export function About() {
  return (
    <section id="about" className="relative py-32 md:py-40">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-8">
          01 — about
        </p>
        <div className="space-y-7 text-xl md:text-2xl leading-relaxed text-[color:var(--eclipse-foreground)]/85 font-light">
          <p className="reveal">
            I'm a <span className="text-[var(--eclipse-accent)]">product manager</span> by day,
            and a tinkerer the rest of the time. I like figuring out what
            should exist, then trying very hard to make it exist well.
          </p>
          <p className="reveal">
            Lately I've been deep in the AI rabbit hole — building, breaking,
            and shipping small things on the side. Most of them don't work.
            A few do. I love the few.
          </p>
          <p className="reveal">
            Outside of work I collect side quests like other people collect
            books — which, fittingly, is also a thing I do.
          </p>
        </div>

        <div className="reveal mt-14 inline-flex items-center gap-3 font-mono text-sm text-[color:var(--eclipse-muted)]">
          <span className="size-2 rounded-full bg-[var(--eclipse-accent)] animate-pulse-glow" />
          currently: based in Bengaluru, building Tsundoku
        </div>
      </div>
    </section>
  );
}