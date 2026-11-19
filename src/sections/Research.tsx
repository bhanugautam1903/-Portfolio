import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";

const PUBS = [
  ["Climora: A Deep Learning-Based Environmental Intelligence Platform", "IEEE Xplore",
    "Co-authored research integrating multi-source climate data with deep learning for climate trend analysis, anomaly detection, and environmental forecasting.",
    "IEEE Xplore search results", "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=climora"],
  ["Enhancing Stock Market Prediction Through Sentiment Analysis Using Financial APIs", "Springer",
    "Published research combining financial APIs, sentiment analysis, and deep learning for short-term stock market prediction.",
    "View on Springer", "https://link.springer.com/chapter/10.1007/978-3-032-35173-9_21"],
];
const CERTS = [
  ["Postman API Fundamentals Student Expert", "Postman"],
  ["Java FullStack Developer Specialization", "Coursera"],
  ["Silver Elite Certificate in Internet of Things (IoT)", "IIT Kharagpur (NPTEL)"],
  ["Oracle Cloud Infrastructure 2024 Certified AI Foundations Associate", "ORACLE"],
];

export function Research() {
  return (
    <>
      <section id="research" className="relative px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Research Publications</p>
            <h2 className="h2">Published work</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {PUBS.map(([t, venue, d, l, href], i) => (
              <Reveal key={t} delay={i * 0.12}>
                <TiltCard className="h-full">
                  <article className="card flex h-full flex-col p-7">
                    <span className="tag self-start">{venue}</span>
                    <h3 className="mt-4 font-display text-xl font-extrabold leading-snug">{t}</h3>
                    <p className="mt-3 text-(--color-muted)">{d}</p>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm mt-auto self-start">{l} <ArrowUpRight size={14} /></a>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section id="certifications" className="relative px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Certifications</p>
            <h2 className="h2">Credentials</h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {CERTS.map(([n, org], i) => (
              <Reveal as="li" key={n} delay={(i % 2) * 0.1}>
                <div className="card flex h-full items-start gap-4 p-5">
                  <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-(--color-accent)" />
                  <div>
                    <h3 className="font-display font-extrabold leading-snug">{n}</h3>
                    <p className="text-sm text-(--color-secondary)">{org}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
