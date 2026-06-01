import { useEffect, useRef } from "react";

/**
 * Hero background — aurora gradient mesh + interactive particle constellation.
 * Particles drift, react to the cursor, and link up to nearby neighbours.
 * Layered with a chromatic aurora wash and a soft grid for depth.
 */
export function HeroBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, active: false };

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(110, Math.floor((width * height) / 14000));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
        hue: 240 + Math.random() * 80, // periwinkle → violet → cyan
      }));
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      const maxLink = 130;
      const maxLinkSq = maxLink * maxLink;

      // update + draw particles
      for (const p of particles) {
        // cursor repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 0.01) {
            const f = (140 - Math.sqrt(d2)) / 140;
            p.vx += (dx / Math.sqrt(d2)) * f * 0.6;
            p.vy += (dy / Math.sqrt(d2)) * f * 0.6;
          }
        }
        // gentle friction
        p.vx *= 0.985;
        p.vy *= 0.985;
        // micro-jitter so it never settles
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 80%, 78%, 0.85)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // constellation links
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxLinkSq) {
            const t = 1 - d2 / maxLinkSq;
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 80%, 72%, ${t * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Aurora gradient blobs — magenta, cyan, violet wash */}
      <div
        className="absolute -top-[20%] -left-[15%] w-[70vmax] h-[70vmax] rounded-full opacity-70 animate-aurora-a"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, #7c3aed 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-[10%] -right-[20%] w-[65vmax] h-[65vmax] rounded-full opacity-60 animate-aurora-b"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #ec4899 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute -bottom-[25%] left-[20%] w-[60vmax] h-[60vmax] rounded-full opacity-55 animate-aurora-c"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />

      {/* Faint grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--eclipse-accent) 1px, transparent 1px), linear-gradient(90deg, var(--eclipse-accent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 75%)",
        }}
      />

      {/* Interactive constellation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Bottom vignette for legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklab, var(--eclipse-deep) 70%, transparent), transparent)",
        }}
      />
    </div>
  );
}
