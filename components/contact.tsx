import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useTranslationContext } from '../contexts/translationContext';
import { CONTACT_INFO } from '../constants/data';

export const ContactSection: React.FC = () => {
    const { t } = useTranslationContext();

    const contacts = [
        {
            icon: <FaEnvelope className="text-2xl" />,
            label: t(CONTACT_INFO.email.labelKey),
            value: CONTACT_INFO.email.value,
            href: CONTACT_INFO.email.href
        },
        {
            icon: <FaPhone className="text-2xl" />,
            label: t(CONTACT_INFO.phone.labelKey),
            value: CONTACT_INFO.phone.value,
            href: CONTACT_INFO.phone.href
        },
        {
            icon: <FaGithub className="text-2xl" />,
            label: t(CONTACT_INFO.github.labelKey),
            value: CONTACT_INFO.github.value,
            href: CONTACT_INFO.github.href
        },
        {
            icon: <FaLinkedin className="text-2xl" />,
            label: t(CONTACT_INFO.linkedin.labelKey),
            value: CONTACT_INFO.linkedin.value,
            href: CONTACT_INFO.linkedin.href
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
            {contacts.map((contact, index) => (
                <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center">
                        {contact.icon}
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-400">{contact.label}</h3>
                        <p className="text-white">{contact.value}</p>
                    </div>
                </motion.a>
            ))}
        </motion.div>
    );
};
