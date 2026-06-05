import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/building/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} · building · ansh dwivedi` },
      { name: "description", content: `notes on ${params.slug}.` },
    ],
  }),
  component: ProjectPostPage,
});

function ProjectPostPage() {
  useReveal();
  const { slug } = Route.useParams();

  return (
    <article className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <Link
          to="/building"
          className="reveal inline-flex items-center gap-2 font-mono text-xs text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-accent)] transition-colors mb-10 lowercase"
        >
          ← back to building
        </Link>

        {/* H1 — replace with your post title */}
        <h1 className="reveal text-4xl md:text-6xl font-semibold tracking-tight mb-4 lowercase">
          {slug}
          <span className="text-[var(--eclipse-accent)]">.</span>
        </h1>
        <p className="reveal font-mono text-xs text-[color:var(--eclipse-muted)] mb-14 lowercase">
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).toLowerCase()} · draft
        </p>

        <div className="space-y-8 text-[color:var(--eclipse-foreground)]/85 leading-relaxed lowercase">
          {/* normal text */}
          <p className="reveal text-lg">
            placeholder body text. swap this with the opening paragraph for your post. what
            the project is, why you're building it, and what you're hoping it becomes.
          </p>

          {/* H2 */}
          <h2 className="reveal text-2xl md:text-3xl font-semibold tracking-tight pt-6 lowercase">
            heading 2 placeholder
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h2>
          <p className="reveal">
            placeholder normal paragraph under an h2. talk about the problem, the inspiration,
            or the architecture, whatever fits the section.
          </p>

          {/* H3 */}
          <h3 className="reveal text-xl md:text-2xl font-semibold tracking-tight pt-4 lowercase">
            heading 3 placeholder
          </h3>
          <p className="reveal">
            another placeholder paragraph for a sub-section under an h3.
          </p>

          {/* Sub heading (small caps mono) */}
          <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] pt-4 lowercase">
            sub heading placeholder
          </p>
          <p className="reveal">
            placeholder paragraph following a sub-heading. use this for smaller asides,
            captions, or callouts.
          </p>

          {/* Another H2 + body */}
          <h2 className="reveal text-2xl md:text-3xl font-semibold tracking-tight pt-6 lowercase">
            another section
            <span className="text-[var(--eclipse-accent)]">.</span>
          </h2>
          <p className="reveal">
            keep adding paragraphs, headings, and sub-headings as you need. all text is
            lowercase by convention, keep it that way.
          </p>
        </div>
      </div>
    </article>
  );
}
