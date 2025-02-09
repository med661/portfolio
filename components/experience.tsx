import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '@/contexts/translationContext';

const Experience = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { t, changeLanguage } = useTranslationContext();



        const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            changeLanguage("en");
            isFirstRender.current = false;
        }
    }, [])

    const meetupImages = [
        { src: "/eximages/dar.jpg", alt: "Meetup 1" },
        { src: "/eximages/li.jpg", alt: "Meetup 2" },
    ];

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev !== null && prev < meetupImages.length - 1 ? prev + 1 : 0));
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : meetupImages.length - 1));
    };
    const projectKeys = ['project1', 'project2', 'project3'];

    // Helper function to validate image path
    const getImagePath = (key: string): string => {
        const path = t(`experiences.job1.projects.${key}.image`);
        if (!path || !path.startsWith('/')) {
            return '/images/placeholder.png'; // Fallback image
        }
        return path;
    };

    const getTechnologies = (projectKey: string): string[] => {
        const techs = t(`experiences.job1.projects.${projectKey}.technologies`);
        // Handle both array and string formats
        if (typeof techs === 'string') {
            return techs.split(',');
        }
        return [];
    };

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
                            {t("experiences.job1.title")} | {t("experiences.job1.company")}
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
                        {projectKeys.map((projectKey, index) => (
                            <motion.div
                                key={projectKey}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-700/30 p-6 rounded-lg hover:bg-gray-700/40 transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                                            {t(`experiences.job1.projects.${projectKey}.title`)}
                                        </h3>

                                        <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                                            <motion.li
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.2 }}
                                            >
                                                <FaCheckCircle className="inline-block text-indigo-600 mr-2" />
                                                {t(`experiences.job1.projects.${projectKey}.description`)}
                                            </motion.li>
                                        </ul>

                                        <div className="mt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {getTechnologies(projectKey).map((tech: string, techIndex: number) => (
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
                                            onClick={() => setSelectedImage(t(`experiences.job1.projects.${projectKey}.image`))}
                                        >
                                            <div className="bg-gray-700/50 p-4 rounded-lg transition-transform duration-300 group-hover:scale-105">
                                                <Image
                                                    src={getImagePath(projectKey)}
                                                    alt={t(`experiences.job1.projects.${projectKey}.title`)}
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




                    <motion.div className="mt-16 relative h-64 flex justify-center items-center">
            {meetupImages.map((image, index) => {
                const centerOffset = (meetupImages.length - 1) * 50; // Adjust the offset calculation as needed
                return (
                    <motion.div
                        key={index}
                        className="absolute w-48 h-48 cursor-pointer"
                        initial={{ 
                            rotate: -10 + (index * 5),
                            x: -centerOffset + (index * 100), // Center the cards
                            scale: 0.95
                        }}
                        whileHover={{ 
                            scale: 1.1, 
                            rotate: 0,
                            zIndex: 10,
                            transition: { duration: 0.3 }
                        }}
                        animate={{
                            scale: selectedImageIndex === index ? 1.2 : 0.95,
                            zIndex: selectedImageIndex === index ? 20 : index,
                            rotate: selectedImageIndex === index ? 0 : -10 + (index * 5),
                            x: selectedImageIndex === index 
                                ? 0 // Center the selected card
                                : -centerOffset + (index * 100), // Maintain centered spacing for unselected cards
                        }}
                        onClick={() => setSelectedImageIndex(index)}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover rounded-lg shadow-lg"
                            />
                            <div className="absolute inset-0 rounded-lg ring-1 ring-black/10" />
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
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

            {/* Image Modal with Carousel */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8" onClick={() => setSelectedImageIndex(null)}>
                        <motion.div className="relative bg-gray-800 p-8 rounded-lg max-w-4xl max-h-full flex items-center">
                            <button onClick={prevImage} className="absolute left-4 text-white p-2">
                                <FaArrowLeft size={30} />
                            </button>
                            <div className="relative w-[600px] h-[400px]">
                                <Image src={meetupImages[selectedImageIndex].src} alt="Preview" fill className="object-contain rounded-lg" />
                            </div>
                            <button onClick={nextImage} className="absolute right-4 text-white p-2">
                                <FaArrowRight size={30} />
                            </button>
                            <button onClick={() => setSelectedImageIndex(null)} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                                <FaTimes />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Experience;