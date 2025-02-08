import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslationContext } from '../contexts/translationContext';


const About = () => {
  const { t, changeLanguage } = useTranslationContext();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      changeLanguage("en");
      isFirstRender.current = false;
    }
  }, [changeLanguage])

    return (
        <section id="about" className="py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white mt-16 md:mt-20">
        <div className="container mx-auto px-4 text-center">
            {/* Profile Image */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 md:mb-8 fadeIn">
                <Image
                    src="/images/a.jpg"
                    alt={t('aboutme.profile.alt')}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-4 border-gray-700 shadow-lg"
                />
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {t('aboutme.title')}
            </h2>

            {/* Bio with Enhanced Introduction */}
            <div className="mb-8">
                <p className="text-3xl font-semibold text-indigo-400 mb-2 typewriter">
                    {t('aboutme.greeting')}
                </p>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                    {t('aboutme.bio')}
                </p>
            </div>

                {/* Rest of your component remains the same */}
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 contactCard slideInUp">
                        <FaEnvelope className="text-indigo-400 text-2xl mr-4" />
                        <a href="mailto:salahsfar.pro@gmail.com" className="text-indigo-400 hover:underline">salahsfar.pro@gmail.com</a>
                    </div>
                    <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 contactCard slideInUp">
                        <FaPhoneAlt className="text-indigo-400 text-2xl mr-4" />
                        <span className="text-gray-300">+216 58962808</span>
                    </div>
                    <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 contactCard slideInUp">
                        <FaGithub className="text-indigo-400 text-2xl mr-4" />
                        <a href="https://github.com/med661" className="text-indigo-400 hover:underline">github.com/med661</a>
                    </div>
                    <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 contactCard slideInUp">
                        <FaLinkedin className="text-indigo-400 text-2xl mr-4" />
                        <a href="https://www.linkedin.com/in/mohamed-salah-sfar-chaabane/" className="text-indigo-400 hover:underline">Salah sfar</a>
                    </div>
                </div>

                {/* Download CV Section */}
                <div className="mt-12">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('aboutme.cv.title')}</h3>
                    <div className="flex justify-center space-x-4">
                        {/* English CV Button */}
                        <a
                            href="/cv/fr.pdf"
                            download
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            {t('aboutme.cv.english')}
                        </a>
                        {/* French CV Button */}
                        <a
                            href="/cv/salah_sfar_cv_fr.pdf"
                            download
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            {t('aboutme.cv.french')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;