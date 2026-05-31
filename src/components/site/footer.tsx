import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(t);
    };
    tick();
    const i = setInterval(tick, 30_000);
    return () => clearInterval(i);
  }, []);

  return (
    <footer className="relative border-t" style={{ borderColor: "color-mix(in oklab, var(--eclipse-muted) 25%, transparent)" }}>
      <div className="container mx-auto px-6 md:px-10 py-10 flex flex-wrap items-center justify-between gap-6">
        <div className="font-mono text-xs text-[color:var(--eclipse-muted)]">
          © {new Date().getFullYear()} Ansh Dwivedi · made with too many side quests
        </div>
        <div className="font-mono text-xs text-[color:var(--eclipse-muted)] flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--eclipse-accent)] animate-pulse-glow" />
          Bengaluru {time}
        </div>
      </div>
    </footer>
  );
}