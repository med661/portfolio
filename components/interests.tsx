import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '../contexts/translationContext';
import { FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const Interests: React.FC = () => {
    const { t } = useTranslationContext();
    const [activeInterest, setActiveInterest] = useState<number | null>(null);

    const interests = [
        { 
            name: t("interestsection.aiTools.name"), 
            icon: "🤖", 
            description: t("interestsection.aiTools.description"),
            bgImage: "/images/interests/ai.jpg",
            color: "from-blue-600 to-indigo-600"
        },
        { 
            name: t("interestsection.webDevelopment.name"), 
            icon: "💻", 
            description: t("interestsection.webDevelopment.description"),
            bgImage: "/images/interests/web.jpg",
            color: "from-purple-600 to-pink-600"
        },
        { 
            name: t("interestsection.devOps.name"), 
            icon: "⚙️", 
            description: t("interestsection.devOps.description"),
            bgImage: "/images/interests/devops.jpg",
            color: "from-orange-500 to-red-500"
        },
        { 
            name: t("interestsection.chess.name"), 
            icon: "♟️", 
            description: t("interestsection.chess.description"),
            bgImage: "/images/interests/chess.jpg",
            color: "from-emerald-600 to-teal-600"
        },
        { 
            name: t("interestsection.traveling.name"), 
            icon: "✈️", 
            description: t("interestsection.traveling.description"),
            bgImage: "/images/interests/travel.jpg",
            color: "from-sky-500 to-cyan-500"
        },
        { 
            name: t("interestsection.music.name"), 
            icon: "🎶", 
            description: t("interestsection.music.description"),
            bgImage: "/images/interests/music.jpg",
            color: "from-amber-500 to-yellow-500"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="interests" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            <div className="container mx-auto px-6 z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white text-center relative"
                >
                    <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('interestsection.title')}
                    </span>
                </motion.h2>

                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {interests.map((interest, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ 
                                y: -10,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                            }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 300, 
                                damping: 15 
                            }}
                            className="relative overflow-hidden rounded-xl group"
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 w-full h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/80 z-10" />
                                {interest.bgImage && (
                                    <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                                        <Image 
                                            src={interest.bgImage} 
                                            alt={interest.name}
                                            fill
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="relative z-20 p-8 h-full flex flex-col">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${interest.color} flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                        <span className="text-4xl">
                                            {interest.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                                        {interest.name}
                                    </h3>
                                    
                                    <AnimatePresence>
                                        {activeInterest === index ? (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    {interest.description}
                                                </p>
                                                <motion.button
                                                    onClick={() => setActiveInterest(null)}
                                                    className="mt-4 text-sm text-white/80 hover:text-white flex items-center justify-center space-x-1 group/btn"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <span>Show less</span>
                                                </motion.button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex-1 flex flex-col justify-between"
                                            >
                                                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                                    {interest.description}
                                                </p>
                                              
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

        
                           
                           
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Interests;