import React from 'react';
import { FaDocker, FaJs, FaDatabase, FaPhp } from 'react-icons/fa'; // Import additional icons here

const ProofOfAchievement: React.FC = () => {
    return (
        <section id="proof-of-achievement" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 z-0" />
            <div className="container mx-auto px-4 md:px-8 z-10">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-white text-center relative animate-fadeIn">
                    <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
                        Proof of Achievement
                    </span>
                </h2>

                {/* Achievement List */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {/* Achievement 1 */}
                    <a href="https://learn.kodekloud.com/certificate/2D0F952D05CE-2D0F8F287ED2-2D0D712B90A6" target="_blank" rel="noopener noreferrer">
                        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg transform hover:shadow-xl hover:scale-105 hover:rotate-1 transition-transform duration-300 relative max-w-xs w-full animate-fadeIn">
                            <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-indigo-600 rounded-full transform -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6 flex items-center justify-center z-[-1]">
                                <FaDocker className="text-white text-lg md:text-2xl" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Docker Training Course for the Absolute Beginners</h3>
                            <p className="text-gray-400 mb-1">Kodekloud</p>
                        </div>
                    </a>

                    {/* Achievement 2 */}
                    <a href="https://www.freecodecamp.org/certification/fccea7be283-656f-47eb-bd0a-f90e51e05434/javascript-algorithms-and-data-structures" target="_blank" rel="noopener noreferrer">
                        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg transform hover:shadow-xl hover:scale-105 hover:rotate-1 transition-transform duration-300 relative max-w-xs w-full animate-fadeIn">
                            <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-indigo-600 rounded-full transform -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6 flex items-center justify-center z-[-1]">
                                <FaJs className="text-white text-lg md:text-2xl" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">JavaScript Algorithms and Data Structures</h3>
                            <p className="text-gray-400 mb-1">FreeCodeCamp</p>
                        </div>
                    </a>

                    {/* Achievement 3 */}
                    <a href="https://learn.mongodb.com/c/rYt0ydWWRROdkJDcO7YGHQ" target="_blank" rel="noopener noreferrer">
                        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg transform hover:shadow-xl hover:scale-105 hover:rotate-1 transition-transform duration-300 relative max-w-xs w-full animate-fadeIn">
                            <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-indigo-600 rounded-full transform -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6 flex items-center justify-center z-[-1]">
                                <FaDatabase className="text-white text-lg md:text-2xl" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">MongoDB CRUD Operations in Node.js</h3>
                            <p className="text-gray-400 mb-1">MongoDB</p>
                        </div>
                    </a>

                    {/* Achievement 4 */}
                    <a href="https://www.udemy.com/certificate/UC-e89f178c-5d42-4557-8030-677d735a16ef/?utm_campaign=email&utm_source=sendgrid.com&utm_medium=email" target="_blank" rel="noopener noreferrer">
                        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg transform hover:shadow-xl hover:scale-105 hover:rotate-1 transition-transform duration-300 relative max-w-xs w-full animate-fadeIn">
                            <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-indigo-600 rounded-full transform -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6 flex items-center justify-center z-[-1]">
                                <FaPhp className="text-white text-lg md:text-2xl" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">PHP and MySQL Certificate</h3>
                            <p className="text-gray-400 mb-1">Udemy</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProofOfAchievement;
