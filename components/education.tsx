import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { 
    FaGraduationCap, 
    FaSchool, 
    FaUniversity, 
    FaCalendarAlt, 
    FaMapMarkerAlt, 
    FaChevronDown, 
    FaTimes, 
    FaArrowLeft, 
    FaArrowRight 
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
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<{
        src: string;
        degreeKey: string;
        index: number;
    } | null>(null);

    // Translation Hook
    const { t } = useTranslationContext();

    // Degree Configuration
    const degreesConfig: DegreeData[] = [
        {
            key: 'degree1',
            icon: <FaUniversity className="text-white text-3xl" />,
            colorGradient: "from-indigo-600 to-blue-600",
            logo: "/images/polytech.png",
            images: ["/edu/me.jpg"]
        },
        {
            key: 'degree2',
            icon: <FaSchool className="text-white text-3xl" />,
            colorGradient: "from-purple-600 to-pink-600",
            logo: "/images/polytech.png",
            images: ["/edu/eps.jpg"]
        },
        {
            key: 'degree3',
            icon: <FaGraduationCap className="text-white text-3xl" />,
            colorGradient: "from-amber-500 to-orange-500",
            logo: "/images/bac.png",
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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section 
            id="education" 
            className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center"
        >
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-6 md:px-8 lg:px-12 z-10"
            >
                {/* Title */}
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white text-center"
                >
                    <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('educations.title')}
                    </span>
                </motion.h2>

                {/* Degrees List */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-5xl mx-auto space-y-8"
                >
                    {degreesConfig.map((degree, index) => (
                        <motion.div
                            key={degree.key}
                            variants={itemVariants}
                            className={`bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden 
                                border border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300
                                ${expandedItem === index ? `ring-2 ring-offset-2 ring-offset-gray-900 ring-opacity-60 ${degree.colorGradient.split(' ')[0].replace('from-', 'ring-')}` : ''}`}
                        >
                            {/* Degree Header */}
                            <div 
                                className="p-6 cursor-pointer"
                                onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${degree.colorGradient} rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 ${expandedItem === index ? 'scale-110' : ''}`}>
                                            {degree.icon}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl md:text-2xl font-bold text-white transition-colors duration-300">
                                                {t(`educations.${degree.key}.title`)}
                                            </h3>
                                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-gray-300">
                                                <p className="flex items-center">
                                                    <FaMapMarkerAlt className="mr-2 text-indigo-400" />
                                                    {t(`educations.${degree.key}.school`)}
                                                </p>
                                                <p className="flex items-center mt-1 md:mt-0">
                                                    <FaCalendarAlt className="mr-2 text-indigo-400" />
                                                    {t(`educations.${degree.key}.date`)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Expand/Collapse Indicator */}
                                    <motion.div
                                        animate={{ rotate: expandedItem === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${degree.colorGradient} bg-opacity-20`}
                                    >
                                        <FaChevronDown className="text-white" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            <AnimatePresence>
                                {expandedItem === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="px-6 pb-6"
                                    >
                                        <div className={`w-full h-1 bg-gradient-to-r ${degree.colorGradient} rounded-full mb-6`}></div>
                                        
                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            {t(`educations.${degree.key}.description`)}
                                        </p>
                                        
                                        {/* Image Gallery */}
                                        {degree.images.length > 0 && (
                                            <div className="mt-6">
                                                
                                                <div className="flex flex-wrap gap-4">
                                                    {degree.images.map((img, imgIndex) => (
                                                        <motion.div
                                                            key={img}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: imgIndex * 0.1 }}
                                                            className="relative h-32 w-32 overflow-hidden rounded-lg cursor-pointer group"
                                                            onClick={() => setSelectedImage({
                                                                src: img,
                                                                degreeKey: degree.key,
                                                                index: imgIndex
                                                            })}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Image
                                                                src={img}
                                                                alt={`${t(`educations.${degree.key}.title`)} image ${imgIndex + 1}`}
                                                                fill
                                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                                                                <span className="text-white text-sm font-medium">View</span>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative bg-gray-900/95 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image Display */}
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={selectedImage.src}
                                    alt={`Education image ${selectedImage.index + 1}`}
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 bg-gray-800/60 text-white p-2.5 rounded-full hover:bg-gray-700 transition-colors duration-300 z-10"
                            >
                                <FaTimes className="text-xl" />
                            </button>

                            {/* Navigation Buttons */}
                            {degreesConfig.find(d => d.key === selectedImage.degreeKey)!.images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/60 text-white p-3 rounded-full hover:bg-gray-700 transition-colors duration-300 z-10"
                                    >
                                        <FaArrowLeft className="text-xl" />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/60 text-white p-3 rounded-full hover:bg-gray-700 transition-colors duration-300 z-10"
                                    >
                                        <FaArrowRight className="text-xl" />
                                    </button>
                                </>
                            )}

                            {/* Image Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-white text-lg font-medium">
                                        {t(`educations.${selectedImage.degreeKey}.title`)}
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        {selectedImage.index + 1} / {degreesConfig.find(d => d.key === selectedImage.degreeKey)!.images.length}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Education;