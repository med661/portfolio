import Image from 'next/image';
import React from 'react';
import { FaGraduationCap, FaSchool, FaUniversity } from 'react-icons/fa';

const Education: React.FC = () => {
    return (
        <section id="education" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 z-0" />
            <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center z-10">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        Education
                    </span>
                </h2>
                {/* Education Items */}
                <div className="space-y-12">
                    {/* Degree 1 */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 relative mx-4 md:mx-6 lg:mx-8 fadeIn flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                                <FaUniversity className="text-white text-3xl" />
                            </div>
                            <div className="ml-4 text-left">
                                <h3 className="text-2xl font-semibold text-white mb-2 flex items-center">
                                    Engineering Degree in Computer Science
                                </h3>
                                <p className="text-gray-400 mb-1">Ecole Polytechnique Sousse</p>
                                <p className="text-gray-300">September 2019 – June 2022</p>
                            </div>
                        </div>
                        <Image src="/images/polytech.png" alt="University Logo" className="w-16 h-16" width={40} height={40} />
                    </div>

                    {/* Degree 2 */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 relative mx-4 md:mx-6 lg:mx-8 fadeIn flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                                <FaSchool className="text-white text-3xl" />
                            </div>
                            <div className="ml-4 text-left">
                                <h3 className="text-2xl font-semibold text-white mb-2 flex items-center">
                                    Integrated Preparatory Cycle
                                </h3>
                                <p className="text-gray-400 mb-1">Ecole Polytechnique Sousse</p>
                                <p className="text-gray-300">September 2017 – June 2019</p>
                            </div>
                        </div>
                        <Image src="/images/polytech.png" alt="University Logo" className="w-16 h-16" width={100} height={100} />
                    </div>

                    {/* Baccalaureate */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 relative mx-4 md:mx-6 lg:mx-8 fadeIn flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                                <FaGraduationCap className="text-white text-3xl" />
                            </div>
                            <div className="ml-4 text-left">
                                <h3 className="text-2xl font-semibold text-white mb-2 flex items-center">
                                    Baccalaureate
                                </h3>
                                <p className="text-gray-400 mb-1">Lycée Taher Sfar</p>
                                <p className="text-gray-300">June 2017</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
