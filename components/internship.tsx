import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslationContext } from '../contexts/translationContext';
import GproConsultingLogo from '@/public/images/gpro.jpeg';
import SatoripopLogo from '@/public/images/satoripop.jpeg';
import { FaCalendarAlt, FaCode, FaExternalLinkAlt, FaBuilding, FaLaptopCode } from 'react-icons/fa';

const Internships: React.FC = () => {
    const { t } = useTranslationContext();
    const [activeInternship, setActiveInternship] = useState<number>(0);

    const internshipData = [
        {
            logo: GproConsultingLogo,
            company: "Gpro Consulting",
            project: "SkillsyncEduct",
            period: "Feb 2023 - June 2023",
            description: t("internship.gpro.description"),
            tech: "React Js, Node JS, Express JS, Redux-Toolkit, Mongoose, Git, OAuth 2.0, Cloudinary",
            color: "from-blue-600 to-blue-400"
        },
        {
            logo: SatoripopLogo,
            company: "Satoripop",
            project: "Premier League App",
            period: "July 2021 - Sept 2021",
            description: t("internship.satoripop.description"),
            tech: "React Native, Firebase, Express JS, Node JS",
            color: "from-purple-600 to-purple-400"
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
        <section id="internship" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
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
                        {t('internships')}
                    </span>
                </motion.h2>

                {/* Internship Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="flex space-x-4 bg-gray-800/30 backdrop-blur-sm p-2 rounded-xl">
                        {internshipData.map((internship, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setActiveInternship(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                                    activeInternship === index 
                                        ? `bg-gradient-to-r ${internship.color} text-white shadow-lg` 
                                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                                }`}
                            >
                                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                    <Image
                                        src={internship.logo}
                                        alt={internship.company}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span className="font-medium">{internship.company}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Internship Details */}
                <motion.div 
                    key={activeInternship}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/30 shadow-xl">
                        <div className="md:flex">
                            {/* Left Column - Logo and Basic Info */}
                            <div className={`md:w-1/3 p-8 bg-gradient-to-br ${internshipData[activeInternship].color} bg-opacity-10`}>
                                <div className="flex flex-col items-center">
                                    <motion.div 
                                        className="relative w-32 h-32 mb-6 rounded-xl overflow-hidden shadow-lg"
                                        whileHover={{ scale: 1.05, rotate: 3 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                    >
                                        <Image
                                            src={internshipData[activeInternship].logo}
                                            alt={`${internshipData[activeInternship].company} Logo`}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-2 text-center">
                                        {internshipData[activeInternship].company}
                                    </h3>
                                    
                                    <div className={`px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${internshipData[activeInternship].color} bg-opacity-20 text-white mb-6`}>
                                        {internshipData[activeInternship].project}
                                    </div>
                                    
                                    <div className="flex items-center text-gray-300 mb-4">
                                        <FaCalendarAlt className="mr-2 text-indigo-400" />
                                        <span>{internshipData[activeInternship].period}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Column - Description and Technologies */}
                            <div className="md:w-2/3 p-8">
                                <div className="mb-8">
                                    <h4 className="flex items-center text-xl font-semibold text-indigo-400 mb-4">
                                        <FaLaptopCode className="mr-2" />
                                        {t('internship.projectDetails')}
                                    </h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        {internshipData[activeInternship].description}
                                    </p>
                                </div>
                                
                                <div>
                                    <h4 className="flex items-center text-xl font-semibold text-indigo-400 mb-4">
                                        <FaCode className="mr-2" />
                                        {t('internship.technologies')}
                                    </h4>
                                    <motion.div 
                                        variants={container}
                                        initial="hidden"
                                        animate="show"
                                        className="flex flex-wrap gap-2"
                                    >
                                        {internshipData[activeInternship].tech.split(', ').map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                variants={item}
                                                whileHover={{ 
                                                    scale: 1.05, 
                                                    backgroundColor: 'rgba(99, 102, 241, 0.3)' 
                                                }}
                                                className={`px-3 py-1 text-sm bg-gray-700/50 text-gray-200 rounded-md flex items-center transition-all duration-300`}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Internships;
