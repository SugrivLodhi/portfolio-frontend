import { Inter } from "next/font/google";
import About from "@/components/AboutSection";
import SkillSection from "@/components/SkillSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectSection from "@/components/ProjectSection";
import ResumeSection from "@/components/ResumeSection";
import GetInTouch from "@/components/GetInTouch";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <About />
      <SkillSection />
      <ExperienceSection />
      <ProjectSection />
      <ResumeSection />
      <GetInTouch />
    </>
  );
}
