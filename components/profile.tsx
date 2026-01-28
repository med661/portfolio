import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTerminal, FaArrowRight } from 'react-icons/fa';

interface ProfileSectionProps {
    t: (key: string) => string;
    onOpenTerminal: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ t, onOpenTerminal }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-between md:gap-16 mb-20"
        >
            {/* Profile Image */}
            <div className="relative group mb-10 md:mb-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-56 h-56 md:w-72 md:h-72 relative rounded-full p-1 bg-black"
                >
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-transparent transition-colors duration-300">
                        <Image
                            src="/images/a.jpg"
                            alt={t('aboutme.profile.alt')}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                            priority
                        />
                    </div>
                </motion.div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-start max-w-2xl relative">
                <div className="absolute -top-20 -start-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
                <div className="absolute -bottom-20 -end-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

                <motion.div variants={itemVariants} className="relative inline-block mb-4">
                     <span className="py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">
                        {t('aboutme.role')}
                     </span>
                </motion.div>

                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    <span className="block text-white mb-2">{t('aboutme.greeting').replace('Salah Sfar!', '')}</span>
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Salah Sfar
                    </span>
                </motion.h1>
                
                <motion.div variants={itemVariants} className="flex items-center justify-center md:justify-start gap-4 mb-8">
                    <button
                        onClick={onOpenTerminal}
                        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-white bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/50"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <FaTerminal className="text-gray-400 group-hover:text-white transition-colors" />
                        <span>{t('aboutme.profile.terminal')}</span>
                        <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 group-hover:ring-white/20"></span>
                    </button>
                    
                    <a href="#projects" className="px-6 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors border-b border-transparent hover:border-gray-500 flex items-center gap-2">
                        {t('common.view')} {t('projects')} <FaArrowRight className="transform rtl:rotate-180" />
                    </a>
                </motion.div>
                
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                    {t('aboutme.bio')}
                </motion.p>
            </div>
        </motion.div>
    );
};
