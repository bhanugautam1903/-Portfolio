import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";

const LINKS = [
  ["Home", "top"], ["About", "about"], ["Projects", "projects"], ["Skills", "skills"],
  ["Education", "education"], ["Research", "research"], ["Certifications", "certifications"], ["Contact", "contact"],
];

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120 && !open);
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(([, id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40 border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
          Bhanupriya<span className="text-(--color-primary)">.</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {LINKS.map(([l, id]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}
              className={`link text-sm ${active === id ? "!text-(--color-primary)" : "!text-(--color-muted) hover:!text-(--color-text)"}`}>
              {l}
              {active === id && <motion.span layoutId="nav-active" className="absolute -bottom-1 left-0 h-0.5 w-full bg-(--color-primary)" />}
            </a>
          ))}
        </nav>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border-strong) lg:hidden">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-(--color-border) px-6 py-3 lg:hidden" aria-label="Mobile">
          {LINKS.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${active === id ? "bg-(--color-primary-soft) text-(--color-primary)" : "text-(--color-muted)"}`}>{l}</a>
          ))}
        </nav>
      )}
    </motion.header>
  );
}
