import { useEffect, useRef, useState } from "react";

// Global, always-additive punch counter shared across every visitor. Backed by
// a free tokenless counter service so the SPA needs no backend of its own.
const COUNTER_BASE = "https://abacus.jasoncameron.dev";
const COUNTER_NS = "anshdwivedi-com";
const COUNTER_KEY = "punches";

function formatCount(n: number | null) {
  if (n === null) return "…";
  return n.toLocaleString("en-US");
}

export function PunchBag() {
  const [count, setCount] = useState<number | null>(null);
  const [hitting, setHitting] = useState(false);
  const hitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${COUNTER_BASE}/get/${COUNTER_NS}/${COUNTER_KEY}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && data && typeof data.value === "number") setCount(data.value);
        else if (alive) setCount(0);
      })
      .catch(() => {
        if (alive) setCount(0);
      });
    return () => {
      alive = false;
      if (hitTimer.current) clearTimeout(hitTimer.current);
    };
  }, []);

  const punch = () => {
    // Optimistic bump so the click always feels instant, even offline.
    setCount((c) => (c === null ? 1 : c + 1));
    setHitting(true);
    if (hitTimer.current) clearTimeout(hitTimer.current);
    hitTimer.current = setTimeout(() => setHitting(false), 360);

    fetch(`${COUNTER_BASE}/hit/${COUNTER_NS}/${COUNTER_KEY}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.value === "number") setCount(data.value);
      })
      .catch(() => {
        /* keep the optimistic value if the network blips */
      });
  };

  return (
    <button
      type="button"
      onClick={punch}
      aria-label="punch the bag"
      className="group absolute -left-2 md:left-2 bottom-4 md:bottom-10 z-20 flex flex-col items-center gap-1.5 select-none outline-none"
    >
      <span
        className={`text-3xl md:text-4xl leading-none transition-transform ${
          hitting ? "animate-punch-hit" : "animate-punch group-hover:scale-110"
        }`}
        aria-hidden
      >
        🥊
      </span>
      <span className="rounded-full bg-[var(--eclipse-foreground)] px-2.5 py-1 text-[10px] md:text-[11px] font-medium text-[var(--eclipse-surface)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] lowercase tabular-nums whitespace-nowrap">
        {formatCount(count)} punches
      </span>
      <span className="text-[9px] md:text-[10px] font-medium text-[color:var(--eclipse-muted)] opacity-0 group-hover:opacity-100 transition-opacity lowercase">
        hit me
      </span>
    </button>
  );
}
