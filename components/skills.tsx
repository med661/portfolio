// import React from 'react';
// import Image from 'next/image';


// const technologies = [
//     { name: 'JavaScript', logo: 'data:image/png;base64,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' },
//     { name: 'TypeScript', logo: '/images/ts.png' },
//     { name: 'Node.js', logo: '/images/node.png' },
//     { name: 'NestJS', logo: '/images/nest.png' },
//     { name: 'Express.js', logo: 'https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/20/express-js.png' },
//     { name: 'MongoDB', logo: '/images/mongoose.png' },
//     { name: 'Next.js', logo: '/images/next-js.png' },
//     { name: 'Redis', logo: '/images/redis.png' },
//     { name: 'GraphQL', logo: '/images/Graph.png' },
//     { name: 'FireBase', logo: '/images/fire.png' },
//     { name: 'Docker', logo: '/images/docker.png' },
//     { name: 'Git', logo: '/images/git.png' },






// ];



// const TechSection: React.FC = () => {
//     return (
//         <section className="bg-gray-900 py-12">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
//                     <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
//                         Technologies
//                     </span>
//                 </h2>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                     {technologies.map((tech) => (
//                         <div key={tech.name} className="flex flex-col items-center text-center">
//                             <div className="w-24 h-24 md:w-32 md:h-32 mb-4 relative">
//                                 <Image
//                                     src={tech.logo}
//                                     alt={tech.name}
//                                     layout="fill"
//                                     objectFit="contain"
//                                 />
//                             </div>
//                             <p className="text-lg font-semibold text-gray-300">{tech.name}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TechSection;

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
