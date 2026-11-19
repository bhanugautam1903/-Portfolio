import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { Typewriter } from "../components/Typewriter";


const BgField = lazy(() => import("../components/BgField"));
const Scene = lazy(() => import("../components/Scene"));

export function Hero() {
  const compact = typeof innerWidth !== "undefined" && innerWidth < 768;
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pt-40">
      <Suspense fallback={null}><BgField /></Suspense>
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-(--color-glow) opacity-40 blur-3xl" />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="eyebrow">
            Computer Science Graduate
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Bhanupriya{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-brand)" }}>Gautam</span>
          </motion.h1>
          <p className="mt-6 min-h-[3.5rem] max-w-md text-lg font-medium text-(--color-muted) md:text-xl">
            <Typewriter text="I build the logic, shape the interface, and put AI to work." />
          </p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-9 flex flex-wrap gap-4">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-ghost">Get in Touch</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none relative mx-auto aspect-square w-full max-w-md md:max-w-none">
          <Suspense fallback={<div className="grid h-full w-full place-items-center"><div className="h-16 w-16 animate-pulse rounded-full bg-(--color-primary-soft)" /></div>}>
            <Scene compact={compact} />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
