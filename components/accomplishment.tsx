import React, { useState } from 'react';
import Image from 'next/image';
import { FaInstagram, FaLinkedin, FaAward, FaTrophy, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '@/contexts/translationContext';
import { ACCOMPLISHMENTS_DATA } from '@/constants/data';

const Accomplishments: React.FC = () => {
    const { t } = useTranslationContext();
    const [hovered, setHovered] = useState<number | null>(null);
    
    return (
        <section id="achievements" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            <div className="container mx-auto px-4 z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white text-center relative"
                >
                    <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('accomplissementSection.title')}
                    </span>
                </motion.h2>

                <div className="max-w-5xl mx-auto space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm 
                                 shadow-lg hover:shadow-xl rounded-xl overflow-hidden border border-gray-700/30"
                        whileHover={{ y: -5 }}
                    >
                        <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex-shrink-0 bg-indigo-500/20 p-5 rounded-full">
                                <FaTrophy className="text-5xl md:text-6xl text-indigo-400" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    {t('accomplissementSection.actionAidTitle')}
                                </h3>
                                <p className="text-white text-lg">
                                    {t('accomplissementSection.actionAid')}
                                </p>
                                <div className="mt-4 inline-block">
                                    <span className="px-4 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                                        {t('accomplissementSection.socialEntrepreneurship')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="glass-strong rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300"
                        whileHover={{ y: -5 }}
                    >
                        <div className="p-8 md:p-10">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="text-start space-y-6 flex-grow">
                                    <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                        {t('accomplissementSection.formationnetTitle')}
                                    </h3>
                                    <p className="text-white text-lg">
                                        {t('accomplissementSection.formationnet')}
                                    </p>
                                    <div className="flex gap-6 mt-6">
                                        <motion.a 
                                            whileHover={{ scale: 1.1, y: -3 }}
                                            whileTap={{ scale: 0.9 }}
                                            href={ACCOMPLISHMENTS_DATA.formationnet.instagram}
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600/30 to-pink-500/30 
                                                     hover:from-pink-600/50 hover:to-pink-500/50 rounded-lg text-pink-300 transition-all duration-300"
                                        >
                                            <FaInstagram size={20} />
                                            <span>{t('accomplissementSection.instagram')}</span>
                                            <FaExternalLinkAlt size={12} className="ms-1 opacity-70" />
                                        </motion.a>
                                        <motion.a 
                                            whileHover={{ scale: 1.1, y: -3 }}
                                            whileTap={{ scale: 0.9 }}
                                            href={ACCOMPLISHMENTS_DATA.formationnet.linkedin}
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/30 to-blue-500/30 
                                                     hover:from-blue-600/50 hover:to-blue-500/50 rounded-lg text-blue-300 transition-all duration-300"
                                        >
                                            <FaLinkedin size={20} />
                                            <span>{t('accomplissementSection.linkedin')}</span>
                                            <FaExternalLinkAlt size={12} className="ml-1 opacity-70" />
                                        </motion.a>
                                    </div>
                                </div>
                                <motion.div 
                                    whileHover={{ scale: 1.05, rotate: 3 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative flex-shrink-0 group"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                                    <div className="relative">
                                        <Image
                                            src="/images/logosfar.png"
                                            alt="Formationnet Logo"
                                            className="rounded-lg shadow-lg"
                                            width={200}
                                            height={200}
                                            quality={95}
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Accomplishments;
