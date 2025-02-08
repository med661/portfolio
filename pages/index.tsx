// filepath: pages/index.tsx
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from "@/components/header";
import About from "@/components/about";
import Experience from "@/components/experience";
import Education from "@/components/education";
import ProofOfAchievement from "@/components/achievement";
import Projects from "@/components/projects";
import TechSection from "@/components/skills";
import Internships from "@/components/internship";
import Accomplishments from "@/components/accomplishment";
import Interests from "@/components/interests";

import { useTranslation } from 'next-i18next';
// ...existing imports...

export default function Home() {
  const { t } = useTranslation('common');
  
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
      <Interests />
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}