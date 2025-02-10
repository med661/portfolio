import React from 'react';
import Image from 'next/image';
import { useTranslationContext } from '@/contexts/translationContext';

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
            const { t } = useTranslationContext();
    
    return (
        <section id='skills' className="bg-gradient-to-b from-gray-900 to-gray-800 py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
                        {t('skillsTitle')}
                    </span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
                    {technologies.map((tech, index) => (
                        <div
                            key={tech.name}
                            className="group relative flex flex-col items-center text-center p-6 rounded-xl 
                                     transition-all duration-300 ease-in-out hover:transform hover:scale-105
                                     hover:bg-gray-800/50 backdrop-blur-sm fade-in"
                            style={{ 
                                animationDelay: `${index * 0.1}s`,
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 mb-6 relative 
                                          transition-transform duration-300 ease-in-out 
                                          group-hover:transform group-hover:scale-110">
                                <Image
                                    src={tech.logo}
                                    alt={tech.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="filter group-hover:brightness-110"
                                />
                            </div>
                            <p className="text-lg md:text-xl font-semibold text-gray-300 
                                        group-hover:text-white transition-colors duration-300">
                                {tech.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechSection;
