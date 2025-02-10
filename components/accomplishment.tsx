import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion'; // You'll need to install framer-motion
import { useTranslationContext } from '@/contexts/translationContext';

const Accomplishments: React.FC = () => {
            const { t } = useTranslationContext();
    
    return (
        <section id="achievements" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 w-full">
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('accomplissementSection.title')}
                    </span>
                </motion.h2>

                <div className="max-w-4xl mx-auto space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 
                                 shadow-lg hover:shadow-xl rounded-xl py-8 px-8"
                    >
                        <div className="text-white text-xl font-medium">
                            {/* 🏆 2nd place in the &apos;ActionAid&apos; Social Entrepreneurship competition */}
                            {t('accomplissementSection.actionAid')}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 
                                 shadow-lg hover:shadow-xl rounded-xl py-8 px-8"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-left space-y-6">
                                <p className="text-white text-xl font-medium">
                                    {/* Created online educational content under the brand &apos;Formationnet&apos; on Instagram */}
                                    {t('accomplissementSection.formationnet')}
                                </p>
                                <div className="flex space-x-6">
                                    <motion.a 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href="https://www.instagram.com/formationnet" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-pink-400 hover:text-pink-300 transition-colors duration-300"
                                    >
                                        <FaInstagram size={35} />
                                    </motion.a>
                                    <motion.a 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href="https://www.linkedin.com/company/75032139" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                                    >
                                        <FaLinkedin size={35} />
                                    </motion.a>
                                </div>
                            </div>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Image
                                    src="/images/logosfar.png"
                                    alt="Formationnet Logo"
                                    className="rounded-lg shadow-lg"
                                    width={180}
                                    height={180}
                                    quality={95}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Accomplishments;
