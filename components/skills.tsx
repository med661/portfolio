import React from 'react';
import Image from 'next/image';

const technologies = [
    { name: 'JavaScript', logo: '/images/js.png' },
    { name: 'TypeScript', logo: '/images/ts.png' },
    { name: 'Node.js', logo: '/images/node.png' },
    { name: 'NestJS', logo: '/images/nest.png' },
    { name: 'Express.js', logo: '/images/express.png' },
    { name: 'MongoDB', logo: '/images/mongoose.png' },
    { name: 'Next.js', logo: '/images/next-js.png' },
    { name: 'Redis', logo: '/images/redis.png' },
    { name: 'GraphQL', logo: '/images/Graph.png' },
    { name: 'FireBase', logo: '/images/fire.png' },
    { name: 'Docker', logo: '/images/docker.png' },
    { name: 'Git', logo: '/images/git.png' },
];

const TechSection: React.FC = () => {
    return (
        <section id='skills' className="bg-gray-900 py-12">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        Technologies
                    </span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {technologies.map((tech, index) => (
                        <div
                            key={tech.name}
                            className={`flex flex-col items-center text-center fade-in`}
                            style={{ animationDelay: `${index * 0.1}s` }} // Staggered delay
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 mb-4 relative">
                                <Image
                                    src={tech.logo}
                                    alt={tech.name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <p className="text-lg font-semibold text-gray-300">{tech.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechSection;
