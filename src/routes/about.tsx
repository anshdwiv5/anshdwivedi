import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about · ansh dwivedi" },
      { name: "description", content: "a little about ansh. product manager, ai tinkerer, side-quest collector." },
      { property: "og:title", content: "about · ansh dwivedi" },
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
        <h1 className="reveal text-4xl md:text-6xl font-semibold tracking-tight mb-12 lowercase">
          a bit about me<span className="text-[var(--eclipse-accent)]">.</span>
        </h1>
        <div className="space-y-7 text-lg md:text-xl leading-relaxed text-[color:var(--eclipse-foreground)]/85 font-light lowercase">
          <p className="reveal">
            i'm a <span className="text-[var(--eclipse-accent)]">product manager</span> by day.
            the rest of the time i'm at the gym, out on a run, or building something nobody
            asked for. i like figuring out what should exist, then grinding until it actually does.
          </p>
          <p className="reveal">
            lately i've been deep in the ai rabbit hole. building stuff, breaking it,
            occasionally shipping it. most of it flops. a few things stick. i live for the
            few that stick.
          </p>
          <p className="reveal">
            i'm mostly grind and goof. i don't take much seriously, least of all myself. i
            collect side quests the way other people collect books, which, fittingly, is also a
            thing i do (ask me about the unread pile).
          </p>
          <p className="reveal">
            the curiosity is the constant: everything turns into a system if you look at it
            long enough, and i tend to keep looking after everyone else has moved on.
          </p>
        </div>

        <div className="reveal mt-14 inline-flex items-center gap-3 font-mono text-sm text-[color:var(--eclipse-muted)] lowercase">
          <span className="size-2 rounded-full bg-[var(--eclipse-accent)] animate-pulse-glow" />
          currently: based in bengaluru
        </div>
      </div>
    </section>
  );
}