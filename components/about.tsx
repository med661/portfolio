// components/About.js
import React from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

const About = () => {
    return (
        <section id="about" className="py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white mt-16 md:mt-20">
            <div className="container mx-auto px-4 text-center">
                {/* Profile Image */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 md:mb-8 fadeIn">
                    <Image
                        src="https://media.licdn.com/dms/image/v2/D4D03AQEtT9V68CXuNg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710752130044?e=1731542400&v=beta&t=qkRi4s_gSM70mUFOgcdh_KDQtNvGJsvktYgNAj_bs2E"
                        alt="Salah Sfar"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full border-4 border-gray-700 shadow-lg"
                    />
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Me</h2>

                {/* Bio with Enhanced Introduction */}
                <div className="mb-8">
                    <p className="text-3xl font-semibold text-indigo-400 mb-2 typewriter">Hi, I&apos;m Salah Sfar!</p>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        A Backend Developer specializing in Node.js with a focus on creating scalable and efficient backend solutions. I have experience working with technologies like the MERN stack, Nest.js, and Express.js. I’m passionate about developing innovative solutions and continuously improving my skills.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 contactCard slideInUp">
                        <FaEnvelope className="text-indigo-400 text-2xl mr-4" />
                        <a href="mailto:mohamedsalah.sfarchaabane@polytechnicien.tn" className="text-indigo-400 hover:underline"> salah Sfar</a>
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
            </div>
        </section>
    );
};

export default About;
