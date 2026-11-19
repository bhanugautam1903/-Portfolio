import { Reveal } from "../components/Reveal";

export function About() {
  return (
    <section id="about" className="relative px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">About Me</p>
          <h2 className="h2">Building software from the logic up</h2>
        </Reveal>
        <Reveal delay={0.1} className="card mt-8 max-w-3xl p-8">
          <p className="text-lg leading-relaxed text-(--color-muted)">
            I&rsquo;m a Computer Science graduate who draws on Java, data structures, and
            object-oriented design to build full-stack applications. Curious how live
            market data powers a trading simulator, how Gemini checks an AI agent&rsquo;s
            work, or how machine learning forecasts air quality? Explore my projects to
            see how I built each one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
