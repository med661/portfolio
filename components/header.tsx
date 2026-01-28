import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useTranslationContext } from '../contexts/translationContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t, i18n, changeLanguage } = useTranslationContext();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
        e.preventDefault();
        const element = document.getElementById(section);
        if (element) {
            router.push(`/?section=${section}`, undefined, { shallow: true });
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const menuItems = ['about', 'experience', 'education', 'projects', 'internship', 'proof-of-achievement', 'skills', 'achievements', 'interests'];

    return (
        <header className={`fixed top-0 start-0 w-full z-50 transition-all duration-300 ease-in-out
            ${scrolled 
                ? 'glass-strong py-2' 
                : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 cursor-pointer">
                        <Link href="/">
                            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-indigo-500/50 hover:border-indigo-400 transition-colors duration-300 shadow-lg shadow-indigo-500/20">
                                <Image
                                    src="/images/logo.png"
                                    alt="Salah Sfar Logo"
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item}
                                href={`/?section=${item}`}
                                scroll={false}
                                onClick={(e) => handleNavigation(e, item)}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group py-2"
                            >
                                {t(item)}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                            </Link>
                        ))}
                    </nav>

                    {/* Language Switcher */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen((prev) => !prev)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 ${
                                    scrolled ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm'
                                } transition-all duration-200 flex items-center gap-2`}
                            >
                                <span>{i18n.language.toUpperCase()}</span>
                                <svg className={`w-3 h-3 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Language Dropdown */}
                            <AnimatePresence>
                                {isLangMenuOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute end-0 mt-2 w-40 rounded-xl shadow-2xl py-1 glass-strong overflow-hidden z-50"
                                    >
                                        {['en', 'fr', 'ar'].map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => {
                                                    changeLanguage(lang);
                                                    setIsLangMenuOpen(false);
                                                }}
                                                className="w-full text-start px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 flex items-center gap-3 transition-colors"
                                            >
                                                <div className="relative w-5 h-5 rounded-full overflow-hidden shadow-sm">
                                                    <Image
                                                        src={`/assets/svg/icons/translate/${lang}.svg`}
                                                        alt={`${lang} flag`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span>{lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'العربية'}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden rounded-full p-2 inline-flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                                <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`block w-full h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden glass-strong border-t border-white/5"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={`#${item}`}
                                        className="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-white/5 transition-all duration-200"
                                        onClick={(e) => handleNavigation(e as any, item)}
                                    >
                                        {t(item)}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
