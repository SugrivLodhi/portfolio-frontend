import { Inter } from "next/font/google";
import HeroSection from "@/components/HeroSection";
import About from "@/components/AboutSection";
import SkillSection from "@/components/SkillSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectSection from "@/components/ProjectSection";
import AIEngineeringSection from "@/components/AIEngineeringSection";
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
      <AIEngineeringSection />
      <GetInTouch />
      {/* Legacy Gemini chat widget — kept temporarily behind a feature flag.
          Enable with NEXT_PUBLIC_LEGACY_BOT=true to compare during migration. */}
      {process.env.NEXT_PUBLIC_LEGACY_BOT === "true" && <AIChatWidget />}
    </>
  );
}
