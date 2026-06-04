import { useEffect, useRef } from "react";

/**
 * Hero background — playful "liquid universe":
 * gooey colour blobs that follow the cursor + a drifting starfield + click ripples.
 * Fully interactive on desktop & touch, lightweight on mobile.
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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)").matches;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    type Star = { x: number; y: number; r: number; tw: number; hue: number };
    type Ripple = { x: number; y: number; r: number; life: number };
    let stars: Star[] = [];
    const ripples: Ripple[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(isCoarse ? 60 : 130, Math.floor((width * height) / 16000));
      stars = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2,
        hue: 220 + Math.random() * 110,
      }));
      // seed pointer center so it animates in nicely on load
      pointer.tx = width / 2;
      pointer.ty = height / 2;
      if (!pointer.active) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };

    const setPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = clientX - rect.left;
      pointer.ty = clientY - rect.top;
      pointer.active = true;
    };
    const onMove = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) setPointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.tx = width / 2;
      pointer.ty = height / 2;
    };
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 0,
        life: 1,
      });
      if (ripples.length > 6) ripples.shift();
    };

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      // ease pointer toward target for buttery follow
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      // twinkling drifting stars
      ctx.globalCompositeOperation = "lighter";
      for (const s of stars) {
        s.tw += 0.02;
        s.x += Math.sin(s.tw * 0.3) * 0.05;
        s.y -= 0.06;
        if (s.y < -2) {
          s.y = height + 2;
          s.x = Math.random() * width;
        }
        const a = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 85%, 80%, ${a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 6;
        r.life -= 0.018;
        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.strokeStyle = `hsla(280, 90%, 78%, ${r.life * 0.7})`;
        ctx.lineWidth = 1.4;
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";

      // soft pointer glow halo
      if (pointer.x > -9000) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 180);
        g.addColorStop(0, "hsla(282, 95%, 72%, 0.22)");
        g.addColorStop(0.5, "hsla(220, 95%, 70%, 0.10)");
        g.addColorStop(1, "hsla(220, 95%, 70%, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    if (!reduced) raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Gooey colour blobs — drift around + amplify near cursor via CSS only */}
      <div className="absolute inset-0" style={{ filter: "url(#goo) blur(4px)" }}>
        <div
          className="absolute -top-[15%] -left-[10%] w-[55vmax] h-[55vmax] rounded-full opacity-80 animate-aurora-a mix-blend-screen"
          style={{ background: "radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 60%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute top-[5%] -right-[15%] w-[55vmax] h-[55vmax] rounded-full opacity-75 animate-aurora-b mix-blend-screen"
          style={{ background: "radial-gradient(circle at 50% 50%, #ec4899 0%, transparent 60%)", filter: "blur(70px)" }}
        />
        <div
          className="absolute -bottom-[20%] left-[15%] w-[55vmax] h-[55vmax] rounded-full opacity-75 animate-aurora-c mix-blend-screen"
          style={{ background: "radial-gradient(circle at 50% 50%, #22d3ee 0%, transparent 65%)", filter: "blur(70px)" }}
        />
        <div
          className="absolute top-[40%] left-[35%] w-[28vmax] h-[28vmax] rounded-full opacity-70 animate-aurora-a mix-blend-screen"
          style={{ background: "radial-gradient(circle at 50% 50%, #f59e0b 0%, transparent 65%)", filter: "blur(55px)" }}
        />
      </div>

      {/* SVG goo filter for liquid metaball feel */}
      <svg className="absolute size-0" aria-hidden>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="b" />
            <feColorMatrix
              in="b"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="g"
            />
            <feBlend in="SourceGraphic" in2="g" />
          </filter>
        </defs>
      </svg>

      {/* Dot grid overlay, masked to the centre */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--eclipse-accent) 60%, transparent) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 35%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 35%, transparent 80%)",
        }}
      />

      {/* Interactive starfield + click ripples */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

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
