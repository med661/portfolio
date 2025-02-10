import { useTranslationContext } from '../contexts/translationContext';
import React from 'react';
import { FaDocker, FaJs, FaDatabase, FaPhp, FaLinux, FaTools } from 'react-icons/fa';

const ProofOfAchievement: React.FC = () => {
        const { t } = useTranslationContext();
    
    return (
        <section id="proof-of-achievement" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            <div className="container mx-auto px-4 md:px-8 z-10">
                {/* Heading with enhanced animation */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white text-center relative animate-fadeIn">
                    <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('proofofcompletion.title')}
                    </span>
                </h2>

                {/* Achievement Grid with improved layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
                    {/* Previous achievements with enhanced styling */}
                    <Achievement 
                        icon={<FaDocker />}
                        title="Docker Training Course for the Absolute Beginners"
                        platform="Kodekloud"
                        link="https://learn.kodekloud.com/certificate/2D0F952D05CE-2D0F8F287ED2-2D0D712B90A6"
                        bgColor="from-blue-600 to-blue-400"
                    />
                    
                    <Achievement 
                        icon={<FaJs />}
                        title="JavaScript Algorithms and Data Structures"
                        platform="FreeCodeCamp"
                        link="https://www.freecodecamp.org/certification/fccea7be283-656f-47eb-bd0a-f90e51e05434/javascript-algorithms-and-data-structures"
                        bgColor="from-yellow-500 to-yellow-300"
                    />

                    <Achievement 
                        icon={<FaDatabase />}
                        title="MongoDB CRUD Operations in Node.js"
                        platform="MongoDB"
                        link="https://learn.mongodb.com/c/rYt0ydWWRROdkJDcO7YGHQ"
                        bgColor="from-green-600 to-green-400"
                    />

                    <Achievement 
                        icon={<FaPhp />}
                        title="PHP and MySQL Certificate"
                        platform="Udemy"
                        link="https://www.udemy.com/certificate/UC-e89f178c-5d42-4557-8030-677d735a16ef/"
                        bgColor="from-purple-600 to-purple-400"
                    />

                    {/* New achievements */}
                    <Achievement 
                        icon={<FaTools />}
                        title="DevOps Pre-Requisite Course"
                        platform="Kodekloud"
                        link="https://learn.kodekloud.com/user/certificate/815cbbac-29c8-4bd6-8725-c5c18194adfc"
                        bgColor="from-red-600 to-red-400"
                    />

                    <Achievement 
                        icon={<FaLinux />}
                        title="Learning Linux Basics Course & Labs"
                        platform="Kodekloud"
                        link="https://kodekloud.com/courses/linux-basics/"
                        bgColor="from-orange-600 to-orange-400"
                    />
                </div>
            </div>
        </section>
    );
};

// New Achievement component for better reusability
const Achievement: React.FC<{
    icon: React.ReactNode;
    title: string;
    platform: string;
    link: string;
    bgColor: string;
}> = ({ icon, title, platform, link, bgColor }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" 
       className="group block">
        <div className="bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg 
                    transform hover:shadow-2xl hover:scale-105 hover:-rotate-1 
                    transition-all duration-300 relative 
                    border border-gray-700/50 hover:border-gray-600">
            <div className={`absolute top-0 left-0 w-14 h-14 md:w-16 md:h-16 
                         bg-gradient-to-br ${bgColor} rounded-full 
                         transform -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6 
                         flex items-center justify-center z-10 
                         group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white text-xl md:text-2xl">
                    {icon}
                </div>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 
                       group-hover:text-indigo-400 transition-colors duration-300">
                {title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base 
                      group-hover:text-gray-300 transition-colors duration-300">
                {platform}
            </p>
        </div>
    </a>
);

export default ProofOfAchievement;
