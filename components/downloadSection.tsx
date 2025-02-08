import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

interface CVDownloadSectionProps {
    t: (key: string) => string;
}

export const CVDownloadSection: React.FC<CVDownloadSectionProps> = ({ t }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
        >
            <motion.a
                href="/cv.pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FaDownload className="mr-2" />
                {t('cv.download')}
            </motion.a>
            <div className="text-sm text-gray-400 mt-2 text-center">
                {t('cv.downloadHint')}
            </div>
        </motion.div>
    );
};