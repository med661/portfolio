import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '../contexts/translationContext';
import {
    FaRobot,
    FaLaptopCode,
    FaDocker,
    FaChess,
    FaPlane,
    FaMusic,
} from 'react-icons/fa';

const Interests: React.FC = () => {
    const { t } = useTranslationContext();
    const [activeInterest, setActiveInterest] = useState<number | null>(null);

    const interests = [
        {
            name: t("interestsection.aiTools.name"),
            icon: <FaRobot className="w-8 h-8 text-white" />,
            description: t("interestsection.aiTools.description"),
            color: "from-cyan-500 to-blue-600",
            glow: "rgba(6,182,212,0.15)",
        },
        {
            name: t("interestsection.webDevelopment.name"),
            icon: <FaLaptopCode className="w-8 h-8 text-white" />,
            description: t("interestsection.webDevelopment.description"),
            color: "from-blue-500 to-cyan-400",
            glow: "rgba(59,130,246,0.15)",
        },
        {
            name: t("interestsection.devOps.name"),
            icon: <FaDocker className="w-8 h-8 text-white" />,
            description: t("interestsection.devOps.description"),
            color: "from-cyan-600 to-blue-500",
            glow: "rgba(6,182,212,0.12)",
        },
        {
            name: t("interestsection.chess.name"),
            icon: <FaChess className="w-8 h-8 text-white" />,
            description: t("interestsection.chess.description"),
            color: "from-blue-600 to-cyan-500",
            glow: "rgba(59,130,246,0.15)",
        },
        {
            name: t("interestsection.traveling.name"),
            icon: <FaPlane className="w-8 h-8 text-white" />,
            description: t("interestsection.traveling.description"),
            color: "from-cyan-400 to-blue-600",
            glow: "rgba(34,211,238,0.12)",
        },
        {
            name: t("interestsection.music.name"),
            icon: <FaMusic className="w-8 h-8 text-white" />,
            description: t("interestsection.music.description"),
            color: "from-blue-500 to-cyan-600",
            glow: "rgba(59,130,246,0.12)",
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section id="interests" className="relative py-16 md:py-20 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 min-h-screen flex items-center">
            <div className="absolute inset-0 bg-blue-950 z-0" />
            <div className="container mx-auto px-6 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white text-center"
                >
                    <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('interestsection.title')}
                    </span>
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                >
                    {interests.map((interest, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="glass-strong rounded-xl overflow-hidden shadow-xl hover:shadow-2xl border border-white/10 hover:border-cyan-500/30 flex flex-col group transition-colors duration-300"
                        >
                            {/* Top gradient bar */}
                            <div className={`h-1 w-full bg-gradient-to-r ${interest.color}`} />

                            <div className="p-6 flex flex-col items-center text-center gap-4 relative">
                                {/* Subtle glow behind icon */}
                                <div
                                    className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: interest.glow }}
                                />

                                {/* Icon circle */}
                                <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${interest.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    {interest.icon}
                                </div>

                                <h3 className={`text-xl font-bold bg-gradient-to-r ${interest.color} bg-clip-text text-transparent`}>
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
                                            <button
                                                onClick={() => setActiveInterest(null)}
                                                className="mt-4 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                                            >
                                                {t('interestsection.showLess')}
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <p className="text-gray-400 text-sm line-clamp-2">
                                                {interest.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Interests;
