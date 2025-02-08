import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslationContext } from '../contexts/translationContext';
import { ProfileSection } from './profile';
import { Terminal } from './terminal';
import { ContactSection } from './contact';
import { CVDownloadSection } from './downloadSection';

const About = () => {
    const { t, changeLanguage } = useTranslationContext();
    const isFirstRender = useRef(true);
    const [showTerminal, setShowTerminal] = React.useState(false);

    useEffect(() => {
        if (isFirstRender.current) {
            changeLanguage("en");
            isFirstRender.current = false;
        }
    }, [changeLanguage]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    return (
        <section id="about" className="min-h-screen py-24 md:py-36 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/path-to-subtle-pattern.png')] opacity-10 mix-blend-overlay" />
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-6 relative z-10 max-w-7xl"
            >
                <ProfileSection t={t} onOpenTerminal={() => setShowTerminal(true)} />
                <ContactSection />
                <CVDownloadSection t={t} />
            </motion.div>

            {showTerminal && <Terminal onClose={() => setShowTerminal(false)} t={t} />}
        </section>
    );
};

export default About;