import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { QUESTS, type Quest } from "@/data/quests";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Shuffle, ArrowUpRight } from "lucide-react";

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

  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        {/* Hero */}
        <header className="max-w-2xl">
          <p className="reveal text-[11px] font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">
            quest log
          </p>
          <h1 className="reveal font-display mt-4 text-5xl md:text-7xl tracking-[-0.03em] lowercase leading-[0.95]">
            quest log
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
          <p className="reveal mt-6 text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase">
            things i did for no practical reason whatsoever.
          </p>
          <div className="reveal mt-4 space-y-1 text-[color:var(--eclipse-foreground)]/65 lowercase">
            <p>some became stories.</p>
            <p>some became skills.</p>
            <p>some became mistakes.</p>
            <p className="text-[color:var(--eclipse-foreground)]/90">all worth it.</p>
          </div>
          <p className="reveal mt-8 text-sm text-[color:var(--eclipse-muted)] lowercase">
            17 quests completed. many more pending.
          </p>
          <div className="reveal mt-6">
            <button
              onClick={surpriseMe}
              className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--eclipse-foreground)]/15 bg-[color:var(--eclipse-foreground)]/[0.02] px-4 py-2 text-xs font-medium text-[color:var(--eclipse-foreground)]/80 hover:text-[var(--eclipse-foreground)] hover:border-[color:var(--eclipse-accent)]/50 hover:bg-[color:var(--eclipse-accent)]/[0.06] transition-all lowercase"
            >
              <Shuffle className="size-3.5 transition-transform group-hover:rotate-12" />
              surprise me
            </button>
          </div>
        </header>

        {/* Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {QUESTS.map((q, i) => (
            <QuestCard
              key={q.id}
              quest={q}
              index={i}
              onOpen={() => setOpen(q)}
            />
          ))}
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
      style={{ transitionDelay: `${index * 40}ms` }}
      className="reveal group relative flex flex-col text-left rounded-2xl border border-[color:var(--eclipse-foreground)]/10 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--eclipse-foreground)]/20 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklab,var(--eclipse-foreground)_25%,transparent)] cursor-pointer"
    >
      <div
        className="aspect-[4/3] w-full overflow-hidden"
        style={{
          background: quest.coverImage
            ? `url(${quest.coverImage}) center/cover no-repeat`
            : `linear-gradient(135deg, color-mix(in oklab, var(--eclipse-accent) 12%, var(--card)), color-mix(in oklab, var(--eclipse-foreground) 6%, var(--card)))`,
        }}
      >
        {!quest.coverImage && (
          <div className="h-full w-full flex items-end p-5">
            <span className="font-display text-5xl text-[color:var(--eclipse-foreground)]/15 lowercase">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
        <p className="text-[11px] tracking-wider text-[color:var(--eclipse-muted)] lowercase">
          {formatDate(quest.date)}
        </p>
        <h3 className="font-display text-xl md:text-2xl tracking-tight leading-snug text-[var(--eclipse-foreground)] lowercase">
          {quest.title.toLowerCase()}
        </h3>
        <p className="text-sm text-[color:var(--eclipse-foreground)]/65 leading-relaxed lowercase">
          {quest.hook.toLowerCase()}
        </p>
        <div className="mt-auto pt-3 flex items-center gap-1.5 text-xs font-medium text-[color:var(--eclipse-accent)] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 lowercase">
          open quest <ArrowUpRight className="size-3.5" />
        </div>
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

// avoid unused import warnings
void Link;
void useEffect;