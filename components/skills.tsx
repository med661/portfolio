import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '@/contexts/translationContext';
import {
    SiJavascript,
    SiTypescript,
    SiNodedotjs,
    SiNestjs,
    SiExpress,
    SiMongodb,
    SiPostgresql,
    SiPrisma,
    SiNextdotjs,
    SiRedis,
    SiGraphql,
    SiFirebase,
    SiDocker,
    SiKubernetes,
    SiGit,
    SiLinux
} from 'react-icons/si';

const technologies = [
    { name: 'JavaScript', icon: <SiJavascript className="w-full h-full text-yellow-400" />, category: 'frontend' },
    { name: 'TypeScript', icon: <SiTypescript className="w-full h-full text-blue-400" />, category: 'frontend' },
    { name: 'Node.js', icon: <SiNodedotjs className="w-full h-full text-green-500" />, category: 'backend' },
    { name: 'NestJS', icon: <SiNestjs className="w-full h-full text-red-500" />, category: 'backend' },
    { name: 'Express.js', icon: <SiExpress className="w-full h-full text-gray-100" />, category: 'backend' },
    { name: 'MongoDB', icon: <SiMongodb className="w-full h-full text-green-400" />, category: 'database' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="w-full h-full text-blue-400" />, category: 'database' },
    { name: 'Prisma', icon: <SiPrisma className="w-full h-full text-teal-400" />, category: 'database' },
    { name: 'Next.js', icon: <SiNextdotjs className="w-full h-full text-white" />, category: 'frontend' },
    { name: 'Redis', icon: <SiRedis className="w-full h-full text-red-500" />, category: 'database' },
    { name: 'GraphQL', icon: <SiGraphql className="w-full h-full text-pink-500" />, category: 'backend' },
    { name: 'FireBase', icon: <SiFirebase className="w-full h-full text-yellow-500" />, category: 'database' },
    { name: 'Linux', icon: <SiLinux className="w-full h-full text-yellow-500" />, category: 'devops' },
    { name: 'Docker', icon: <SiDocker className="w-full h-full text-blue-400" />, category: 'devops' },
    { name: 'Kubernetes', icon: <SiKubernetes className="w-full h-full text-blue-500" />, category: 'devops' },
    { name: 'Git', icon: <SiGit className="w-full h-full text-orange-500" />, category: 'devops' },
];

const TechSection: React.FC = () => {
    const { t } = useTranslationContext();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    const categories = [
        { id: 'frontend', name: t('skillsSection.categories.frontend'), color: 'from-blue-500 to-cyan-400' },
        { id: 'backend', name: t('skillsSection.categories.backend'), color: 'from-green-500 to-emerald-400' },
        { id: 'database', name: t('skillsSection.categories.database'), color: 'from-orange-500 to-amber-400' },
        { id: 'devops', name: t('skillsSection.categories.devops'), color: 'from-purple-500 to-indigo-400' },
    ];

    const filteredTechnologies = activeCategory
        ? technologies.filter(tech => tech.category === activeCategory)
        : technologies;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0, scale: 0.9 },
        show: { y: 0, opacity: 1, scale: 1 }
    };

    return (
        <section id='skills' className="relative py-16 md:py-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            <div className="container mx-auto px-6 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-white text-center"
                >
                    <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('skillsTitle')}
                    </span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                            activeCategory === null
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 border-transparent scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/5'
                        }`}
                    >
                        {t('skillsSection.categories.all')}
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                                activeCategory === category.id
                                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg border-transparent scale-105`
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/5'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory || 'all'}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
                    >
                        {filteredTechnologies.map((tech) => {
                            const category = categories.find(c => c.id === tech.category);

                            return (
                                <motion.div
                                    key={tech.name}
                                    variants={item}
                                    whileHover={{
                                        y: -5,
                                        transition: { duration: 0.2 }
                                    }}
                                    onHoverStart={() => setHoveredTech(tech.name)}
                                    onHoverEnd={() => setHoveredTech(null)}
                                    className="glass-strong rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden group border border-white/10 hover:border-indigo-500/30 transition-colors duration-300"
                                >
                                    {/* Background Glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category?.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                    <motion.div
                                        className="w-16 h-16 md:w-20 md:h-20 mb-6 relative z-10 flex items-center justify-center drop-shadow-2xl"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        {tech.icon}
                                    </motion.div>

                                    <h3 className="text-lg font-bold text-white mb-3 z-10">
                                        {tech.name}
                                    </h3>

                                    <span
                                        className={`text-xs px-3 py-1 rounded-full text-white z-10 bg-gradient-to-r ${category?.color} bg-opacity-20 border border-white/10`}
                                    >
                                        {category?.name || ''}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TechSection;
