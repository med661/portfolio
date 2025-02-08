import React from 'react';
import { motion } from 'framer-motion';

const Interests: React.FC = () => {
    const interests = [
        { name: 'AI Tools', icon: '🤖', description: 'Exploring the latest in artificial intelligence' },
        { name: 'Web Development', icon: '💻', description: 'Creating modern web applications' },
        { name: 'DevOps', icon: '⚙️', description: 'Streamlining development operations' },
        { name: 'Chess', icon: '♟️', description: 'Strategic thinking and planning' },
        { name: 'Traveling', icon: '✈️', description: 'Exploring new cultures and places' },
        { name: 'Music', icon: '🎶', description: 'Appreciating various genres' }
    ];

    return (
        <section id="interests" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-6">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
                >
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        What Interests Me
                    </span>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {interests.map((interest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl 
                                     transition-all duration-300 border border-gray-700/50"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <span className="text-5xl mb-2 transform transition-transform hover:scale-110">
                                    {interest.icon}
                                </span>
                                <h3 className="text-2xl font-semibold text-white mb-2">
                                    {interest.name}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {interest.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Interests;
