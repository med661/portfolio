import Image from 'next/image';
import React, { useState } from 'react';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                {/* Hamburger menu for mobile */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        className="text-white focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
                        </svg>
                    </button>
                </div>

                {/* Desktop navigation links */}
                <div className="hidden md:flex items-center space-x-6">
                    <a href="#about" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">ABOUT</a>
                    <a href="#experience" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">EXPERIENCE</a>
                    <a href="#education" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">EDUCATION</a>
                    <a href="#projects" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">PROJECTS</a>
                    <a href="#internship" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">INTERNSHIP</a>

                    <a href="#proof-of-achievement" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">CERTIFICATION</a>
                    <a href="#skills" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">SKILLS</a>

                    <a href="#achievements" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">ACHIEVEMENTS</a>
                    <a href="#interests" className="text-sm font-semibold text-white hover:text-gray-200 transition duration-300">INTERESTS</a>

                </div>
            </div>

            {/* Mobile menu - displayed when hamburger is clicked */}
            {isOpen && (
                <div className="fixed top-16 left-0 w-full bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 p-6 md:hidden transition-all duration-300 z-40">
                    <a href="#about" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">ABOUT</a>
                    <a href="#experience" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">EXPERIENCE</a>
                    <a href="#education" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">EDUCATION</a>
                    <a href="#projects" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">PROJECTS</a>
                    <a href="#internship" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">INTERNSHIP</a>
                    <a href="#proof-of-achievement" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">CERTIFICATION</a>
                    <a href="#skills" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">SKILLS</a>

                    <a href="#achievements" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">ACHIEVEMENTS</a>
                    <a href="#interests" className="block text-sm font-semibold text-white hover:text-gray-200 mb-4">INTERESTS</a>

                </div>
            )}
        </header>
    );
};

export default Header;
