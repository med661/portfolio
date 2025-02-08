import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';

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
            className="flex flex-col md:flex-row items-center justify-between md:space-x-16 mb-20"
        >
            {/* Profile Image */}
            <div className="relative group mb-10 md:mb-0">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-56 h-56 md:w-72 md:h-72 relative"
                >
                    <Image
                        src="/images/a.jpg"
                        alt={t('aboutme.profile.alt')}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-3xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl" />
                </motion.div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left max-w-2xl">
                <motion.h2 variants={itemVariants} className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                    {t('aboutme.title')}
                </motion.h2>
                <motion.p variants={itemVariants} className="text-2xl md:text-3xl text-indigo-300 mb-8 font-light flex items-center justify-center md:justify-start gap-4">
                    {t('aboutme.greeting')}
                    <button
                        onClick={onOpenTerminal}
                        className="inline-flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                        <FaTerminal />
                        <span>Terminal</span>
                    </button>
                </motion.p>
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    {t('aboutme.bio')}
                </motion.p>
            </div>
        </motion.div>
    );
};