import Header from "@/components/header";
import About from "@/components/about";
import Experience from "@/components/experience";
import Education from "@/components/education";
import ProofOfAchievement from "@/components/achievement";
import Projects from "@/components/projects";
import TechSection from "@/components/skills";
import Internships from "@/components/internship";
import Accomplishments from "@/components/accomplishment";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Internships />

      <ProofOfAchievement />
      <TechSection />
      <Accomplishments />
    </ >
  );
}
