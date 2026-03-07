import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Publications } from "@/components/sections/Publications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Publications />
      <Contact />
      <Footer />
    </main>
  );
}
