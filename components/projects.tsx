import Image from 'next/image';
import React from 'react';

const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-fadeIn">
                        Projects
                    </span>
                </h2>

                {/* Project List */}
                <div className="flex flex-wrap justify-center gap-8">
                    {/* Project 1 - Recut */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative hover:shadow-xl transform hover:scale-105 transition-transform duration-300 max-w-md mx-4 fadeIn animate-slideInUp">
                        <Image src="/images/p1.png" alt="Recut" width={500} height={300} layout="responsive" objectFit="cover" />
                        <h3 className="text-2xl font-semibold text-white mb-2">Recut</h3>
                        <h6 className="text-lg font-semibold text-indigo-300 mb-4">Dar Blockchain</h6>

                        <p className="text-gray-300 mb-1">Developed the entire backend platform for Recut.</p>
                        <p className="text-gray-300 mb-1">Implemented video cutting features using Express, Node.js, Mongoose, FFmpeg, and other technologies.</p>
                        <p className="text-gray-500 mb-4">Technologies : Node.js, Express, Mongoose, FFmpeg ,stripe</p>
                        <a href="https://recut.fr/" className="block text-indigo-400 hover:underline">View Link</a>
                    </div>

                    {/* Project 2 - ECOSYSTEM DAO */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative hover:shadow-xl transform hover:scale-105 transition-transform duration-300 max-w-md mx-4 fadeIn animate-slideInUp">
                        <Image src="/images/dao2.png" alt="ECOSYSTEM DAO" width={500} height={300} layout="responsive" objectFit="cover" />
                        <h3 className="text-2xl font-semibold text-white mb-2">ECOSYSTEM DAO </h3>
                        <h6 className="text-lg font-semibold text-indigo-300 mb-4">Dar Blockchain</h6>

                        <p className="text-gray-300 mb-1">Developed the backend systems to support entrepreneurs.</p>
                        <p className="text-gray-300 mb-1">Provides opportunities for meeting experts, joining support programs, and participating in hackathons.</p>
                        <p className="text-gray-500 mb-4">Technologies :React.js, Redux Toolkit, Node.js, Express.js, MongoDB, Mongoose, Socket.io, Git, OAuth 2.0, Docker</p>
                        <a href="https://di.darblockchain.io/#/auth/landing" className="block text-indigo-400 hover:underline">View Link</a>
                    </div>

                    {/* Project 3 - Discord Clone */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative hover:shadow-xl transform hover:scale-105 transition-transform duration-300 max-w-md mx-4 fadeIn animate-slideInUp">
                        <Image src="/images/discord.png" alt="Discord Clone" width={500} height={300} layout="responsive" objectFit="cover" />
                        <h3 className="text-2xl font-semibold text-white mb-2">Discord Clone</h3>
                        <p className="text-gray-300 mb-1">An application allowing users to communicate via messages and create group video conferencing rooms.</p>
                        <p className="text-gray-500 mb-4">Technologies used: React, Node.js, Socket.IO, MongoDB</p>
                        <a href="https://www.linkedin.com/feed/update/urn:li:activity:6993499902005686273/" className="block text-indigo-400 hover:underline mt-4">View Link</a>
                    </div>

                    {/* Project 4 - Real-Time Chat App */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative hover:shadow-xl transform hover:scale-105 transition-transform duration-300 max-w-md mx-4 fadeIn animate-slideInUp">
                        <Image src="/images/chat.png" alt="Real-Time Chat App" width={500} height={300} layout="responsive" objectFit="cover" />
                        <h3 className="text-2xl font-semibold text-white mb-2">Real-Time Chat App</h3>
                        <p className="text-gray-300 mb-1">An application that allows users to create accounts and communicate via real-time messaging.</p>
                        <p className="text-gray-500 mb-4">Technologies:NestJS · TypeScript · GraphQL · React.js · Redux Thunk</p>
                        <a href="https://www.linkedin.com/feed/update/urn:li:activity:7163459271488180224/" className="block text-indigo-400 hover:underline mt-4">View Link</a>
                    </div>

                    {/* Project 5 - 91Fund */}

                    {/* Coming Soon */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative animate-pulse max-w-md mx-4 fadeIn">
                        <h3 className="text-2xl font-semibold text-white mb-2">Coming Soon</h3>
                        <p className="text-gray-300 mb-1">Stay tuned for exciting new projects and updates!</p>
                        <a href="#" className="block text-indigo-400 hover:underline mt-4">View Link</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
