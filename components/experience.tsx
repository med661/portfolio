import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';

const Experience: React.FC = () => {
    return (
        <section id="experience" className="py-16 bg-gray-900 min-h-screen flex items-center">
            <div className="container mx-auto px-6 flex justify-center">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative mx-4 max-w-4xl w-full">
                    <header className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                                Professional Experience
                            </span>
                        </h2>
                    </header>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Backend Developer</h3>
                            <a href="https://www.darblockchain.io/" className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">
                                Dar Blockchain
                            </a>
                            <time className="text-gray-400 ml-2 block md:inline">| Nov 2022 – Present</time>
                            <ul className="mt-4 space-y-2 text-gray-300 text-sm md:text-base">
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Designed and implemented scalable backend architectures using NestJS and Express, improving system performance and maintainability.</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Optimized API performance and enhanced security by implementing JWT and OAuth 2.0. Integrated email verification using Nodemailer and implemented two-factor authentication (2FA) with Twilio.</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Integrated real-time communication using WebSocket (Socket.io), enhancing platform interactivity with low-latency updates.</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Collaborated within an Agile team, participating in daily stand-ups, sprint planning, and code reviews to ensure timely and high-quality project delivery.</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Designed and optimized MongoDB database schemas, improving data structure efficiency and query performance.</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Utilized Git and GitHub for version control, ensuring a streamlined and secure development workflow for backend services.</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Developed a high-speed video cutting function using FFmpeg and Node.js.</li>
                            </ul>

                            <div className="mt-4 text-gray-300 text-sm">
                                <div className="flex justify-center">
                                    <strong className="text-indigo-300">Technologies:</strong>
                                </div>

                                <div className="flex flex-wrap gap-2 md:gap-4 justify-center mx-auto mt-2">
                                    {[
                                        "Node.js", "Express.js", "NestJS", "MongoDB", "Mongoose", "Git", "Socket.io",
                                        "OAuth 2.0", "Passport.js", "FFmpeg", "Stripe", "Docker", "Redis", "TypeScript",
                                        "JavaScript", "React.js", "Redux-Toolkit"
                                    ].map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-indigo-700/20 text-indigo-300 rounded-full text-xs md:text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="ml-6 flex-shrink-0">
                            <Image src="/images/assetdar.png" alt="Dar Blockchain Logo" width={80} height={80} className="object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Experience;
