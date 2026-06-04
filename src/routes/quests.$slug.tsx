import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { QUESTS } from "@/data/quests";

export const Route = createFileRoute("/quests/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — side quests — ansh dwivedi` },
      { name: "description", content: `notes & moments from ${params.slug.replace(/-/g, " ")}.` },
    ],
  }),
  component: QuestDetail,
});

function QuestDetail() {
  useReveal();
  const { slug } = Route.useParams();
  const quest = QUESTS.find((q) => q.slug === slug);
  if (!quest) throw notFound();
  const Icon = quest.icon;

  return (
    <article className="relative py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <Link
          to="/quests"
          className="reveal inline-flex items-center gap-2 text-xs font-medium text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-accent)] transition-colors mb-10 lowercase"
        >
          ← back to side quests
        </Link>

        <div className="reveal flex items-center gap-4 mb-6">
          <div
            className="inline-flex items-center justify-center size-14 rounded-2xl border"
            style={{
              borderColor: "color-mix(in oklab, var(--eclipse-accent) 35%, transparent)",
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--eclipse-accent) 18%, transparent), color-mix(in oklab, var(--eclipse-surface) 60%, transparent))",
              boxShadow: "0 0 24px -6px color-mix(in oklab, var(--eclipse-accent) 40%, transparent)",
            }}
          >
            <Icon className="size-6 text-[var(--eclipse-accent)]" strokeWidth={1.6} />
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight lowercase">
            {quest.title}
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h1>
        </div>

        {quest.intro && (
          <p className="reveal text-base md:text-lg text-[color:var(--eclipse-foreground)]/75 leading-relaxed mb-14 max-w-2xl lowercase">
            {quest.intro}
          </p>
        )}

        {quest.entries.length === 0 ? (
          <p className="reveal text-sm text-[color:var(--eclipse-muted)] italic lowercase">
            nothing logged here yet — entries coming soon.
          </p>
        ) : (
          <div className="space-y-14">
            {quest.entries.map((e, idx) => (
              <section
                key={e.title}
                className="reveal relative pl-6 border-l"
                style={{ borderColor: "color-mix(in oklab, var(--eclipse-accent) 30%, transparent)" }}
              >
                <div
                  className="absolute -left-[7px] top-2 size-3 rounded-full"
                  style={{
                    background: "var(--eclipse-accent)",
                    boxShadow: "0 0 12px color-mix(in oklab, var(--eclipse-accent) 70%, transparent)",
                  }}
                />
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight lowercase">
                  {e.title}
                </h2>
                <p className="mt-1 text-[11px] tracking-wider text-[color:var(--eclipse-muted)] lowercase">
                  {[e.date, e.location].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-4 text-[color:var(--eclipse-foreground)]/80 leading-relaxed lowercase">
                  {e.body}
                </p>

                {e.media && e.media.length > 0 && (
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {e.media.map((m, i) =>
                      m.type === "video" ? (
                        <video
                          key={i}
                          src={m.src}
                          controls
                          playsInline
                          className="w-full rounded-xl border border-[color:var(--eclipse-muted)]/30"
                        />
                      ) : (
                        <figure key={i} className="m-0">
                          <img
                            src={m.src}
                            alt={m.caption ?? e.title}
                            loading="lazy"
                            className="w-full rounded-xl border border-[color:var(--eclipse-muted)]/30"
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
                )}

                {(!e.media || e.media.length === 0) && (
                  <div
                    className="mt-6 rounded-xl border border-dashed p-6 text-center text-xs text-[color:var(--eclipse-muted)] lowercase"
                    style={{ borderColor: "color-mix(in oklab, var(--eclipse-muted) 40%, transparent)" }}
                  >
                    photos / videos slot — drop media for entry {idx + 1} here.
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
