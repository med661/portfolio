import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { 
    FaGraduationCap, 
    FaSchool, 
    FaUniversity, 
    FaCalendarAlt, 
    FaTimes, 
    FaArrowLeft, 
    FaArrowRight,
    FaExternalLinkAlt,
    FaCertificate
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '@/contexts/translationContext';

// Type definitions
interface DegreeData {
    key: string;
    icon: React.ReactNode;
    colorGradient: string;
    logo: string;
    images: string[];
}

const Education: React.FC = () => {
    // State Management
    const [selectedImage, setSelectedImage] = useState<{
        src: string;
        degreeKey: string;
        index: number;
    } | null>(null);
    const [hoveredDegree, setHoveredDegree] = useState<number | null>(null);

    // Translation Hook
    const { t } = useTranslationContext();

    // Degree Configuration
    const degreesConfig: DegreeData[] = [
        {
            key: 'degree1',
            icon: <FaUniversity className="text-white text-2xl" />,
            colorGradient: "from-indigo-600 to-blue-600",
            logo: "/images/polytech.png",
            images: ["/edu/me.jpg"]
        },
        {
            key: 'degree2',
            icon: <FaSchool className="text-white text-2xl" />,
            colorGradient: "from-purple-600 to-pink-600",
            logo: "/images/polytech.png",
            images: ["/edu/eps.jpg"]
        },
        {
            key: 'degree3',
            icon: <FaGraduationCap className="text-white text-2xl" />,
            colorGradient: "from-amber-500 to-orange-500",
            logo: "/images/lts.jpeg",
            images: ["/edu/bac.jpg"]
        }
    ];

    // Image Navigation Handlers
    const handleNextImage = useCallback(() => {
        if (!selectedImage) return;

        const currentDegree = degreesConfig.find(d => d.key === selectedImage.degreeKey);
        if (!currentDegree) return;

        const newIndex = (selectedImage.index + 1) % currentDegree.images.length;
        setSelectedImage({
            src: currentDegree.images[newIndex],
            degreeKey: selectedImage.degreeKey,
            index: newIndex
        });
    }, [selectedImage, degreesConfig]);

    const handlePrevImage = useCallback(() => {
        if (!selectedImage) return;

        const currentDegree = degreesConfig.find(d => d.key === selectedImage.degreeKey);
        if (!currentDegree) return;

        const newIndex = (selectedImage.index - 1 + currentDegree.images.length) % currentDegree.images.length;
        setSelectedImage({
            src: currentDegree.images[newIndex],
            degreeKey: selectedImage.degreeKey,
            index: newIndex
        });
    }, [selectedImage, degreesConfig]);

    // Keyboard Navigation for Image Modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return;

            switch (e.key) {
                case 'Escape':
                    setSelectedImage(null);
                    break;
                case 'ArrowRight':
                    handleNextImage();
                    break;
                case 'ArrowLeft':
                    handlePrevImage();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, handleNextImage, handlePrevImage]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section 
            id="education" 
            className="relative py-16 md:py-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            
            {/* Timeline Line */}
            <div className="absolute start-8 md:start-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent hidden md:block"></div>
            <div className="absolute start-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent md:hidden"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-4 md:px-8 lg:px-12 z-10 relative"
            >
                {/* Title */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                            {t('educations.title')}
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full opacity-50"></div>
                </motion.div>

                {/* Degrees List */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-5xl mx-auto relative"
                >
                    {degreesConfig.map((degree, index) => (
                        <motion.div
                            key={degree.key}
                            variants={itemVariants}
                            onHoverStart={() => setHoveredDegree(index)}
                            onHoverEnd={() => setHoveredDegree(null)}
                            className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:text-end' : 'md:text-start'}`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute start-8 md:start-1/2 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900 border-2 border-indigo-500 z-20 shadow-[0_0_10px_rgba(99,102,241,0.5)] mt-8 md:mt-8">
                                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
                            </div>

                            {/* Card Container */}
                            <div className={`
                                relative flex flex-col md:flex-row items-center gap-8
                                ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}
                            `}>
                                {/* Spacer for Timeline Alignment */}
                                <div className="hidden md:block md:w-1/2"></div>

                                {/* Content Card */}
                                <div className="w-full md:w-1/2 ps-12 md:ps-0">
                                    <div 
                                        className={`
                                            glass-strong rounded-2xl overflow-hidden
                                            transition-all duration-500 ease-out border border-white/10
                                            hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]
                                            group
                                        `}
                                    >
                                        {/* Header & Content */}
                                        <div className="p-6 md:p-8 relative overflow-hidden">
                                            {/* Decorative Background Gradient */}
                                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${degree.colorGradient} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150`}></div>

                                            <div className="flex flex-col gap-6 relative z-10">
                                                {/* Header Row */}
                                                <div className="flex items-center gap-4 md:gap-6">
                                                    {/* Logo/Icon Box */}
                                                    <div className="flex-shrink-0">
                                                        <motion.div 
                                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                                            className={`
                                                                w-14 h-14 md:w-16 md:h-16 rounded-xl 
                                                                bg-gradient-to-br ${degree.colorGradient} 
                                                                flex items-center justify-center shadow-lg
                                                                border border-white/10 relative overflow-hidden
                                                            `}
                                                        >
                                                            {degree.logo && (
                                                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
                                                                    <Image 
                                                                        src={degree.logo}
                                                                        alt="School Logo"
                                                                        fill
                                                                        className="object-contain p-2"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[1px]">
                                                                {degree.icon}
                                                            </div>
                                                        </motion.div>
                                                    </div>

                                                    {/* Title & Info */}
                                                    <div className="flex-grow text-start">
                                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                                            {t(`educations.${degree.key}.title`)}
                                                        </h3>
                                                        <div className="flex flex-col gap-1 text-gray-400 text-sm md:text-base">
                                                            <span className="flex items-center gap-2">
                                                                <FaSchool className="text-indigo-500" />
                                                                {t(`educations.${degree.key}.school`)}
                                                            </span>
                                                            <span className="flex items-center gap-2">
                                                                <FaCalendarAlt className="text-indigo-500" />
                                                                {t(`educations.${degree.key}.date`)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="w-full h-px bg-white/10"></div>

                                                {/* Description */}
                                                <div className="flex items-start gap-3">
                                                    <FaCertificate className="text-indigo-400 mt-1 flex-shrink-0" />
                                                    <p className="text-gray-300 leading-relaxed text-start">
                                                        {t(`educations.${degree.key}.description`)}
                                                    </p>
                                                </div>

                                                {/* Image Gallery (Always Visible) */}
                                                {degree.images.length > 0 && (
                                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                                        {degree.images.map((img, imgIndex) => (
                                                            <motion.div
                                                                key={img}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                className="relative aspect-video rounded-lg overflow-hidden group/image cursor-pointer border border-white/10 shadow-md"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedImage({
                                                                        src: img,
                                                                        degreeKey: degree.key,
                                                                        index: imgIndex
                                                                    });
                                                                }}
                                                            >
                                                                <Image
                                                                    src={img}
                                                                    alt={`${t(`educations.${degree.key}.title`)} proof`}
                                                                    fill
                                                                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                                    <FaExternalLinkAlt className="text-white" />
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full h-[80vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={selectedImage.src}
                                    alt="Diploma Preview"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            
                            {/* Controls */}
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors"
                            >
                                <FaArrowLeft size={20} />
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors"
                            >
                                <FaArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm text-white text-sm">
                                {selectedImage.index + 1} / {degreesConfig.find(d => d.key === selectedImage.degreeKey)?.images.length}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Education;
