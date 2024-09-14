import React from 'react';
import Image from 'next/image'; // Import Image for Next.js optimization

import GproConsultingLogo from '@/public/images/gpro.jpeg'

import SatoripopLogo from '@/public/images/satoripop.jpeg'
const Internships: React.FC = () => {
    return (
        <section id="internship" className="py-16 md:py-20 bg-gray-900 min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        Internships
                    </span>
                </h2>

                {/* Internship List */}
                <div className="flex flex-wrap justify-center gap-8">
                    {/* Internship 1 - Gpro Consulting */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative hover:shadow-xl transform hover:scale-105 transition-transform duration-300 max-w-md mx-4">
                        <div className="absolute top-0 left-0 w-16 h-16 bg-green-600 rounded-full transform -translate-x-6 -translate-y-6 z-[-1]" />
                        <div className="flex items-center mb-4">
                            <Image
                                src={GproConsultingLogo}
                                alt="Gpro Consulting Logo"
                                width={50} // Adjust size as needed
                                height={50} // Adjust size as needed
                            />
                            <h3 className="text-2xl font-semibold text-white mb-2 ml-4">Gpro Consulting - SkillsyncEduct</h3>
                        </div>
                        <p className="text-gray-300 mb-1">FullStack Intern | Feb 2023 - June 2023</p>
                        <p className="text-gray-400 mb-4">Designed and developed a digital platform consolidating information necessary for building a great career by selecting a professional course.</p>
                        <p className="text-gray-400 mb-4">Technologies: React Js, Node JS, Express JS, Redux-Toolkit, Mongoose, Git, OAuth 2.0, Cloudinary</p>
                    </div>

                    {/* Internship 2 - Satoripop */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative hover:shadow-xl transform hover:scale-105 transition-transform duration-300 max-w-md mx-4">
                        <div className="absolute top-0 left-0 w-16 h-16 bg-green-600 rounded-full transform -translate-x-6 -translate-y-6 z-[-1]" />
                        <div className="flex items-center mb-4">
                            <Image
                                src={SatoripopLogo}
                                alt="Satoripop Logo"
                                width={50} // Adjust size as needed
                                height={50} // Adjust size as needed
                            />
                            <h3 className="text-2xl font-semibold text-white mb-2 ml-4">Satoripop - Premier League App</h3>
                        </div>
                        <p className="text-gray-300 mb-1">FullStack Intern | July 2021 - Sept 2021</p>
                        <p className="text-gray-400 mb-4">Developed a mobile application to offer users an immersive experience to follow match scores, events, and news of the Premier League.</p>
                        <p className="text-gray-400 mb-4">Technologies: React Native, Firebase, Express JS, Node JS</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Internships;
