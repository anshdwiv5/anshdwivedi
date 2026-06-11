import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { QUESTS } from "@/data/quests";
import { ArrowLeft, ArrowRight, Check, Link as LinkIcon } from "lucide-react";

export const Route = createFileRoute("/quests/$slug")({
  head: ({ params }) => {
    const q = QUESTS.find((x) => x.id === params.slug);
    const title = q ? q.title : "quest";
    return {
      meta: [
        { title: `${title.toLowerCase()} · quest log · ansh dwivedi` },
        {
          name: "description",
          content: q?.hook ?? "a quest from ansh's archive.",
        },
        { property: "og:title", content: title.toLowerCase() },
        {
          property: "og:description",
          content: q?.hook ?? "a quest from ansh's archive.",
        },
        ...(q?.coverImage ? [{ property: "og:image", content: q.coverImage }] : []),
      ],
    };
  },
  component: QuestDetail,
});

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function QuestDetail() {
  useReveal();
  const { slug } = Route.useParams();
  const idx = QUESTS.findIndex((q) => q.id === slug);
  if (idx === -1) throw notFound();
  const quest = QUESTS[idx];
  const prev = idx > 0 ? QUESTS[idx - 1] : null;
  const next = idx < QUESTS.length - 1 ? QUESTS[idx + 1] : null;

  const [copied, setCopied] = useState(false);
  const onShare = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <article className="relative py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <Link
          to="/quests"
          className="reveal inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-accent)] transition-colors mb-10 lowercase"
        >
          <ArrowLeft className="size-3.5" /> back to quest log
        </Link>

        {/* Hero */}
        <header className="reveal">
          <div
            className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[color:var(--eclipse-foreground)]/10"
            style={{
              background: quest.coverImage
                ? `url(${quest.coverImage}) center/cover no-repeat`
                : `linear-gradient(135deg, color-mix(in oklab, var(--eclipse-accent) 14%, var(--card)), color-mix(in oklab, var(--eclipse-foreground) 6%, var(--card)))`,
            }}
          />
          <p className="mt-8 text-[11px] tracking-wider text-[color:var(--eclipse-muted)] lowercase">
            {formatDate(quest.date)}
          </p>
          <h1 className="font-display mt-3 text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] lowercase">
            {quest.title.toLowerCase()}
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
          <p className="mt-5 text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase">
            {quest.hook.toLowerCase()}
          </p>
        </header>

        {/* Story */}
        <div className="reveal mt-14 space-y-5 text-[color:var(--eclipse-foreground)]/85 leading-relaxed text-[17px]">
          {quest.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Gallery */}
        <section className="reveal mt-16">
          <p className="text-xs font-medium tracking-wider text-[color:var(--eclipse-muted)] lowercase mb-4">
            gallery
          </p>
          {quest.gallery && quest.gallery.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {quest.gallery.map((m, i) =>
                m.type === "video" ? (
                  <video
                    key={i}
                    src={m.src}
                    controls
                    playsInline
                    className="w-full rounded-xl border border-[color:var(--eclipse-foreground)]/10"
                  />
                ) : (
                  <figure key={i} className="m-0">
                    <img
                      src={m.src}
                      alt={m.caption ?? quest.title}
                      loading="lazy"
                      className="w-full rounded-xl border border-[color:var(--eclipse-foreground)]/10"
                    />
                    {m.caption && (
                      <figcaption className="mt-1 text-[11px] text-[color:var(--eclipse-muted)] lowercase">
                        {m.caption}
                      </figcaption>
                    )}
                  </figure>
                ),
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl border border-dashed border-[color:var(--eclipse-foreground)]/15 bg-[color:var(--eclipse-foreground)]/[0.02] flex items-center justify-center text-[11px] text-[color:var(--eclipse-muted)] lowercase"
                >
                  photo slot
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Takeaways */}
        {quest.takeaways.length > 0 && (
          <section className="reveal mt-16">
            <p className="text-xs font-medium tracking-wider text-[color:var(--eclipse-muted)] lowercase mb-4">
              things i'll remember
            </p>
            <ul className="space-y-2.5 text-[color:var(--eclipse-foreground)]/85 text-[15px] leading-relaxed">
              {quest.takeaways.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="text-[var(--eclipse-accent)] mt-1.5 size-1 rounded-full bg-[var(--eclipse-accent)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Share */}
        <section className="reveal mt-16 pt-8 border-t border-[color:var(--eclipse-foreground)]/10">
          <button
            onClick={onShare}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--eclipse-foreground)]/15 px-4 py-2 text-xs font-medium text-[color:var(--eclipse-foreground)]/80 hover:text-[var(--eclipse-foreground)] hover:border-[color:var(--eclipse-accent)]/50 transition-all lowercase"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-[var(--eclipse-accent)]" /> link copied
              </>
            ) : (
              <>
                <LinkIcon className="size-3.5" /> send this quest to someone
              </>
            )}
          </button>
        </section>

        {/* Prev / Next */}
        <nav className="reveal mt-12 grid grid-cols-2 gap-3">
          {prev ? (
            <Link
              to="/quests/$slug"
              params={{ slug: prev.id }}
              className="group rounded-xl border border-[color:var(--eclipse-foreground)]/10 p-4 hover:border-[color:var(--eclipse-foreground)]/25 transition-colors"
            >
              <p className="text-[11px] tracking-wider text-[color:var(--eclipse-muted)] lowercase flex items-center gap-1.5">
                <ArrowLeft className="size-3" /> previous quest
              </p>
              <p className="mt-1.5 text-sm font-medium text-[var(--eclipse-foreground)] lowercase line-clamp-2">
                {prev.title.toLowerCase()}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/quests/$slug"
              params={{ slug: next.id }}
              className="group rounded-xl border border-[color:var(--eclipse-foreground)]/10 p-4 hover:border-[color:var(--eclipse-foreground)]/25 transition-colors text-right"
            >
              <p className="text-[11px] tracking-wider text-[color:var(--eclipse-muted)] lowercase flex items-center justify-end gap-1.5">
                next quest <ArrowRight className="size-3" />
              </p>
              <p className="mt-1.5 text-sm font-medium text-[var(--eclipse-foreground)] lowercase line-clamp-2">
                {next.title.toLowerCase()}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </article>
  );
}