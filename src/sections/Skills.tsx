import { Reveal } from "../components/Reveal";

const KEY = new Set(["Java", "JavaScript", "Python", "React.js", "Node.js", "Express.js", "Firebase", "Gemini API"]);
const GROUPS: [string, string[]][] = [
  ["Programming", ["Java", "JavaScript", "Python", "SQL"]],
  ["Frameworks / Web Technologies", ["HTML", "CSS", "React.js", "Node.js", "Express.js"]],
  ["AI / ML", ["Gemini API", "AI/ML"]],
  ["Databases", ["MySQL", "MongoDB", "Firebase"]],
  ["Tools", ["Git", "GitHub", "Linux", "Docker", "Visual Studio Code", "IntelliJ", "Postman", "Render"]],
  ["Core Concepts", ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "Operating Systems", "DBMS", "SDLC", "Computer Networks"]],
  ["Soft Skills", ["Analytical Thinking", "Problem Solving", "Team Collaboration", "Quick Learning"]],
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 className="h2">Tools and concepts I work with</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {GROUPS.map(([g, items], i) => (
            <Reveal key={g} delay={(i % 2) * 0.1} className={i === 4 || i === 5 ? "md:col-span-2" : ""}>
              <div className="card h-full p-6">
                <h3 className="font-display text-sm font-extrabold uppercase tracking-widest text-(--color-secondary)">{g}</h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {items.map((s) => <li key={s} className={`badge ${KEY.has(s) ? "badge-key" : ""}`}>{s}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
