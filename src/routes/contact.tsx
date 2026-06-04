import { createFileRoute } from "@tanstack/react-router";

import { useReveal } from "@/hooks/use-reveal";

const LINKEDIN_URL = "https://www.linkedin.com/in/anshdwivedi/";
const EMAIL = "anshdwiv5@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "contact — ansh dwivedi" },
      { name: "description", content: "get in touch with ansh — email, linkedin, or request a résumé." },
      { property: "og:title", content: "contact — ansh dwivedi" },
      { property: "og:description", content: "say hi." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  useReveal();
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
        <h1 className="reveal text-4xl md:text-6xl font-semibold tracking-tight lowercase">
          say <span className="text-[var(--eclipse-accent)]">hi</span>.
        </h1>
        <p className="reveal mt-6 text-base md:text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed lowercase">
          for collaborations, questions, or if you just want to swap notes on something interesting.
        </p>

        <div className="reveal mt-12 flex flex-wrap gap-3 justify-center">
          <a
            href={`mailto:${EMAIL}`}
            className="px-6 py-3 rounded-full bg-[var(--eclipse-accent)] text-[var(--eclipse-deep)] font-medium text-sm transition-all duration-300 hover:shadow-[var(--shadow-eclipse)] hover:-translate-y-0.5 lowercase"
          >
            email
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border border-[color:var(--eclipse-muted)]/60 text-[var(--eclipse-foreground)] font-medium text-sm transition-all duration-300 hover:border-[var(--eclipse-accent)] hover:text-[var(--eclipse-accent)] hover:-translate-y-0.5 lowercase"
          >
            linkedin
          </a>
        </div>
      </div>
    </section>
  );
}