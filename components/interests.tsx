import React from 'react';

const Interests: React.FC = () => {
    const interests = [
        { name: 'AI Tools', icon: '🤖' },
        { name: 'Web Development', icon: '💻' },
        { name: 'DevOps', icon: '⚙️' },
        { name: 'Chess', icon: '♟️' },
        { name: 'Traveling', icon: '✈️' },
        { name: 'Music', icon: '🎶' }
    ];


    return (
        <section id="interests" className="py-16 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        Interests
                    </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interests.map((interest, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center"
                        >
                            <span className="text-4xl mr-4">{interest.icon}</span>
                            <h3 className="text-xl font-semibold text-white">{interest.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Interests;
