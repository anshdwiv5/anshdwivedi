export function HeroBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Soft floating mesh blobs */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[70vmax] h-[70vmax] rounded-full opacity-60 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, color-mix(in oklab, var(--eclipse-accent) 35%, transparent), transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 w-[60vmax] h-[60vmax] rounded-full opacity-50 animate-float-rev"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--eclipse-surface) 95%, transparent), transparent 60%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[36vmax] h-[36vmax] rounded-full opacity-40 animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--eclipse-muted) 60%, transparent), transparent 65%)",
          filter: "blur(50px)",
          animationDelay: "-12s",
        }}
      />

      {/* Flowing animated line-mesh */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--eclipse-accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--eclipse-accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--eclipse-accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--eclipse-muted)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--eclipse-muted)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--eclipse-muted)" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Set of sweeping bezier curves */}
        <g fill="none" strokeWidth="1" filter="url(#softGlow)">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const offset = i * 60 - 120;
            return (
              <path
                key={i}
                d={`M ${-200 + offset} ${300 + i * 30}
                    C ${300 + offset} ${100 + i * 20},
                      ${900 + offset} ${700 - i * 25},
                      ${1640 + offset} ${250 + i * 40}`}
                stroke={i % 2 === 0 ? "url(#lineGrad)" : "url(#lineGrad2)"}
                strokeDasharray="6 14"
                style={{
                  animation: `dash-drift ${28 + i * 4}s linear infinite`,
                  animationDelay: `-${i * 3}s`,
                  opacity: 0.45 + (i % 3) * 0.15,
                }}
              />
            );
          })}
        </g>

        {/* Concentric arcs — orbital feel */}
        <g
          fill="none"
          stroke="var(--eclipse-accent)"
          strokeOpacity="0.18"
          strokeWidth="0.8"
        >
          <ellipse cx="1100" cy="220" rx="520" ry="180" className="animate-orbit-slow" style={{ transformOrigin: "1100px 220px" }} />
          <ellipse cx="1100" cy="220" rx="380" ry="120" className="animate-orbit-rev" style={{ transformOrigin: "1100px 220px" }} />
          <ellipse cx="320" cy="700" rx="460" ry="160" className="animate-orbit-rev" style={{ transformOrigin: "320px 700px" }} />
        </g>

        {/* Subtle particle dots */}
        <g fill="var(--eclipse-accent)">
          {[
            [180, 140, 1.6, 4],
            [420, 320, 1.2, 7],
            [780, 120, 2, 5],
            [1180, 480, 1.4, 9],
            [260, 640, 1.8, 6],
            [980, 760, 1.3, 8],
            [600, 540, 1.5, 10],
            [1320, 200, 1.1, 3],
          ].map(([cx, cy, r, d], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              style={{
                animation: `twinkle ${d}s ease-in-out infinite`,
                animationDelay: `-${i * 0.7}s`,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
