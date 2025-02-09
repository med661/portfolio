import Image from 'next/image';
import React, { useState } from 'react';
import { FaGraduationCap, FaSchool, FaUniversity, FaChevronRight, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '@/contexts/translationContext';

const Education: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { t } = useTranslationContext();

    const degreeKeys = ['degree1', 'degree2', 'degree3'];
    const icons = {
        degree1: <FaUniversity className="text-white text-3xl" />,
        degree2: <FaSchool className="text-white text-3xl" />,
        degree3: <FaGraduationCap className="text-white text-3xl" />
    };

    const logoMap = {
        degree1: "/images/polytech.png",
        degree2: "/images/polytech.png"
    };

    const imagesMap = {
        degree1: ["/edu/me.jpg"],
        degree2: ["/edu/eps.jpg"],
        degree3: ["/edu/bac.jpg"]
    };

    return (
        <section id="education" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-6 md:px-8 lg:px-12 text-center z-10"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        {t('educations.title')}
                    </span>
                </h2>

                <div className="space-y-6">
                    {degreeKeys.map((degreeKey, index) => (
                        <motion.div
                            key={degreeKey}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                            onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                        >
                            <div className="flex items-center justify-between cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                        {icons[degreeKey as keyof typeof icons]}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                                            {t(`educations.${degreeKey}.title`)}
                                        </h3>
                                        <p className="text-indigo-400">{t(`educations.${degreeKey}.school`)}</p>
                                        <p className="text-gray-400">{t(`educations.${degreeKey}.date`)}</p>
                                    </div>
                                </div>
                                {logoMap[degreeKey as keyof typeof logoMap] && (
                                    <div className="flex items-center space-x-4">
                                        <Image 
                                            src={logoMap[degreeKey as keyof typeof logoMap]} 
                                            alt={t(`educations.${degreeKey}.school`)}
                                            width={60} 
                                            height={60}
                                            className="rounded-lg"
                                        />
                                        <FaChevronRight
                                            className={`text-gray-400 transition-transform duration-300 ${
                                                expandedItem === index ? 'rotate-90' : ''
                                            }`}
                                        />
                                    </div>
                                )}
                            </div>

                            {expandedItem === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="mt-4 text-center"
                                >
                                    <p className="text-gray-300 mb-4">
                                        {t(`educations.${degreeKey}.description`)}
                                    </p>
                                    
                                    {imagesMap[degreeKey as keyof typeof imagesMap]?.length > 0 && (
                                        <div className="flex justify-center items-center mt-6 space-x-4">
                                            {imagesMap[degreeKey as keyof typeof imagesMap].map((img, imgIndex) => (
                                                <motion.div
                                                    key={imgIndex}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: imgIndex * 0.2, duration: 0.5, ease: "easeInOut" }}
                                                    className="relative h-48 w-48 overflow-hidden rounded-lg group cursor-pointer"
                                                    onClick={() => setSelectedImage(img)}
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`${t(`educations.${degreeKey}.title`)} image ${imgIndex + 1}`}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-500" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

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
                                alt="Selected Image"
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

export default Education;
