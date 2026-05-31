import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about — ansh dwivedi" },
      { name: "description", content: "a little about ansh — product manager, ai tinkerer, side-quest collector." },
      { property: "og:title", content: "about — ansh dwivedi" },
      { property: "og:description", content: "product, ai, and a few side quests." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  useReveal();
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-8 lowercase">
          01 — about
        </p>
        <h1 className="reveal text-4xl md:text-6xl font-semibold tracking-tight mb-12 lowercase">
          a bit about me<span className="text-[var(--eclipse-accent)]">.</span>
        </h1>
        <div className="space-y-7 text-lg md:text-xl leading-relaxed text-[color:var(--eclipse-foreground)]/85 font-light lowercase">
          <p className="reveal">
            i'm a <span className="text-[var(--eclipse-accent)]">product manager</span> by day,
            and a tinkerer the rest of the time. i like figuring out what should exist, then
            trying very hard to make it exist well.
          </p>
          <p className="reveal">
            lately i've been deep in the ai rabbit hole — building, breaking, and shipping
            small things on the side. most of them don't work. a few do. i love the few.
          </p>
          <p className="reveal">
            outside of work i collect side quests like other people collect books — which,
            fittingly, is also a thing i do.
          </p>
        </div>

        <div className="reveal mt-14 inline-flex items-center gap-3 font-mono text-sm text-[color:var(--eclipse-muted)] lowercase">
          <span className="size-2 rounded-full bg-[var(--eclipse-accent)] animate-pulse-glow" />
          currently: based in bengaluru, building tsundoku
        </div>
      </div>
    </section>
  );
}