import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '../contexts/translationContext';
import { FaExternalLinkAlt, FaCode, FaLaptopCode, FaTimes } from 'react-icons/fa';
import { PROJECTS_DATA } from '../constants/data';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

const Projects: React.FC = () => {
    const { t } = useTranslationContext();
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useLockBodyScroll(activeProject !== null);

    const projects = PROJECTS_DATA.map(project => ({
        ...project,
        title: t(`myprojects.${project.key}.title`),
        description: t(`myprojects.${project.key}.description`),
    }));

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

    const openProjectDetails = (index: number) => {
        setActiveProject(index);
    };

    const closeProjectDetails = () => {
        setActiveProject(null);
    };

    const handleModalClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeProjectDetails();
        }
    };

    return (
        <section id="projects" className="relative py-16 md:py-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            <div className="container mx-auto px-4 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white text-center"
                >
                    <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('myprojects.title')}
                    </span>
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ y: -10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="glass-strong rounded-xl overflow-hidden shadow-xl hover:shadow-2xl border border-white/10 hover:border-indigo-500/30 h-full flex flex-col group transition-colors duration-300"
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="relative overflow-hidden h-52">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{ objectPosition: 'center' }}
                                    priority={index < 4} // Prioritize first few items
                                    loading={index < 4 ? "eager" : "lazy"}
                                    quality={85}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => openProjectDetails(index)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 w-full justify-center hover:bg-indigo-700 transition-colors z-10 shadow-lg"
                                    >
                                        <FaLaptopCode />
                                        {t('myprojects.viewDetails')}
                                    </motion.button>
                                </div>

                                {/* Gradient overlay based on project color */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 mix-blend-overlay`}
                                ></div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow relative">
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="w-12 h-1 bg-indigo-600 mb-4 rounded-full group-hover:w-20 transition-all duration-300"></div>
                                <p className="text-gray-300 mb-6 text-sm leading-relaxed line-clamp-3 font-light">
                                    {project.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className={`px-3 py-1 text-xs bg-gradient-to-r ${project.color} bg-opacity-10 text-white rounded-full border border-white/5`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span
                                                className="px-3 py-1 text-xs bg-white/5 text-gray-300 rounded-full cursor-pointer hover:bg-white/10 transition-colors border border-white/5"
                                                onClick={() => openProjectDetails(index)}
                                            >
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 text-sm font-medium group/link"
                                        >
                                            <FaExternalLinkAlt className="text-xs transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                            {t('myprojects.visitProject')}
                                        </a>

                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => openProjectDetails(index)}
                                            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors"
                                        >
                                            <FaCode />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        variants={item}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="glass-strong rounded-xl overflow-hidden shadow-xl border border-white/10 hover:border-indigo-500/30 p-6 flex flex-col items-center justify-center min-h-[380px] group"
                    >
                        <div className="relative w-16 h-16 mb-6">
                            <div className="absolute inset-0 bg-indigo-600/30 rounded-full animate-ping opacity-75"></div>
                            <div className="relative w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
                                <svg className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{t('myprojects.comingSoon.title')}</h3>
                        <p className="text-gray-400 text-center max-w-xs">{t('myprojects.comingSoon.description')}</p>
                        <motion.button
                            className="mt-8 px-6 py-2 bg-white/5 text-indigo-400 rounded-full hover:bg-white/10 transition-all duration-300 border border-white/5"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t('myprojects.comingSoon.stayTuned')}
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {activeProject !== null && projects[activeProject] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={handleModalClick}
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="glass-strong rounded-2xl max-w-4xl w-full border border-white/10 shadow-2xl overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-64 md:h-80 w-full bg-black/50">
                                <Image
                                    src={projects[activeProject].image}
                                    alt={projects[activeProject].title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className="object-contain p-4"
                                />
                                <button
                                    onClick={closeProjectDetails}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors backdrop-blur-sm z-20"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="p-6 md:p-10">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">
                                            {projects[activeProject].title}
                                        </h3>
                                        <div className={`h-1 w-20 bg-gradient-to-r ${projects[activeProject].color} rounded-full`}></div>
                                    </div>
                                    <motion.a
                                        href={projects[activeProject].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaExternalLinkAlt />
                                        {t('myprojects.visitProject')}
                                    </motion.a>
                                </div>

                                <p className="text-gray-300 mb-8 leading-relaxed text-lg font-light">
                                    {projects[activeProject].description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <FaCode className="text-indigo-400" />
                                        {t('myprojects.technologies')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {projects[activeProject].technologies.map((tech, techIndex) => (
                                            <motion.span
                                                key={techIndex}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: techIndex * 0.05 }}
                                                className={`px-4 py-2 text-sm bg-gradient-to-r ${projects[activeProject].color} bg-opacity-10 border border-white/10 text-white rounded-lg`}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
