import React from 'react';
import { motion } from 'framer-motion';
import { useTranslationContext } from '../contexts/translationContext';
import { ProfileSection } from './profile';
import { Terminal } from './terminal';
import { ContactSection } from './contact';
import { CVDownloadSection } from './downloadSection';

const About = () => {
    const { t, changeLanguage } = useTranslationContext();
    const [showTerminal, setShowTerminal] = React.useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    return (
        <section id="about" className="relative pt-28 md:pt-24 pb-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-6 relative z-10 max-w-7xl"
            >
                <ProfileSection t={t} onOpenTerminal={() => setShowTerminal(true)} />
                
                <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                    <div className="w-full md:w-auto">
                        <ContactSection />
                    </div>
                    <div className="w-full md:w-auto mt-8 md:mt-0">
                        <CVDownloadSection t={t} />
                    </div>
                </div>
            </motion.div>

            {showTerminal && <Terminal onClose={() => setShowTerminal(false)} t={t} />}
        </section>
    );
};

export default About;