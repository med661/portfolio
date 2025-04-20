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
    SiGit 
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
    { name: 'Docker', icon: <SiDocker className="w-full h-full text-blue-400" />, category: 'devops' },
    { name: 'Kubernetes', icon: <SiKubernetes className="w-full h-full text-blue-500" />, category: 'devops' },
    { name: 'Git', icon: <SiGit className="w-full h-full text-orange-500" />, category: 'devops' },
];

const TechSection: React.FC = () => {
    const { t } = useTranslationContext();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    
    const categories = [
        { id: 'frontend', name: 'Frontend', color: 'from-blue-500 to-cyan-400' },
        { id: 'backend', name: 'Backend', color: 'from-green-500 to-emerald-400' },
        { id: 'database', name: 'Database', color: 'from-orange-500 to-amber-400' },
        { id: 'devops', name: 'DevOps', color: 'from-purple-500 to-indigo-400' },
    ];
    
    const filteredTechnologies = activeCategory 
        ? technologies.filter(tech => tech.category === activeCategory)
        : technologies;
    
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
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };
    
    return (
        <section id='skills' className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            <div className="container mx-auto px-6 z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-white text-center"
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
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            activeCategory === null 
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                        }`}
                    >
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeCategory === category.id 
                                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
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
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
                    >
                        {filteredTechnologies.map((tech, index) => {
                            const category = categories.find(c => c.id === tech.category);
                            const gradientFrom = category?.color.split(' ')[0].replace('from-', '');
                            const gradientTo = category?.color.split(' ')[1].replace('to-', '');
                            
                            return (
                                <motion.div
                                    key={tech.name}
                                    variants={item}
                                    whileHover={{ 
                                        y: -10,
                                        transition: { duration: 0.3 }
                                    }}
                                    onHoverStart={() => setHoveredTech(tech.name)}
                                    onHoverEnd={() => setHoveredTech(null)}
                                    className={`relative flex flex-col items-center text-center p-4 md:p-6 rounded-xl 
                                             transition-all duration-300 backdrop-blur-sm
                                             ${hoveredTech === tech.name ? 'bg-gray-800/70 shadow-xl' : 'bg-gray-800/30 shadow-md'}`}
                                >
                                    <div 
                                        className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 hover:opacity-20 transition-opacity duration-300"
                                        style={{ 
                                            backgroundImage: category 
                                                ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` 
                                                : 'none'
                                        }} 
                                    />
                                    
                                    <motion.div 
                                        className="w-20 h-20 md:w-28 md:h-28 mb-4 md:mb-6 relative flex items-center justify-center"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        {tech.icon}
                                    </motion.div>
                                    
                                    <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                                        {tech.name}
                                    </h3>
                                    
                                    <span 
                                        className="text-xs px-3 py-1 rounded-full text-white"
                                        style={{
                                            background: category 
                                                ? `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` 
                                                : 'none',
                                            opacity: 0.7
                                        }}
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
