import { createFileRoute, Link } from "@tanstack/react-router";

import { HeroBackground } from "@/components/site/hero-background";
import { PunchBag } from "@/components/site/punch-bag";
import { useReveal } from "@/hooks/use-reveal";
import portrait from "@/assets/ansh-portrait.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ansh dwivedi" },
      {
        name: "description",
        content: "ansh dwivedi. product, ai, and a pile of side quests.",
      },
      { property: "og:title", content: "ansh dwivedi" },
      { property: "og:description", content: "product, ai, and a pile of side quests." },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <>
      {/* ---------- HERO — apple-style product moment ---------- */}
      <section className="relative overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto px-5 md:px-8 pt-16 pb-12 md:pt-28 md:pb-20 relative z-10">
          <div className="reveal mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--eclipse-foreground)]/15 bg-[color:var(--eclipse-surface)]/70 backdrop-blur px-3 py-1 text-[11px] font-medium tracking-wide text-[color:var(--eclipse-muted)] lowercase">
              <span className="size-1.5 rounded-full bg-[var(--eclipse-accent)] animate-pulse-glow" />
              now · apm @ flipkart · bengaluru
            </span>
            <h1 className="font-display mt-7 md:mt-10 text-[clamp(2.75rem,10vw,7rem)] leading-[0.95] tracking-[-0.03em] text-[var(--eclipse-foreground)] lowercase">
              take the scenic route.<br />
              <em className="not-italic font-display italic text-[var(--eclipse-accent)]">
                go the distance.
              </em>
            </h1>
            <p className="reveal mt-6 md:mt-7 mx-auto max-w-xl text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase">
              i'm ansh. curious about products, people, incentives, systems, and the weird
              ways they interact.
            </p>
            <div className="reveal mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/work"
                className="inline-flex items-center justify-center rounded-full bg-[var(--eclipse-foreground)] px-5 py-2.5 text-sm font-medium text-[var(--eclipse-surface)] hover:bg-[color:var(--eclipse-foreground)]/85 transition-colors lowercase"
              >
                see my work →
              </Link>
              <Link
                to="/building"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--eclipse-foreground)]/15 bg-[color:var(--eclipse-surface)]/70 backdrop-blur px-5 py-2.5 text-sm font-medium text-[var(--eclipse-foreground)] hover:bg-[color:var(--eclipse-surface)] transition-colors lowercase"
              >
                fun projects
              </Link>
              <Link
                to="/quests"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--eclipse-foreground)]/15 bg-[color:var(--eclipse-surface)]/70 backdrop-blur px-5 py-2.5 text-sm font-medium text-[var(--eclipse-foreground)] hover:bg-[color:var(--eclipse-surface)] transition-colors lowercase"
              >
                side quests
              </Link>
            </div>
          </div>

          {/* portrait — clean, centered, no rings, drops a soft copper shadow */}
          <div className="reveal mx-auto mt-14 md:mt-20 relative w-[72vw] max-w-[340px] md:max-w-[420px] aspect-square">
            <div
              className="absolute inset-[-8%] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--eclipse-accent) 35%, transparent), transparent 70%)",
                filter: "blur(28px)",
              }}
            />
            <img
              src={portrait}
              alt="ansh dwivedi"
              loading="eager"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_30px_45px_rgba(184,115,51,0.30)]"
            />
            {/* goofy boxing-glove tag */}
            <div
              className="absolute -right-2 md:right-4 top-6 md:top-12 z-20 rotate-6 select-none rounded-2xl bg-[var(--eclipse-foreground)] px-3 py-1.5 text-[11px] font-medium text-[var(--eclipse-surface)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] lowercase font-display italic"
            >
              yo, adrian
            </div>
            <PunchBag />
          </div>
        </div>

        {/* training-montage marquee */}
        <div className="relative z-10 border-y border-[color:var(--eclipse-foreground)]/10 bg-[color:var(--eclipse-surface)]/60 backdrop-blur overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee py-3 text-sm font-medium text-[color:var(--eclipse-foreground)]/65 lowercase">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex shrink-0 items-center">
                {[
                  "this should be simple",
                  "why isn't it simple",
                  "okay maybe it's hard",
                  "never mind we are rebuilding everything",
                ].map((t) => (
                  <span key={t} className="mx-6 inline-flex items-center gap-3">
                    <span className="size-1 rounded-full bg-[var(--eclipse-accent)]" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BENTO CARD GRID ---------- */}
      <section className="relative">
        <div className="container mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="reveal mb-10 md:mb-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-[color:var(--eclipse-accent)] uppercase">
                the highlight reel
              </p>
              <h2 className="font-display mt-2 text-3xl md:text-5xl tracking-[-0.02em] lowercase">
                a little bit of everything.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[minmax(180px,_auto)]">
            {/* About — large feature tile */}
            <Link
              to="/about"
              className="reveal group relative md:col-span-4 md:row-span-2 overflow-hidden rounded-3xl border bg-[var(--eclipse-surface)] p-7 md:p-10 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
              style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)" }}
            >
              <span className="text-[11px] font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">about</span>
              <h3 className="font-display mt-3 text-3xl md:text-5xl tracking-[-0.02em] lowercase leading-[1.05]">
                product by day, tinkerer<br/>the rest of the time.
              </h3>
              <p className="mt-5 max-w-md text-sm md:text-base text-[color:var(--eclipse-foreground)]/65 lowercase">
                figuring out what should exist, then trying very hard to make it exist well.
              </p>
              <span className="absolute bottom-7 right-7 md:bottom-10 md:right-10 text-sm font-medium text-[var(--eclipse-foreground)] lowercase opacity-70 group-hover:opacity-100 transition">
                read more →
              </span>
            </Link>

            {/* Work tile */}
            <Link
              to="/work"
              className="reveal group relative md:col-span-2 overflow-hidden rounded-3xl border bg-[var(--eclipse-surface)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
              style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)" }}
            >
              <span className="text-[11px] font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">work</span>
              <h3 className="font-display mt-2 text-2xl md:text-3xl tracking-[-0.02em] lowercase">
                apm @ flipkart.
              </h3>
              <p className="mt-2 text-sm text-[color:var(--eclipse-foreground)]/65 lowercase">
                supply chain products for b2b commerce.
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-[var(--eclipse-foreground)] lowercase opacity-70 group-hover:opacity-100 transition">
                full timeline →
              </span>
            </Link>

            {/* Building tile */}
            <Link
              to="/building"
              className="reveal group relative md:col-span-2 overflow-hidden rounded-3xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
              style={{
                borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)",
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--eclipse-accent) 16%, var(--eclipse-surface)) , var(--eclipse-surface))",
              }}
            >
              <span className="text-[11px] font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">building</span>
              <h3 className="font-display mt-2 text-2xl md:text-3xl tracking-[-0.02em] lowercase">
                shipping on the side.
              </h3>
              <p className="mt-2 text-sm text-[color:var(--eclipse-foreground)]/65 lowercase">
                small things. some of them work.
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-[var(--eclipse-foreground)] lowercase opacity-70 group-hover:opacity-100 transition">
                see what's live →
              </span>
            </Link>

            {/* Quests tile — wider */}
            <Link
              to="/quests"
              className="reveal group relative md:col-span-3 overflow-hidden rounded-3xl border bg-[var(--eclipse-foreground)] p-7 md:p-8 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
              style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 80%, transparent)" }}
            >
              <span className="text-[11px] font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">side quests</span>
              <h3 className="font-display mt-3 text-2xl md:text-4xl tracking-[-0.02em] text-[var(--eclipse-surface)] lowercase">
                ran a half-marathon. ran 10k on a frozen lake. still going.
              </h3>
              <p className="mt-3 text-sm text-[color:var(--eclipse-surface)]/65 lowercase">
                detours, hobbies, and one-offs i keep collecting.
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-[var(--eclipse-accent)] lowercase">
                open the quest log →
              </span>
            </Link>

            {/* Contact tile */}
            <Link
              to="/contact"
              className="reveal group relative md:col-span-3 overflow-hidden rounded-3xl border bg-[var(--eclipse-surface)] p-7 md:p-8 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
              style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)" }}
            >
              <span className="text-[11px] font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">say hi</span>
              <h3 className="font-display mt-3 text-2xl md:text-4xl tracking-[-0.02em] lowercase">
                "it ain't about how hard you hit. it's about how hard you can get hit and keep moving forward."
              </h3>
              <span className="mt-4 inline-block text-sm font-medium text-[var(--eclipse-foreground)] lowercase opacity-70 group-hover:opacity-100 transition">
                let's talk →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
