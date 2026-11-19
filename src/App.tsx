import { useEffect } from "react";
import { Cursor } from "./components/Cursor";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Education } from "./sections/Education";
import { Research } from "./sections/Research";
import { Footer } from "./sections/Footer";
import { initLenis } from "./lib/lenis";


export default function App() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = initLenis();
    return () => lenis.destroy();
  }, []);
  return (
    <>
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero /><About /><Projects /><Skills /><Education /><Research />
      </main>
      <Footer />
    </>
  );
}
