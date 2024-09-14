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
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">Backend Developer</h3>
                            <a href="https://www.darblockchain.com" className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">Dar Blockchain</a>
                            <time className="text-gray-400 ml-2">| Nov 2022 – Present</time>
                            <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Developed scalable APIs using Node.js & NestJS</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Managed MongoDB with Mongoose</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Integrated JWT & OAuth2 authentication</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Implemented real-time features with Socket.io</li>
                                <li><FaCheckCircle className="inline-block text-indigo-600 mr-2" />Handled payments via Stripe</li>
                            </ul>
                            <p className="mt-4 text-gray-300 text-sm">
                                <strong>Technologies:</strong> Node.js, NestJS, MongoDB, Stripe, Socket.io, Docker, Redis, React, TypeScript
                            </p>
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
