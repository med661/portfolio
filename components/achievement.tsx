import { useTranslationContext } from '../contexts/translationContext';
import React, { useState } from 'react';
import { FaDocker, FaJs, FaDatabase, FaPhp, FaLinux, FaTools, FaExternalLinkAlt, FaAward } from 'react-icons/fa';
import { SiKubernetes, SiTerraform } from 'react-icons/si';
import { motion } from 'framer-motion';

const ProofOfAchievement: React.FC = () => {
    const { t } = useTranslationContext();
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    
    const achievements = [
        {
            icon: <FaDocker />,
            title: "Docker Training Course for the Absolute Beginners",
            platform: "Kodekloud",
            link: "https://learn.kodekloud.com/certificate/2D0F952D05CE-2D0F8F287ED2-2D0D712B90A6",
            bgColor: "from-blue-600 to-blue-400"
        },
        {
            icon: <FaJs />,
            title: "JavaScript Algorithms and Data Structures",
            platform: "FreeCodeCamp",
            link: "https://www.freecodecamp.org/certification/fccea7be283-656f-47eb-bd0a-f90e51e05434/javascript-algorithms-and-data-structures",
            bgColor: "from-yellow-500 to-yellow-300"
        },
        {
            icon: <FaDatabase />,
            title: "MongoDB CRUD Operations in Node.js",
            platform: "MongoDB",
            link: "https://learn.mongodb.com/c/rYt0ydWWRROdkJDcO7YGHQ",
            bgColor: "from-green-600 to-green-400"
        },
        {
            icon: <FaPhp />,
            title: "PHP and MySQL Certificate",
            platform: "Udemy",
            link: "https://www.udemy.com/certificate/UC-e89f178c-5d42-4557-8030-677d735a16ef/",
            bgColor: "from-purple-600 to-purple-400"
        },
        {
            icon: <FaTools />,
            title: "DevOps Pre-Requisite Course",
            platform: "Kodekloud",
            link: "https://learn.kodekloud.com/user/certificate/815cbbac-29c8-4bd6-8725-c5c18194adfc",
            bgColor: "from-red-600 to-red-400"
        },
        {
            icon: <FaLinux />,
            title: "Learning Linux Basics Course & Labs",
            platform: "Kodekloud",
            link: "https://learn.kodekloud.com/certificate/975e1983-7f4a-4be4-9bd7-312aa51d9dce",
            bgColor: "from-orange-600 to-orange-400"
        },
        {
            icon: <SiTerraform />,
            title: "Terraform Basics Training Course",
            platform: "Kodekloud",
            link: "https://certificates.kodekloud.com/71da4f66-efa9-4e0b-b9ca-a26fbd15d29f/205d96ca-2463-4b3b-a27f-3d46b86cabe4/7565608a-3b0b-4aef-8011-03dd1e73baff.pdf",
            bgColor: "from-teal-600 to-teal-400"
        },
        {
            icon: <SiKubernetes />,
            title: "Kubernetes for the Absolute Beginners",
            platform: "Kodekloud",
            link: "https://learn.kodekloud.com/user/certificate/30f7444f-fb3d-4dd9-a682-065d12c15cac",
            bgColor: "from-blue-500 to-blue-300"
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
    
    return (
        <section id="proof-of-achievement" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            <div className="container mx-auto px-4 md:px-8 z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white text-center relative"
                    >
                        <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                            {t('proofofcompletion.title')}
                        </span>
                    </motion.h2>

                    <motion.div 
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto"
                    >
                        {achievements.map((achievement, index) => (
                            <motion.div 
                                key={index}
                                variants={item}
                                onHoverStart={() => setHoveredCard(index)}
                                onHoverEnd={() => setHoveredCard(null)}
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <a 
                                    href={achievement.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block h-full"
                                >
                                    <div className="relative h-full bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm 
                                                  rounded-xl overflow-hidden border border-gray-700/30 shadow-lg
                                                  hover:shadow-2xl transition-all duration-300">
                                        {/* Animated gradient border effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${achievement.bgColor} opacity-0 
                                                      hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>
                                        
                                        <div className="p-8 flex flex-col h-full">
                                            <div className="flex items-start mb-6">
                                                <div className={`flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${achievement.bgColor} 
                                                              flex items-center justify-center shadow-lg transform 
                                                              transition-transform duration-300 ${hoveredCard === index ? 'scale-110 rotate-6' : ''}`}>
                                                    <div className="text-white text-xl">
                                                        {achievement.icon}
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-grow">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 
                                                                transition-colors duration-300 line-clamp-2">
                                                        {achievement.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-auto flex justify-between items-center">
                                                <span className={`px-4 py-1 rounded-full text-sm font-medium 
                                                               bg-gradient-to-r ${achievement.bgColor} bg-opacity-20 text-white`}>
                                                    {achievement.platform}
                                                </span>
                                                
                                                <motion.div
                                                    initial={{ opacity: 0.6 }}
                                                    animate={{ opacity: hoveredCard === index ? 1 : 0.6 }}
                                                    className="text-white"
                                                >
                                                    <FaExternalLinkAlt className={`transition-transform duration-300 ${
                                                        hoveredCard === index ? 'scale-125' : 'scale-100'
                                                    }`} />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProofOfAchievement;
