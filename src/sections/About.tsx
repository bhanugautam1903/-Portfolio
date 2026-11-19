import { Reveal } from "../components/Reveal";

export function About() {
  return (
    <section id="about" className="relative px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">About Me</p>
          <h2 className="h2">Full-stack and AI-driven software</h2>
        </Reveal>
        <Reveal delay={0.1} className="card mt-8 max-w-3xl p-8">
          <p className="text-lg leading-relaxed text-(--color-muted)">
            I&rsquo;m a Computer Science graduate with a strong foundation in Java, data structures and algorithms, and object-oriented programming. I&rsquo;ve built full-stack and AI-driven projects, from a stock market simulator to an air quality forecasting platform. I enjoy working with APIs and databases to solve problems and build reliable software.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
