import { useEffect, useRef, useState } from "react";

type V = { x: number; y: number; z: number };
const cssVar = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function hexA(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function rot(p: V, ax: number, ay: number): V {
  const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
  const x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
  return { x: x1, y: p.y * cx - z1 * sx, z: p.y * sx + z1 * cx };
}

function buildGraph(count: number) {
  // three clusters: frontend (primary), backend (secondary), API/AI (accent)
  const centers: V[] = [{ x: -0.7, y: -0.2, z: 0.1 }, { x: 0.7, y: 0.25, z: -0.1 }, { x: 0, y: -0.1, z: 0.1 }];
  let s = 7;
  const rnd = () => ((s = (s * 16807) % 2147483647), s / 2147483647 - 0.5);
  const nodes = Array.from({ length: count }, (_, i) => {
    const g = i % 3;
    const c = centers[g];
    const spread = g === 2 ? 0.75 : 0.5;
    return { p: { x: c.x + rnd() * spread * 1.6, y: c.y + rnd() * spread * 1.8, z: c.z + rnd() * spread * 1.6 }, g };
  });
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => nodes.forEach((b, j) => {
    if (j <= i) return;
    const d = Math.hypot(a.p.x - b.p.x, a.p.y - b.p.y, a.p.z - b.p.z);
    if (d < (a.g === b.g ? 0.62 : 0.5)) edges.push([i, j]);
  }));
  return { nodes, edges };
}

export default function Scene({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d");
    if (!ctx) { setOk(false); return; }
    const { nodes, edges } = buildGraph(compact ? 18 : 30);
    const cols = [cssVar("--color-primary"), cssVar("--color-secondary"), cssVar("--color-accent")];
    const still = reduced();
    let w = 0, h = 0, dpr = 1, raf = 0, t = 0, mx = 0, my = 0, sx = 0, sy = 0, visible = true;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(cv);
    const onMove = (e: MouseEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      t += still ? 0 : 0.004;
      sx += (mx - sx) * 0.05; sy += (my - sy) * 0.05;
      const scroll = still ? 0 : window.scrollY * 0.0016;
      const ay = t + sx * 0.9 + scroll, ax = sy * 0.6 + Math.sin(t * 0.7) * 0.12 + scroll * 0.4;
      ctx.clearRect(0, 0, w, h);
      const sc = Math.min(w, h) * 0.46, f = 3;
      const pr = nodes.map((n) => {
        const r = rot(n.p, ax, ay);
        const k = f / (f - r.z);
        return { x: w / 2 + r.x * sc * k, y: h / 2 + r.y * sc * k, k, z: r.z };
      });
      ctx.lineWidth = 1;
      edges.forEach(([i, j], idx) => {
        const a = pr[i], b = pr[j];
        const depth = Math.min(1, Math.max(0.15, (a.k + b.k) / 2 - 0.55));
        ctx.strokeStyle = hexA(cols[nodes[i].g], 0.55 * depth);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        if (!still && idx % 4 === 0) {
          const q = (t * 6 + idx * 0.37) % 1;
          ctx.fillStyle = hexA(cols[2], 0.9 * depth);
          ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * q, a.y + (b.y - a.y) * q, 1.8, 0, 7); ctx.fill();
        }
      });
      [...pr.keys()].sort((a, b) => pr[a].z - pr[b].z).forEach((i) => {
        const p = pr[i], c = cols[nodes[i].g];
        const r = (nodes[i].g === 2 ? 5 : 4) * p.k;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        g.addColorStop(0, hexA(c, 0.45)); g.addColorStop(1, hexA(c, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, 7); ctx.fill();
        ctx.fillStyle = hexA(c, 0.5 + 0.5 * Math.min(1, p.k - 0.4));
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill();
      });
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener("mousemove", onMove); };
  }, [compact]);

  if (!ok) return <StaticFallback />;
  return <canvas ref={ref} role="img" aria-label="Floating 3D network of connected frontend, backend and API nodes" className="h-full w-full" />;
}

export function StaticFallback() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Network of connected nodes">
      <g stroke="var(--color-border-strong)" strokeWidth="1">
        <path d="M40 60L100 100L160 60M100 100L60 160M100 100L150 150M40 60L60 160M160 60L150 150" />
      </g>
      <circle cx="40" cy="60" r="7" fill="var(--color-primary)" />
      <circle cx="60" cy="160" r="7" fill="var(--color-primary)" />
      <circle cx="160" cy="60" r="7" fill="var(--color-secondary)" />
      <circle cx="150" cy="150" r="7" fill="var(--color-secondary)" />
      <circle cx="100" cy="100" r="10" fill="var(--color-accent)" />
    </svg>
  );
}
