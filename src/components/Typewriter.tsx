import { useEffect, useState } from "react";

export function Typewriter({ text, start = 900 }: { text: string; start?: number }) {
  const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      iv = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(iv); }, 38);
    }, start);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text, start, reduce]);
  return (
    <span aria-label={text}>
      <span aria-hidden>{text.slice(0, n)}</span>
      <span aria-hidden className="caret" />
    </span>
  );
}
