import Navbar from "@/components/layout/Navbar";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* Global background effects (client-only) */}
      <BackgroundEffects />

      {/* Layout */}
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <TechStack />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
