import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslationContext } from '../contexts/translationContext';

const Projects: React.FC = () => {
    const { t } = useTranslationContext();
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const projects = [
        {
            title: t("myprojects.learnHub.title"),
            image: "/images/ehunb.jpg",
            description: t("myprojects.learnHub.description"),
            technologies: ["NestJS","GraphQL","PostgreSQL", "TypeORM" ,"Redux Thunk"],          
            link: "/"
        },
      
        {
            title: t("myprojects.realtimeChat.title"),
            image: "/images/chat.png",
            description: t("myprojects.realtimeChat.description"),
            technologies: ["NestJS", "TypeScript", "Prisma", "React.js", "Redux Thunk"],
            link: "https://www.linkedin.com/feed/update/urn:li:activity:7163459271488180224/"
        }
    ];

    return (
        <section id="projects" className="py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-4"
            >
                <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        {t('myprojects.title')}
                    </span>
                </h2>
                
                
               

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="relative overflow-hidden group h-52">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                                    <a
                                        href={project.link}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg transform hover:scale-105 transition-transform text-sm font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} project`}
                                    >
                                        {t('myprojects.viewProject')}
                                    </a>
                                    <div className="bg-black/60 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="w-16 h-1 bg-indigo-600 mb-4 rounded-full"></div>
                                <p className="text-gray-300 mb-4 text-sm leading-relaxed h-20 overflow-hidden">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 text-xs bg-indigo-600/20 text-indigo-400 rounded-full transition-all duration-300 hover:bg-indigo-600/40"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span className="px-3 py-1 text-xs bg-gray-700/50 text-gray-400 rounded-full">
                                            +{project.technologies.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: projects.length * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 p-6 flex flex-col items-center justify-center min-h-[380px] hover:border-indigo-500/50 transition-all duration-300"
                    >
                        <div className="relative w-16 h-16 mb-6">
                            <div className="absolute inset-0 bg-indigo-600/30 rounded-full animate-ping opacity-75"></div>
                            <div className="relative w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{t('myprojects.comingSoon.title')}</h3>
                        <p className="text-gray-400 text-center">{t('myprojects.comingSoon.description')}</p>
                        <button className="mt-6 px-6 py-2 bg-indigo-600/20 text-indigo-400 rounded-lg hover:bg-indigo-600/30 transition-all duration-300">
                            { "Stay Tuned"}
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;