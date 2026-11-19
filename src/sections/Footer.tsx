import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Reveal } from "../components/Reveal";

const CONTACTS = [
  [Mail, "bhanupriyagautam072@gmail.com", "mailto:bhanupriyagautam072@gmail.com"],
  [Phone, "+91 88940-68341", "tel:+918894068341"],
  [Linkedin, "LinkedIn", "https://linkedin.com/in/Bhanupriya-Gautam"],
  [Github, "GitHub", "https://github.com/bhanugautam1903"],
] as const;

export function Footer() {
  return (
    <footer id="contact" className="relative z-10 px-6 pb-10 pt-20 md:px-12">
      <Reveal className="card mx-auto max-w-4xl p-8 text-center md:p-14">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Let&rsquo;s build something together.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="mailto:bhanupriyagautam072@gmail.com" className="btn btn-primary"><Mail size={16} /> Email me</a>
          <a href="https://linkedin.com/in/Bhanupriya-Gautam" target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Linkedin size={16} /> LinkedIn</a>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          {CONTACTS.map(([Icon, label, href]) => (
            <li key={label}>
              <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="link inline-flex items-center gap-2">
                <Icon size={15} /> {label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <p className="mt-10 text-center text-sm text-(--color-muted)">&copy; {new Date().getFullYear()} Bhanupriya Gautam. All rights reserved.</p>
    </footer>
  );
}
