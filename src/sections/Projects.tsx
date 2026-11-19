import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";

const PROJECTS = [
  { title: "PayAgent Protocol", sub: "AI Commerce Platform",
    desc: "Engineered a full-stack AI-agent commerce platform with RESTful APIs, capability-based access controls, PayPal payment workflows, and Gemini-powered task verification.",
    tech: ["React.js", "Node.js", "Express.js", "Firebase", "PayPal REST APIs", "Gemini API"],
    links: [["Live Frontend", "https://payagent-protocol-frontend.onrender.com/"], ["Live Backend", "https://payagent-protocol-backend.onrender.com/"]] },
  { title: "TradeZen", sub: "Stock Market Simulation Platform",
    desc: "Developed a full-stack trading platform with real-time stock APIs, buy/sell transactions, portfolio management, and Firebase authentication.",
    tech: ["React.js", "Node.js", "Express.js", "Firebase"],
    links: [["Live Link", "https://tradezen-uj1s.onrender.com/"]] },
  { title: "Climora", sub: "AI-Powered Environmental Intelligence Platform",
    desc: "Architected a full-stack analytics platform with a Python ML microservice for AQI forecasting, real-time environmental APIs, and Gemini-powered insights.",
    tech: ["React.js", "TypeScript", "Express.js", "Firebase", "Python", "Random Forest", "Gemini API"],
    links: [["Live Link", "https://climora-zvac.onrender.com/"]] },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">Projects</p>
          <h2 className="h2">Things I&rsquo;ve built</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} className="h-full">
              <TiltCard className="h-full">
                <article className="card flex h-full flex-col p-7">
                  <span className="font-display text-sm font-extrabold text-(--color-accent)">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{p.title}</h3>
                  <p className="text-sm font-semibold text-(--color-primary)">{p.sub}</p>
                  <p className="mt-4 text-(--color-muted)">{p.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
                    {p.tech.map((t) => <li key={t} className="tag">{t}</li>)}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3 pt-7">
                    {p.links.map(([l, href], k) => (
                      <a key={l} href={href} target="_blank" rel="noopener noreferrer" className={`btn btn-sm ${k === 0 ? "btn-primary" : "btn-ghost"}`}>
                        {l} <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
