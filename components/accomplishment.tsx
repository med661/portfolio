import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing icons

const Accomplishments: React.FC = () => {
    return (
        <section id="achievements" className="py-16 bg-gray-800 w-full">
            <div className="container mx-auto px-4 text-center">


                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        Accomplishments
                    </span>
                </h2>

                <ul className="text-lg mb-8 space-y-6">
                    <li className="bg-gray-900 shadow-lg rounded-lg py-6 px-8 max-w-2xl mx-auto text-white">
                        2nd place in the &apos;ActionAid&apos; Social Entrepreneurship competition.
                    </li>
                    <li className="bg-gray-900 shadow-lg rounded-lg py-6 px-8 max-w-2xl mx-auto text-white">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-left md:mr-4">
                                <p className="mb-4">
                                    Created online educational content under the brand &apos;Formationnet&apos; on Instagram.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="https://www.instagram.com/formationnet" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                                        <FaInstagram size={30} className="text-white" />
                                    </a>
                                    <a href="https://www.linkedin.com/company/75032139" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                        <FaLinkedin size={30} className="text-white" />
                                    </a>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0">
                                <Image
                                    src="/images/logosfar.png" // Ensure the image is in the public/images folder
                                    alt="Formationnet Logo"
                                    className="rounded-lg"
                                    width={150}
                                    height={150}
                                />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Accomplishments;
