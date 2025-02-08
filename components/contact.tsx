import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

export const ContactSection: React.FC = () => {
    const contacts = [
        {
            icon: <FaEnvelope className="text-2xl" />,
            label: 'Email',
            value: 'salahsfar.pro@gmail.com',
            href: 'mailto:salahsfar.pro@gmail.com'
        },
        {
            icon: <FaPhone className="text-2xl" />,
            label: 'Phone',
            value: '+216 58962808',
            href: 'tel:+21658962808'
        },
        {
            icon: <FaGithub className="text-2xl" />,
            label: 'GitHub',
            value: 'github.com/med661',
            href: 'https://github.com/med661'
        },
        {
            icon: <FaLinkedin className="text-2xl" />,
            label: 'LinkedIn',
            value: 'Salah sfar',
            href: 'https://www.linkedin.com/in/salah-sfar'
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