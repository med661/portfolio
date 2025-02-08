import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTranslationContext } from '../contexts/translationContext';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t, i18n, changeLanguage } = useTranslationContext();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
            ${scrolled 
                ? 'bg-white/80 backdrop-blur-md shadow-lg' 
                : 'bg-gradient-to-r from-purple-500/90 via-indigo-600/90 to-blue-500/90'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Image
                            src="/images/logo.png"
                            alt="Salah Sfar Logo"
                            width={40}
                            height={40}
                            className="rounded-full hover:scale-105 transition-transform duration-200"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {['about', 'experience', 'education', 'projects', 'internship', 'skills'].map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className={`text-sm font-medium ${scrolled ? 'text-gray-800' : 'text-white'}
                                    hover:text-indigo-500 transition-colors duration-200 relative group`}
                            >
                                {t(item)}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-200 group-hover:w-full" />
                            </a>
                        ))}
                    </nav>

                    {/* Language Switcher */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen((prev) => !prev)}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                } transition-colors duration-200 flex items-center space-x-2`}
                            >
                                <span>{i18n.language.toUpperCase()}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Language Dropdown */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {['en', 'fr'].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => {
                                                changeLanguage(lang);
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center space-x-2"
                                        >
                                            <Image
                                                src={`/assets/svg/icons/translate/${lang}.svg`}
                                                alt={`${lang} flag`}
                                                width={20}
                                                height={20}
                                            />
                                            <span>{lang.toUpperCase()}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden rounded-md p-2 inline-flex items-center justify-center hover:bg-white/10 transition-colors duration-200"
                            aria-expanded="false"
                        >
                            <svg
                                className={`${scrolled ? 'text-gray-800' : 'text-white'} w-6 h-6`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {['about', 'experience', 'education', 'projects', 'internship', 'skills'].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            } transition-colors duration-200`}
                            onClick={() => setIsOpen(false)}
                        >
                            {t(item)}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
