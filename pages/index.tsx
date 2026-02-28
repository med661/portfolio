// filepath: pages/index.tsx
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
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

// Add this import at the top
import Footer from '../components/footer';

export default function Home() {
  
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Salah Sfar - Full Stack Developer & Software Engineer</title>
        <meta name="title" content="Salah Sfar - Full Stack Developer & Software Engineer" />
        <meta name="description" content="Portfolio of Salah Sfar - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View projects, experience, and skills." />
        <meta name="author" content="Salah Sfar" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://salahsfar.com/" />
        <meta property="og:title" content="Salah Sfar - Full Stack Developer & Software Engineer" />
        <meta property="og:description" content="Portfolio of Salah Sfar - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View projects, experience, and skills." />
        <meta property="og:image" content="/images/portfolio.png" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="fr_FR" />
        <meta property="og:locale:alternate" content="ar" />
        <meta property="og:site_name" content="Salah Sfar Portfolio" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://salahsfar.com/" />
        <meta property="twitter:title" content="Salah Sfar - Full Stack Developer & Software Engineer" />
        <meta property="twitter:description" content="Portfolio of Salah Sfar - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies." />
        <meta property="twitter:image" content="/images/portfolio.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://salahsfar.com/" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#4f46e5" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Salah Sfar",
              "url": "https://salahsfar.com",
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Self-employed"
              },
              "sameAs": [
                "https://github.com/salahsfar",
                "https://linkedin.com/in/salahsfar"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS"
              ]
            })
          }}
        />
      </Head>
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
     
<Footer />
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

