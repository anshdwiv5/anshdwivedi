/**
 * Apple-style hero backdrop — calm, light, subtle.
 * Two soft gradient washes + a faint dot grid. No animations that fight the content.
 */
export function HeroBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* warm wash from the top */}
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[120vmax] h-[80vmax] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--eclipse-accent) 18%, transparent), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* cool wash from the bottom-left for balance */}
      <div
        className="absolute -bottom-[30%] -left-[10%] w-[80vmax] h-[60vmax] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, #c9b99a 35%, transparent), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      {/* faint dot grid, masked to the centre */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklab, var(--eclipse-foreground) 22%, transparent) 1px, transparent 1.4px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 85%)",
        }}
      />
    </div>
  );
}