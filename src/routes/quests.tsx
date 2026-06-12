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

// Bento rhythm across a 6-col grid: wide / narrow mix so tiles aren't uniform.
const SPANS = [
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-3",
];
const FEATURE = [true, false, false, true, false, false];

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
        <header className="relative">
          <button
            onClick={surpriseMe}
            className="group absolute right-0 top-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-foreground)] transition-colors lowercase"
          >
            <Shuffle className="size-3 transition-transform group-hover:rotate-12" />
            surprise me
          </button>
          <div className="max-w-3xl pr-24">
            <h1 className="reveal font-display text-5xl md:text-7xl tracking-[-0.03em] lowercase leading-[0.95]">
              quest log
              <span className="text-[var(--eclipse-accent)]">.</span>
            </h1>
            <p className="reveal mt-6 text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase max-w-xl">
              a collection of rabbit holes worth falling into. curiosity is often a better
              compass than certainty.
            </p>
          </div>
        </header>

        {/* Bento grid — varied tile sizes, homepage highlight-reel style */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[minmax(200px,auto)]">
          {QUESTS.map((q, i) => (
            <QuestCard
              key={q.id}
              quest={q}
              index={i}
              span={SPANS[i % SPANS.length]}
              feature={FEATURE[i % FEATURE.length]}
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
  span,
  feature,
  onOpen,
}: {
  quest: Quest;
  index: number;
  span: string;
  feature: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{
        transitionDelay: `${index * 40}ms`,
        borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)",
        ...(feature
          ? {
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--eclipse-accent) 16%, var(--eclipse-surface)), var(--eclipse-surface))",
            }
          : {}),
      }}
      className={`reveal group relative flex flex-col text-left rounded-3xl border bg-[var(--eclipse-surface)] overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-eclipse)] cursor-pointer ${span}`}
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
        <h3
          className={`font-display mt-3 tracking-[-0.02em] leading-[1.1] text-[var(--eclipse-foreground)] lowercase ${
            feature ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
          }`}
        >
          {quest.title.toLowerCase()}
        </h3>
        <p className="mt-3 text-sm text-[color:var(--eclipse-foreground)]/65 leading-relaxed lowercase">
          {quest.hook.toLowerCase()}
        </p>
        <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--eclipse-foreground)] lowercase opacity-70 group-hover:opacity-100 transition">
          read more <ArrowUpRight className="size-3.5 text-[var(--eclipse-accent)]" />
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
