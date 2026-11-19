import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal } from "../components/Reveal";

const EDU = [
  ["Chandigarh University, Punjab", "B.E. in Computer Science and Engineering (Honors: IoT)", "2022–2026"],
  ["St. Mary’s School, Himachal Pradesh", "Intermediate (CBSE)", "2021–2022"],
  ["St. Mary’s School, Himachal Pradesh", "Matriculation (CBSE)", "2019–2020"],
];

export function Education() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <section id="education" className="relative px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">Education</p>
          <h2 className="h2">Where I studied</h2>
        </Reveal>
        <ol ref={ref} className="relative mt-10 max-w-3xl space-y-8 pl-10">
          <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-(--color-border)" />
          <motion.span aria-hidden style={{ scaleY, transformOrigin: "top" }} className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-(--color-primary) shadow-[0_0_12px_var(--color-glow)]" />
          {EDU.map(([school, deg, yrs], i) => (
            <Reveal as="li" key={i} delay={i * 0.1} className="relative">
              <span aria-hidden className="absolute -left-10 top-6 h-6 w-6 rounded-full border-2 border-(--color-primary) bg-(--color-bg)">
                <span className="absolute inset-1.5 rounded-full bg-(--color-accent)" />
              </span>
              <div className="card p-6">
                <p className="text-sm font-bold text-(--color-accent)">{yrs}</p>
                <h3 className="mt-1 font-display text-xl font-extrabold">{school}</h3>
                <p className="text-(--color-muted)">{deg}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
