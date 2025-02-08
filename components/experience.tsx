import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '@/contexts/translationContext';

const Experience = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t, changeLanguage } = useTranslationContext();

  useEffect(() => {
    changeLanguage("en");
  }, []);  // Remove i18n.language dependency as it's not needed

    const projects = [
        {
            title: "Plateforme DeFi",
            image: "/images/91funds.png",
            tasks: [
                " A dynamic ecosystem platform that connects various stakeholders engaged in entrepreneurial activities.",
                
            ],
            tech: ["NestJS", "Mongoose", "TypeScript", "Node.js", "Redis"]
        },
        {
            title: "Plateforme de Création Vidéo",
            image: "/images/p1.png",
            tasks: [
                "Developed a video content platform offering legal access to movie and TV show clips in social media-friendly formats, implementing precise video trimming with 90% processing time reduction, and robust copyright compliance systems for content management.",            ],
            tech: ["Node.js", "Express", "Mongoose", "FFmpeg", "Stripe"]
        },
        {
            title: "Plateforme de Soutien aux Entrepreneurs",
            image: "/images/dao2.png",
            tasks: [
                " A dynamic ecosystem platform that connects various stakeholders engaged in entrepreneurial activities",
            ],
            tech: ["Node.js", "Express.js", "PostgreSQL"]
        }
    ];

    return (
        <section id="experience" className="py-16 bg-gray-900 min-h-screen flex items-center">
            <div className="container mx-auto px-6 flex justify-center">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative mx-4 max-w-4xl w-full">
                    <motion.header 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                                    {t('experiences.title')}
                                </span>
                            </h2>
                        </div>
                    </motion.header>

                    <div className="flex items-center justify-between mb-8">
                        <div className="text-xl md:text-2xl font-semibold text-white">
                            Développeur Back-End | Darblochain
                            <time className="block text-gray-400">Nov 2022 – Jan 2025</time>
                        </div>
                        <Image
                            src="/images/assetdar.png"
                            alt="Darblochain Logo"
                            width={150}
                            height={100}
                            className="object-contain"
                        />
                    </div>

                    <div className="space-y-12">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-700/30 p-6 rounded-lg hover:bg-gray-700/40 transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">{project.title}</h3>
                                        
                                        <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                                            {project.tasks.map((task, taskIndex) => (
                                                <motion.li 
                                                    key={taskIndex}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: (index * 0.2) + (taskIndex * 0.1) }}
                                                >
                                                    <FaCheckCircle className="inline-block text-indigo-600 mr-2" />
                                                    {task}
                                                </motion.li>
                                            ))}
                                        </ul>

                                        <div className="mt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech, techIndex) => (
                                                    <motion.span 
                                                        key={techIndex}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: (index * 0.2) + (techIndex * 0.1) }}
                                                        className="px-3 py-1 bg-indigo-700/20 text-indigo-300 rounded-full text-xs md:text-sm hover:bg-indigo-700/30 transition-colors duration-300"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0 flex items-center">
                                        <div 
                                            className="relative cursor-pointer group"
                                            onClick={() => setSelectedImage(project.image)}
                                        >
                                            <div className="bg-gray-700/50 p-4 rounded-lg transition-transform duration-300 group-hover:scale-105">
                                                <Image 
                                                    src={project.image}
                                                    alt={`${project.title} Logo`}
                                                    width={150}
                                                    height={150}
                                                    style={{ objectFit: 'contain' }}
                                                    className="transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <FaExternalLinkAlt className="text-white text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative bg-gray-800 p-8 rounded-lg max-w-4xl max-h-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-6 -right-6 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                            >
                                <FaTimes />
                            </button>
                            <Image
                                src={selectedImage}
                                alt="Project Preview"
                                width={800}
                                height={600}
                                style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                                className="rounded-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Experience;