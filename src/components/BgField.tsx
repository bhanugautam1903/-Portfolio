import { useEffect, useRef } from "react";

export default function BgField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext("2d");
    if (!ctx) return;
    const cs = getComputedStyle(document.documentElement);
    const cols = ["--color-primary", "--color-secondary", "--color-accent"].map((n) => cs.getPropertyValue(n).trim());
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = innerWidth < 768 ? 28 : 60;
    const pts = Array.from({ length: N }, (_, i) => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random(), c: cols[i % 3] }));
    let w = 0, h = 0, raf = 0, t = 0;
    const resize = () => { const d = Math.min(devicePixelRatio || 1, 1.5); w = cv.clientWidth; h = cv.clientHeight; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    resize(); addEventListener("resize", resize);
    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += still ? 0 : 1;
      const off = scrollY * 0.0004;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const k = 0.35 + p.z * 0.9;
        const x = w / 2 + (p.x + Math.sin(t * 0.002 + p.z * 6) * 0.03) * w * 0.55 * k;
        const y = (((h / 2 + p.y * h * 0.6 * k - scrollY * 0.08 * p.z) % h) + h) % h;
        ctx.globalAlpha = 0.25 + p.z * 0.45;
        ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(x, y, 1 + p.z * 1.8, 0, 7); ctx.fill();
      }
      void off;
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-40" />;
}
