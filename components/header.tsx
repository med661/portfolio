import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslationContext } from '../contexts/translationContext';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n, changeLanguage } = useTranslationContext();

   

    // Toggle the mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 shadow-md">
            {/* Left section - Logo */}
            <div className="flex items-center space-x-4">
                <Image
                    src="/images/logo.png" // Ensure the image is in the public/images folder
                    alt="Salah Sfar Logo"
                    width={50}
                    height={50}
                />
            </div>

            {/* Right section - Hamburger Icon & Links */}
            <div className="flex items-center space-x-6">
                {/* Language toggle dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle language"
                        className="text-white focus:outline-none flex items-center space-x-2"
                    >
                        <span className="text-sm font-semibold">{i18n.language.toUpperCase()}</span>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    {isOpen && (
                        <div
                            className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-lg"
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            {/* English Button */}
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 ${
                                    i18n.language === 'en' && 'bg-gray-200'
                                }`}
                            >
                                <Image
                                    src="/assets/svg/icons/translate/eng.svg"
                                    alt="English Flag"
                                    width={24}
                                    height={24}
                                    className="mr-1"
                                />
                                EN
                            </button>

                            {/* French Button */}
                            <button
                                onClick={() => changeLanguage('fr')}
                                className={`flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 ${
                                    i18n.language === 'fr' && 'bg-gray-200'
                                }`}
                            >
                                <Image
                                    src="/assets/svg/icons/translate/fr.svg"
                                    alt="French Flag"
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                />
                                FR
                            </button>
                        </div>
                    )}
                </div>

                {/* Hamburger menu for mobile */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Desktop navigation links */}
                <div className="hidden md:flex items-center space-x-6">
                    <a href="#about" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">
                        {t('about')}
                    </a>
                    <a href="#experience" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">
                        {t('experience')}
                    </a>
                    <a href="#education" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">
                        {t('education')}
                    </a>
                    <a href="#projects" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">
                        {t('projects')}
                    </a>
                    <a href="#internship" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">
                        {t('internship')}
                    </a>
                    <a href="#proof-of-achievement" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">
                        {t('proof-of-achievement')}
                    </a>
                    <a href="#skills" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">
                        {t('skills')}
                    </a>
                    <a href="#achievements" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">
                        {t('achievements')}
                    </a>
                    <a href="#interests" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">
                        {t('interests')}
                    </a>
                </div>
            </div>

            {/* Mobile menu - displayed when hamburger is clicked */}
            {isOpen && (
                <div className="fixed top-16 left-0 w-full bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 p-6 md:hidden transition-all duration-300 z-40">
                    <a href="#about" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">
                        {t('about')}
                    </a>
                    <a href="#experience" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">
                        {t('experience')}
                    </a>
                    <a href="#education" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">
                        {t('education')}
                    </a>
                    <a href="#projects" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">
                        {t('projects')}
                    </a>
                    <a href="#internship" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">
                        {t('internship')}
                    </a>
                    <a href="#proof-of-achievement" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">
                        {t('proof-of-achievement')}
                    </a>
                    <a href="#skills" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">
                        {t('skills')}
                    </a>
                    <a href="#achievements" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">
                        {t('achievements')}
                    </a>
                    <a href="#interests" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">
                        {t('interests')}
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;