import React from 'react';
import { motion } from 'framer-motion';

interface CVDownloadSectionProps {
    t: (key: string) => string;
}

export const CVDownloadSection: React.FC<CVDownloadSectionProps> = ({ t }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
        >
            <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold mb-6 text-white text-center"
            >
                {t('aboutme.cv.title')}
            </motion.h3>
            <div className="flex justify-center space-x-4">
                <motion.a
                    href="/cv/fr.pdf"
                    download
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t('aboutme.cv.english')}
                </motion.a>
                <motion.a
                    href="/cv/salah_sfar_cv_fr.pdf"
                    download
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t('aboutme.cv.french')}
                </motion.a>
            </div>
        </motion.div>
    );
};