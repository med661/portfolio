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
    }, [changeLanguage])

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
        <section id="experience" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            <div className="container mx-auto px-4 z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white text-center relative animate-fadeIn">
                    <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('experiences.title')}
                    </span>
                </h2>

                <div className="container mx-auto flex justify-center">
                    <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-xl relative mx-4 max-w-4xl w-full border border-gray-700/30">
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

                        <div className="space-y-8">
                            {projectKeys.map((projectKey, index) => (
                                <motion.div
                                    key={projectKey}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-gray-700/30 p-6 rounded-xl hover:bg-gray-700/40 transition-all duration-300 border border-gray-600/20 hover:border-gray-600/40"
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
                                                    <FaCheckCircle className="inline-block text-indigo-500 mr-2" />
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
                                                            className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full text-xs md:text-sm hover:bg-indigo-600/30 transition-colors duration-300"
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
                                                onClick={() => setSelectedImage(getImagePath(projectKey))}
                                            >
                                                <div className="bg-gray-800/50 p-4 rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-md">
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

                        <div className="mt-16 mb-8">
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
                                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                                Meetups 
                                </span>
                            </h3>
                            <motion.div className="relative h-64 flex justify-center items-center">
                                {meetupImages.map((image, index) => {
                                    const centerOffset = (meetupImages.length - 1) * 50;
                                    return (
                                        <motion.div
                                            key={index}
                                            className="absolute w-48 h-48 cursor-pointer"
                                            initial={{ 
                                                rotate: -10 + (index * 5),
                                                x: -centerOffset + (index * 100),
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
                                                    ? 0
                                                    : -centerOffset + (index * 100),
                                            }}
                                            onClick={() => {
                                                setSelectedImageIndex(index);
                                                setSelectedImage(image.src);
                                            }}
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={image.src}
                                                    alt={image.alt}
                                                    fill
                                                    className="object-cover rounded-lg shadow-lg"
                                                />
                                                <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 shadow-md" />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced image modal with better UI/UX */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-4 rounded-2xl max-w-5xl w-full overflow-hidden border border-gray-700/30 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl group">
                                <Image
                                    src={selectedImage}
                                    alt="Selected Image"
                                    fill
                                    quality={100}
                                    sizes="(max-width: 768px) 100vw, 1200px"
                                    className="object-contain transform transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(null);
                                    }}
                                    className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 backdrop-blur-sm z-10"
                                    aria-label="Close image preview"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </motion.button>

                                {meetupImages.length > 1 && (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.1, x: -5 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                prevImage();
                                                const currentIndex = selectedImageIndex !== null ? selectedImageIndex : 0;
                                                const newIndex = currentIndex > 0 ? currentIndex - 1 : meetupImages.length - 1;
                                                setSelectedImage(meetupImages[newIndex].src);
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition-all duration-300 backdrop-blur-sm group z-10"
                                            aria-label="Previous image"
                                        >
                                            <FaArrowLeft className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1, x: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                nextImage();
                                                const currentIndex = selectedImageIndex !== null ? selectedImageIndex : 0;
                                                const newIndex = currentIndex < meetupImages.length - 1 ? currentIndex + 1 : 0;
                                                setSelectedImage(meetupImages[newIndex].src);
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition-all duration-300 backdrop-blur-sm group z-10"
                                            aria-label="Next image"
                                        >
                                            <FaArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                                        </motion.button>
                                    </>
                                )}
                            </div>
                            
                            <div className="mt-4 px-2">
                                <div className="flex items-center justify-between">
                                    <motion.h3 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xl text-white font-medium"
                                    >
                                        {selectedImageIndex !== null && meetupImages[selectedImageIndex].alt}
                                    </motion.h3>
                                    {meetupImages.length > 1 && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-gray-400 text-sm"
                                        >
                                            {selectedImageIndex !== null ? selectedImageIndex + 1 : 1} / {meetupImages.length}
                                        </motion.div>
                                    )}
                                </div>
                                
                                <motion.div 
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Experience;