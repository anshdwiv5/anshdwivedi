import { Link } from "@tanstack/react-router";

export function ComingSoon({ kicker, note }: { kicker: string; note?: string }) {
  return (
    <section className="relative min-h-[60vh] flex items-center py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
        <p className="reveal text-xs font-medium tracking-[0.2em] text-[color:var(--eclipse-accent)] uppercase">
          {kicker}
        </p>
        <h1 className="reveal font-display mt-4 text-5xl md:text-7xl tracking-[-0.03em] lowercase">
          uploading soon
          <span className="text-[var(--eclipse-accent)]">!</span>
        </h1>
        {note && (
          <p className="reveal mt-6 mx-auto max-w-md text-base md:text-lg text-[color:var(--eclipse-foreground)]/65 leading-relaxed lowercase">
            {note}
          </p>
        )}
        <div className="reveal mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--eclipse-foreground)] px-5 py-2.5 text-sm font-medium text-[var(--eclipse-surface)] hover:bg-[color:var(--eclipse-foreground)]/85 transition-colors lowercase"
          >
            ← back home
          </Link>
        </div>
      </div>
    </section>
  );
}
