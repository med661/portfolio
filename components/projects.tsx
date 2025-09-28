import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '../contexts/translationContext';
import { FaGithub, FaExternalLinkAlt, FaCode, FaLaptopCode } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';

const Projects: React.FC = () => {
    const { t } = useTranslationContext();
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const projects = [

     
        {
            title: t("myprojects.learnHub.title"),
            image: "/images/elhub.png",
            description: t("myprojects.learnHub.description"),
            technologies: ["NestJS", "GraphQL", "PostgreSQL", "TypeORM", "Redux Thunk"],
            link: "https://knowledgehubster.vercel.app/",
            color: "from-blue-600 to-blue-400"
        },
        {
            title: t("myprojects.jobHuntDiary.title"),
            image: "/images/hunt.png",
            description: t("myprojects.jobHuntDiary.description"),
            technologies: ["Node.js","React.js","ExpressJS","Mongodb", "Redux Thunk"],
            link: "https://job-hunt-diary.vercel.app/",
            color: "from-emerald-500 to-teal-500" ,
        },
        {
            title: t("myprojects.realtimeChat.title"),
            image: "/images/chat.png",
            description: t("myprojects.realtimeChat.description"),
            technologies: ["NestJS", "TypeScript", "Prisma", "React.js", "Redux Thunk"],
            link: "https://www.linkedin.com/feed/update/urn:li:activity:7163459271488180224/",
            color: "from-pink-600 to-pink-400"
        },
        {
            title: t("myprojects.portfolio.title"),
            image: "/images/portfolio.png",
            description: t("myprojects.portfolio.description"),
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "i18next", "React"],
            link: "/",
            color: "from-indigo-600 to-indigo-400"
        },
        {
            title: t("myprojects.ecommerceBackend.title"),
            image: "/images/ec.jpeg",
            description: t("myprojects.ecommerceBackend.description"),
            technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "AWS S3", "REST API"],
            link: "https://github.com/med661/ecommerce-backend",
            color: "from-amber-600 to-amber-400"
        },

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

    const openProjectDetails = (index: number) => {
        setActiveProject(index);
        document.body.style.overflow = 'hidden';
    };

    const closeProjectDetails = () => {
        setActiveProject(null);
        document.body.style.overflow = 'auto';
    };

    const handleModalClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeProjectDetails();
        }
    };

    return (
        <section id="projects" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
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
                            className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700/30 hover:border-indigo-500/30 h-full flex flex-col"
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="relative overflow-hidden group h-52">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{ objectPosition: 'center' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();  // Add this to prevent event bubbling
                                            openProjectDetails(index);
                                        }}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 w-full justify-center hover:bg-indigo-700 transition-colors z-10"  // Added w-full, justify-center, and z-10
                                    >
                                        <FaLaptopCode />
                                        {t('myprojects.viewDetails')}
                                    </motion.button>
                                </div>

                                {/* Gradient overlay based on project color */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                                ></div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="w-16 h-1 bg-indigo-600 mb-4 rounded-full"></div>
                                <p className="text-gray-300 mb-6 text-sm leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className={`px-3 py-1 text-xs bg-gradient-to-r ${project.color} bg-opacity-20 text-white rounded-full`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span
                                                className="px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-full cursor-pointer hover:bg-gray-700/70 transition-colors"
                                                onClick={() => openProjectDetails(index)}
                                            >
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-sm"
                                        >
                                            <FaExternalLinkAlt className="text-xs" />
                                            {t('myprojects.visitProject')}
                                        </a>

                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => openProjectDetails(index)}
                                            className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 hover:bg-indigo-600/30 transition-colors"
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
                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700/30 p-6 flex flex-col items-center justify-center min-h-[380px] hover:border-indigo-500/30"
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
                        <motion.button
                            className="mt-6 px-6 py-2 bg-indigo-600/20 text-indigo-400 rounded-lg hover:bg-indigo-600/30 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {"Stay Tuned"}
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {activeProject !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={handleModalClick}
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700/50"
                        >
                            <div className="relative h-64 md:h-80">
                                <Image
                                    src={projects[activeProject].image}
                                    alt={projects[activeProject].title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                                <button
                                    onClick={closeProjectDetails}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6 md:p-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    {projects[activeProject].title}
                                </h3>

                                <div className="w-20 h-1 bg-indigo-600 mb-6 rounded-full"></div>

                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    {projects[activeProject].description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
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
                                                className={`px-4 py-2 text-sm bg-gradient-to-r ${projects[activeProject].color} bg-opacity-20 text-white rounded-lg`}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <motion.a
                                        href={projects[activeProject].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaExternalLinkAlt />
                                        {t('myprojects.visitProject')}
                                    </motion.a>
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
