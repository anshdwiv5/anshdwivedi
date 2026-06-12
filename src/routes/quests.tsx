import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { QUESTS, type Quest } from "@/data/quests";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Shuffle, ArrowUpRight, Compass, Mountain, Calendar } from "lucide-react";

export const Route = createFileRoute("/quests")({
  head: () => ({
    meta: [
      { title: "quest log · ansh dwivedi" },
      {
        name: "description",
        content:
          "things i did for no practical reason whatsoever. some became stories, some became skills, some became mistakes.",
      },
      { property: "og:title", content: "quest log · ansh dwivedi" },
      {
        property: "og:description",
        content: "a well-kept archive of detours, experiments, and stories.",
      },
    ],
  }),
  component: QuestsPage,
});

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function QuestsPage() {
  useReveal();
  const navigate = useNavigate();
  const [open, setOpen] = useState<Quest | null>(null);

  const surpriseMe = () => {
    const q = QUESTS[Math.floor(Math.random() * QUESTS.length)];
    setOpen(q);
  };

  const [featured, ...rest] = QUESTS;
  const total = QUESTS.length;
  const latestYear = QUESTS
    .map((q) => new Date(q.date).getFullYear())
    .filter((y) => !Number.isNaN(y))
    .sort((a, b) => b - a)[0];

  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        {/* Hero */}
        <header className="max-w-3xl">
          <p className="reveal text-xs font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">
            the field journal
          </p>
          <h1 className="reveal font-display mt-3 text-5xl md:text-7xl tracking-[-0.03em] lowercase leading-[0.95]">
            quest log
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
          <p className="reveal mt-6 text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase max-w-xl">
            a collection of rabbit holes worth falling into. proof that curiosity is often a
            better compass than certainty.
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={surpriseMe}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--eclipse-foreground)] px-4 py-2 text-xs font-medium text-[var(--eclipse-surface)] hover:bg-[color:var(--eclipse-foreground)]/85 transition-colors lowercase"
            >
              <Shuffle className="size-3.5 transition-transform group-hover:rotate-12" />
              surprise me
            </button>
            <span className="text-[11px] tracking-wider text-[color:var(--eclipse-muted)] lowercase">
              {total} entries · last updated {latestYear}
            </span>
          </div>
        </header>

        {/* Featured quest — apple-style big band */}
        {featured && (
          <button
            type="button"
            onClick={() => setOpen(featured)}
            className="reveal group relative mt-16 md:mt-20 w-full text-left overflow-hidden rounded-[2rem] border bg-[var(--eclipse-foreground)] p-7 md:p-12 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)]"
            style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 80%, transparent)" }}
          >
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 90% 0%, color-mix(in oklab, var(--eclipse-accent) 35%, transparent), transparent 60%)",
              }}
            />
            <div className="relative grid md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-[var(--eclipse-accent)] uppercase">
                  <Mountain className="size-3.5" /> featured quest
                </span>
                <h2 className="font-display mt-4 text-3xl md:text-6xl tracking-[-0.025em] leading-[0.98] text-[var(--eclipse-surface)] lowercase">
                  {featured.title.toLowerCase()}.
                </h2>
                <p className="mt-5 max-w-xl text-base md:text-lg text-[color:var(--eclipse-surface)]/70 leading-relaxed lowercase">
                  {featured.hook.toLowerCase()}
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--eclipse-accent)] lowercase">
                  open the story <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </button>
        )}

        {/* Section header */}
        <div className="reveal mt-20 md:mt-24 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-[color:var(--eclipse-accent)] uppercase">
              more detours
            </p>
            <h3 className="font-display mt-2 text-3xl md:text-4xl tracking-[-0.02em] lowercase">
              everything else worth telling.
            </h3>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((q, i) => (
            <QuestCard key={q.id} quest={q} index={i} onOpen={() => setOpen(q)} />
          ))}
        </div>

        {/* Timeline / index list — gives the page a "log" feel */}
        <section className="reveal mt-24 md:mt-32">
          <p className="text-xs font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase flex items-center gap-2">
            <Calendar className="size-3.5" /> the index
          </p>
          <h3 className="font-display mt-3 text-3xl md:text-4xl tracking-[-0.02em] lowercase">
            all quests, by date.
          </h3>
          <ul className="mt-8 divide-y divide-[color:var(--eclipse-foreground)]/10 border-y border-[color:var(--eclipse-foreground)]/10">
            {QUESTS.map((q) => (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => setOpen(q)}
                  className="group w-full flex items-center justify-between gap-6 py-4 md:py-5 text-left hover:bg-[color:var(--eclipse-foreground)]/[0.02] transition-colors px-2 -mx-2 rounded-lg"
                >
                  <span className="font-mono text-[11px] tracking-wider text-[color:var(--eclipse-muted)] shrink-0 w-24 lowercase">
                    {formatDate(q.date)}
                  </span>
                  <span className="font-display text-base md:text-xl tracking-tight lowercase flex-1 truncate">
                    {q.title.toLowerCase()}
                  </span>
                  <ArrowUpRight className="size-4 text-[color:var(--eclipse-muted)] group-hover:text-[var(--eclipse-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer ethos card */}
        <div
          className="reveal mt-20 md:mt-24 rounded-3xl border bg-[var(--eclipse-surface)] p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
          style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)" }}
        >
          <Compass className="size-10 md:size-12 text-[var(--eclipse-accent)] shrink-0" />
          <div>
            <p className="font-display text-2xl md:text-3xl tracking-[-0.02em] lowercase leading-tight">
              "the trail is not always the path. but it always teaches you something."
            </p>
            <p className="mt-3 text-sm text-[color:var(--eclipse-foreground)]/60 lowercase">
              have a quest i should try? send it over — the list is always open.
            </p>
          </div>
        </div>
      </div>

      <QuestModal
        quest={open}
        onClose={() => setOpen(null)}
        onFullPage={(id) => {
          setOpen(null);
          navigate({ to: "/quests/$slug", params: { slug: id } });
        }}
      />
    </section>
  );
}

function QuestCard({
  quest,
  index,
  onOpen,
}: {
  quest: Quest;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{
        transitionDelay: `${index * 40}ms`,
        borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)",
      }}
      className="reveal group relative flex flex-col text-left rounded-3xl border bg-[var(--eclipse-surface)] overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)] cursor-pointer"
    >
      {quest.coverImage && (
        <div
          className="aspect-[16/10] w-full"
          style={{ background: `url(${quest.coverImage}) center/cover no-repeat` }}
        />
      )}
      <div className="p-7 md:p-8 flex flex-col flex-1">
        <span className="text-[11px] font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">
          {formatDate(quest.date)}
        </span>
        <h3 className="font-display mt-3 text-2xl md:text-3xl tracking-[-0.02em] leading-[1.1] text-[var(--eclipse-foreground)] lowercase">
          {quest.title.toLowerCase()}
        </h3>
        <p className="mt-3 text-sm text-[color:var(--eclipse-foreground)]/65 leading-relaxed lowercase">
          {quest.hook.toLowerCase()}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--eclipse-foreground)] lowercase opacity-70 group-hover:opacity-100 transition">
          open quest <ArrowUpRight className="size-3.5 text-[var(--eclipse-accent)]" />
        </span>
      </div>
    </button>
  );
}

function QuestModal({
  quest,
  onClose,
  onFullPage,
}: {
  quest: Quest | null;
  onClose: () => void;
  onFullPage: (id: string) => void;
}) {
  return (
    <Dialog open={!!quest} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto p-0 gap-0 bg-card border-[color:var(--eclipse-foreground)]/10">
        {quest && (
          <>
            <div
              className="aspect-[16/9] w-full"
              style={{
                background: quest.coverImage
                  ? `url(${quest.coverImage}) center/cover no-repeat`
                  : `linear-gradient(135deg, color-mix(in oklab, var(--eclipse-accent) 14%, var(--card)), color-mix(in oklab, var(--eclipse-foreground) 6%, var(--card)))`,
              }}
            />
            <div className="p-6 md:p-8 space-y-5">
              <p className="text-[11px] tracking-wider text-[color:var(--eclipse-muted)] lowercase">
                {formatDate(quest.date)}
              </p>
              <DialogTitle className="font-display text-2xl md:text-3xl tracking-tight leading-tight lowercase">
                {quest.title.toLowerCase()}
              </DialogTitle>
              <DialogDescription className="text-base text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase">
                {quest.hook.toLowerCase()}
              </DialogDescription>
              <div className="space-y-3 text-[color:var(--eclipse-foreground)]/80 leading-relaxed text-[15px]">
                {quest.story.slice(0, 2).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {quest.takeaways.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs font-medium tracking-wider text-[color:var(--eclipse-muted)] lowercase mb-3">
                    things i'll remember
                  </p>
                  <ul className="space-y-1.5 text-sm text-[color:var(--eclipse-foreground)]/75">
                    {quest.takeaways.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-[var(--eclipse-accent)]">·</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-[color:var(--eclipse-foreground)]/10">
                <button
                  onClick={() => onFullPage(quest.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--eclipse-accent)] hover:opacity-80 transition-opacity lowercase"
                >
                  open full page <ArrowUpRight className="size-3.5" />
                </button>
                <button
                  onClick={onClose}
                  className="text-xs text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-foreground)] transition-colors lowercase"
                >
                  close
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
