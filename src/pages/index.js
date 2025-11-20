import { Inter } from "next/font/google";
import HeroSection from "@/components/HeroSection";
import About from "@/components/AboutSection";
import SkillSection from "@/components/SkillSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectSection from "@/components/ProjectSection";
import GetInTouch from "@/components/GetInTouch";
import AIChatWidget from "@/components/AIChatWidget";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <SkillSection />
      <ExperienceSection />
      <ProjectSection />
      <GetInTouch />
      <AIChatWidget />
    </>
  );
}
