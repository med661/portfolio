import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslationContext } from '../contexts/translationContext';
import GproConsultingLogo from '@/public/images/gpro.jpeg';
import SatoripopLogo from '@/public/images/satoripop.jpeg';

const Internships: React.FC = () => {
    const { t } = useTranslationContext();

    const internshipData = [
        {
            logo: GproConsultingLogo,
            company: "Gpro Consulting",
            project: "SkillsyncEduct",
            period: "Feb 2023 - June 2023",
            description: t("internship.gpro.description"),
            tech: "React Js, Node JS, Express JS, Redux-Toolkit, Mongoose, Git, OAuth 2.0, Cloudinary"
        },
        {
            logo: SatoripopLogo,
            company: "Satoripop",
            project: "Premier League App",
            period: "July 2021 - Sept 2021",
            description: t("internship.satoripop.description"),
            tech: "React Native, Firebase, Express JS, Node JS"
        }
    ];

    return (
        <section id="internship" className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        {t('internships')}
                    </span>
                </motion.h2>

                <div className="flex flex-wrap justify-center gap-12">
                    {internshipData.map((internship, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md mx-4 border border-gray-700/50"
                        >
                            <div className="flex items-center mb-6">
                                <div className="relative w-16 h-16 mr-4">
                                    <Image
                                        src={internship.logo}
                                        alt={`${internship.company} Logo`}
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{internship.company}</h3>
                                    <p className="text-blue-400">{internship.project}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="inline-block px-3 py-1 bg-blue-500/10 rounded-full">
                                    <p className="text-blue-400 text-sm">{internship.period}</p>
                                </div>
                                
                                <p className="text-gray-300 leading-relaxed">
                                    {internship.description}
                                </p>
                                
                                <div className="pt-4 border-t border-gray-700">
                                    <h4 className="text-sm font-semibold text-gray-400 mb-2">
                                        {t('internship.technologies')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {internship.tech.split(', ').map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Internships;
