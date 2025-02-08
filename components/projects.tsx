import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
    const projects = [
        {
            title: "Discord Clone",
            image: "/images/discord.png",
            description: "An application allowing users to communicate via messages and create group video conferencing rooms.",
            technologies: ["React", "Node.js", "Socket.IO", "MongoDB"],
            link: "https://www.linkedin.com/feed/update/urn:li:activity:6993499902005686273/"
        },
        {
            title: "Real-Time Chat App",
            image: "/images/chat.png",
            description: "An application that allows users to create accounts and communicate via real-time messaging.",
            technologies: ["NestJS", "TypeScript", "GraphQL", "React.js", "Redux Thunk"],
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
                <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        My Projects
                    </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700"
                        >
                            <div className="relative group">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={500}
                                    height={300}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <a
                                        href={project.link}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg transform hover:scale-105 transition-transform"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Project
                                    </a>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 text-xs bg-indigo-600/20 text-indigo-400 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 p-6 flex flex-col items-center justify-center min-h-[400px]"
                    >
                        <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
                        <p className="text-gray-400">More exciting projects in development</p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;