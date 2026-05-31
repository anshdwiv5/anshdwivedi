export function Eclipse({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative ${className}`}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--eclipse-accent) 55%, transparent) 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />
      {/* The glowing circle */}
      <div
        className="absolute inset-[12%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, color-mix(in oklab, var(--eclipse-accent) 90%, white 10%), var(--eclipse-accent) 60%, color-mix(in oklab, var(--eclipse-surface) 70%, var(--eclipse-accent)) 100%)",
          boxShadow: "var(--shadow-eclipse)",
        }}
      />
      {/* Dark disc crossing it */}
      <div
        className="absolute inset-[20%] rounded-full"
        style={{
          background: "var(--eclipse-deep)",
          transform: "translate(18%, -8%)",
          boxShadow:
            "inset 0 0 40px color-mix(in oklab, var(--eclipse-accent) 30%, transparent)",
        }}
      />
      {/* Orbital ring */}
      <div
        className="absolute inset-[-15%] rounded-full border animate-orbit-slow"
        style={{
          borderColor:
            "color-mix(in oklab, var(--eclipse-accent) 30%, transparent)",
          borderStyle: "dashed",
        }}
      />
      <div
        className="absolute inset-[-30%] rounded-full border animate-orbit-rev"
        style={{
          borderColor:
            "color-mix(in oklab, var(--eclipse-muted) 35%, transparent)",
        }}
      />
    </div>
  );
}