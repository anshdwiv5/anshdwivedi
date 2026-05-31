import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { requestResume } from "@/lib/resume.functions";

const LINKEDIN_URL = "https://www.linkedin.com/in/anshdwivedi/"; // edit me
const EMAIL = "anshdwiv5@gmail.com"; // edit me

export function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="relative py-32 md:py-40 bg-[color:var(--eclipse-surface)]/30">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-6">
          04 — contact
        </p>
        <h2 className="reveal text-4xl md:text-6xl font-semibold tracking-tight">
          Say <span className="text-[var(--eclipse-accent)]">hi</span>.
        </h2>
        <p className="reveal mt-6 text-lg text-[color:var(--eclipse-foreground)]/70 leading-relaxed">
          For collaborations, questions, or if you just want to swap notes on
          something interesting.
        </p>

        <div className="reveal mt-12 flex flex-wrap gap-3 justify-center">
          <a
            href={`mailto:${EMAIL}`}
            className="px-6 py-3 rounded-full bg-[var(--eclipse-accent)] text-[var(--eclipse-deep)] font-medium text-sm transition-all duration-300 hover:shadow-[var(--shadow-eclipse)] hover:-translate-y-0.5"
          >
            Email
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border border-[color:var(--eclipse-muted)]/60 text-[var(--eclipse-foreground)] font-medium text-sm transition-all duration-300 hover:border-[var(--eclipse-accent)] hover:text-[var(--eclipse-accent)] hover:-translate-y-0.5"
          >
            LinkedIn
          </a>
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 rounded-full border border-[color:var(--eclipse-muted)]/60 text-[var(--eclipse-foreground)] font-medium text-sm transition-all duration-300 hover:border-[var(--eclipse-accent)] hover:text-[var(--eclipse-accent)] hover:-translate-y-0.5"
          >
            Request résumé
          </button>
        </div>
      </div>

      <ResumeDialog open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function ResumeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const submit = useServerFn(requestResume);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("That doesn't look like a valid email.");
      return;
    }
    setState("sending");
    try {
      await submit({ data: { email: trimmed } });
      setState("done");
    } catch (err) {
      console.error(err);
      setState("error");
      setError("Something broke on our end. Try again in a moment.");
    }
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      setEmail("");
      setState("idle");
      setError(null);
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      style={{ background: "color-mix(in oklab, var(--eclipse-deep) 70%, transparent)" }}
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border p-8 animate-in fade-in zoom-in-95 duration-300"
        style={{
          borderColor: "color-mix(in oklab, var(--eclipse-accent) 30%, transparent)",
          background: "var(--eclipse-surface)",
          boxShadow: "var(--shadow-eclipse)",
        }}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-[color:var(--eclipse-muted)] hover:text-[var(--eclipse-foreground)] text-xl"
          aria-label="Close"
        >
          ×
        </button>

        {state === "done" ? (
          <div className="text-center py-4">
            <div className="text-3xl mb-4">✦</div>
            <h3 className="text-xl font-semibold">Thanks —</h3>
            <p className="mt-3 text-[color:var(--eclipse-foreground)]/75 text-sm leading-relaxed">
              Ansh will get your résumé over to you shortly.
            </p>
            <button
              onClick={close}
              className="mt-6 font-mono text-xs uppercase tracking-wider text-[var(--eclipse-accent)] hover:underline"
            >
              close
            </button>
          </div>
        ) : (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--eclipse-accent)] mb-3">
              résumé request
            </p>
            <h3 className="text-2xl font-semibold tracking-tight">
              Drop your email.
            </h3>
            <p className="mt-2 text-sm text-[color:var(--eclipse-foreground)]/65">
              I'll send my résumé over.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@somewhere.com"
                className="w-full px-4 py-3 rounded-lg bg-[color:var(--eclipse-deep)]/60 border outline-none transition-colors focus:border-[var(--eclipse-accent)]"
                style={{
                  borderColor: "color-mix(in oklab, var(--eclipse-muted) 50%, transparent)",
                  color: "var(--eclipse-foreground)",
                }}
              />
              {error && (
                <p className="text-xs text-red-300/90 font-mono">{error}</p>
              )}
              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full px-6 py-3 rounded-lg bg-[var(--eclipse-accent)] text-[var(--eclipse-deep)] font-medium text-sm transition-all duration-300 hover:shadow-[var(--shadow-eclipse)] disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Request résumé"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}