import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedin, FaDownload, FaTerminal, FaTimes } from 'react-icons/fa';
import { useTranslationContext } from '../contexts/translationContext';
import { motion } from 'framer-motion';

const About = () => {
    const { t, changeLanguage } = useTranslationContext();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            changeLanguage("en");
            isFirstRender.current = false;
        }
    }, [changeLanguage]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    interface Command {
        command: string;
        description: string;
        action: (args?: string) => string;
    }

    const [showTerminal, setShowTerminal] = useState(false);
    const [output, setOutput] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const terminalRef = useRef<HTMLDivElement>(null);

    const commands: Command[] = [
        {
            command: 'help',
            description: 'Show available commands',
            action: () => 
`Available Commands:
help: Shows this help message
cat bio: View my professional biography
skills: Display my technical skillset
grep: Search through command output
contact: Show my contact information
clear: Clear the terminal screen
man: Show manual for a command

Type any command to continue...`
        },
        {
            command: 'skills',
            description: 'List technical skills',
            action: () => 
`My Technical Skills:
Languages: • JavaScript • TypeScript
Backend: • Node.js • NestJS • Express
Frontend: • React • Next.js • Redux
Database: • MongoDB • PostgreSQL • Redis
DevOps: • Docker • Git • AWS • CI/CD
Testing: • Jest • Cypress • RTL`
        },
        {
            command: 'contact',
            description: 'Show contact info',
            action: () =>
`Contact Information:
Email: • salahsfar.pro@gmail.com
Phone: • +216 58962808
GitHub: • github.com/med661
LinkedIn: • Salah sfar`
        },
        {
            command: 'man',
            description: 'Show manual for a command',
            action: (args?: string) => {
                if (!args) return "Usage: man <command>\nExample: man grep";
                const manPages: { [key: string]: string } = {
                    grep: `NAME
    grep - search for patterns in text

SYNOPSIS
    grep <pattern> | <command>

DESCRIPTION
    Search for pattern in the output of another command.
    Currently supports: skills, contact

EXAMPLES
    grep react | skills    - Search for 'react' in skills
    grep email | contact   - Search for 'email' in contacts`,
                    skills: `NAME
    skills - display technical skills

SYNOPSIS
    skills [no options]
    grep <pattern> | skills

DESCRIPTION
    Shows all technical skills grouped by category.
    Can be filtered using grep command.`,
                    contact: `NAME
    contact - show contact information

SYNOPSIS
    contact [no options]
    grep <pattern> | contact

DESCRIPTION
    Displays all contact information.
    Can be filtered using grep command.`
                };
                return manPages[args.toLowerCase()] || `No manual entry for ${args}`;
            }
        },
        {
            command: 'grep',
            description: 'Search through command output',
            action: (args?: string) => {
                if (!args) return "Usage: grep <pattern> | <command>";
                if (!args.includes('|')) return "Error: grep requires a pipe (|) and a command";
                
                const [pattern, cmd] = args.split('|').map(s => s.trim());
                if (!pattern || !cmd) return "Invalid syntax. Example: grep frontend | skills";
                
                switch (cmd) {
                    case 'skills':
                        const skills = {
                            Languages: ['JavaScript', 'TypeScript'],
                            Backend: ['Node.js', 'NestJS', 'Express'],
                            Frontend: ['React', 'Next.js', 'Redux'],
                            Database: ['MongoDB', 'PostgreSQL', 'Redis'],
                            DevOps: ['Docker', 'Git', 'AWS', 'CI/CD'],
                            Testing: ['Jest', 'Cypress', 'RTL']
                        };
                        let results = '';
                        for (const [category, skillList] of Object.entries(skills)) {
                            if (category.toLowerCase().includes(pattern.toLowerCase())) {
                                results += `${category}: ${skillList.map(s => `• ${s}`).join(' ')}\n`;
                                continue;
                            }
                            const matched = skillList.filter(s => 
                                s.toLowerCase().includes(pattern.toLowerCase())
                            );
                            if (matched.length > 0) {
                                results += `${category}: ${matched.map(s => `• ${s}`).join(' ')}\n`;
                            }
                        }
                        return results || `No matches found for '${pattern}'`;
                    
                    case 'contact':
                        const contacts = [
                            { type: 'Email', value: 'salahsfar.pro@gmail.com' },
                            { type: 'Phone', value: '+216 58962808' },
                            { type: 'GitHub', value: 'github.com/med661' },
                            { type: 'LinkedIn', value: 'Salah sfar' }
                        ];
                        const matchedContacts = contacts.filter(c => 
                            c.type.toLowerCase().includes(pattern.toLowerCase()) ||
                            c.value.toLowerCase().includes(pattern.toLowerCase())
                        );
                        return matchedContacts.length > 0 
                            ? matchedContacts.map(c => `${c.type}: • ${c.value}`).join('\n')
                            : `No matches found for '${pattern}'`;
                    
                    default:
                        return `Command '${cmd}' not supported with grep`;
                }
            }
        },
        {
            command: 'clear',
            description: 'Clear terminal',
            action: () => {
                setOutput([]);
                return '';
            }
        },
        {
            command: 'grepskills',
            description: 'Search through skills',
            action: (args?: string) => {
                if (!args) return "Please provide a search term. Example: 'grepskills react'";
                
                const skills = {
                    Languages: ['JavaScript', 'TypeScript'],
                    Backend: ['Node.js', 'NestJS', 'Express'],
                    Frontend: ['React', 'Next.js', 'Redux'],
                    Database: ['MongoDB', 'PostgreSQL', 'Redis'],
                    DevOps: ['Docker', 'Git', 'AWS', 'CI/CD'],
                    Testing: ['Jest', 'Cypress', 'React Testing Library']
                };

                const searchTerm = args.toLowerCase();
                let results = '';

                for (const [category, categorySkills] of Object.entries(skills)) {
                    const matchedSkills = categorySkills.filter(skill => 
                        skill.toLowerCase().includes(searchTerm)
                    );

                    if (matchedSkills.length > 0) {
                        results += `${category}: ${matchedSkills.map(s => `• ${s}`).join(' ')}\n`;
                    }
                }

                return results || `No skills found matching '${args}'`;
            }
        }
    ];

    const handleCommand = (cmd: string) => {
        const [command, ...args] = cmd.trim().toLowerCase().split(' ');
        const found = commands.find(c => c.command === command);
        if (found) {
            return found.action(args.join(' '));
        }
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newOutput = [...output, `$ ${input}`, handleCommand(input)];
            setOutput(newOutput);
            setInput('');
            
            // Scroll to bottom
            if (terminalRef.current) {
                setTimeout(() => {
                    terminalRef.current!.scrollTop = terminalRef.current!.scrollHeight;
                }, 0);
            }
        }
    };

    return (
        <section id="about" className="min-h-screen py-24 md:py-36 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
            {/* Enhanced background pattern */}
            <div className="absolute inset-0 bg-[url('/path-to-subtle-pattern.png')] opacity-10 mix-blend-overlay" />
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-6 relative z-10 max-w-7xl"
            >
                {/* Refined Profile Section */}
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-col md:flex-row items-center justify-between md:space-x-16 mb-20"
                >
                    <div className="relative group mb-10 md:mb-0">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="w-56 h-56 md:w-72 md:h-72 relative"
                        >
                            <Image
                                src="/images/a.jpg"
                                alt={t('aboutme.profile.alt')}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-3xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl" />
                        </motion.div>
                    </div>

                    <div className="text-center md:text-left max-w-2xl">
                        <motion.h2 
                            variants={itemVariants}
                            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
                        >
                            {t('aboutme.title')}
                        </motion.h2>
                        <motion.p 
                            variants={itemVariants}
                            className="text-2xl md:text-3xl text-indigo-300 mb-8 font-light flex items-center justify-center md:justify-start gap-4"
                        >
                            {t('aboutme.greeting')}
                            <button
                                onClick={() => setShowTerminal(true)}
                                className="inline-flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                            >
                                <FaTerminal />
                                <span>Terminal</span>
                            </button>
                        </motion.p>
                        <motion.p 
                            variants={itemVariants}
                            className="text-lg md:text-xl text-gray-300 leading-relaxed"
                        >
                            {t('aboutme.bio')}
                        </motion.p>
                    </div>
                </motion.div>

                {/* Enhanced Contact Info Cards */}
                <motion.div 
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                >
                    {[
                        { icon: FaEnvelope, text: "salahsfar.pro@gmail.com", href: "mailto:salahsfar.pro@gmail.com" },
                        { icon: FaPhoneAlt, text: "+216 58962808" },
                        { icon: FaGithub, text: "github.com/med661", href: "https://github.com/med661" },
                        { icon: FaLinkedin, text: "Salah sfar", href: "https://www.linkedin.com/in/mohamed-salah-sfar-chaabane/" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -8 }}
                            className="group"
                        >
                            <div className="bg-gray-800/40 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-700/50 hover:border-indigo-500 transition-all duration-500">
                                <item.icon className="text-indigo-400 text-4xl mb-6 group-hover:text-indigo-300 transition-colors duration-300" />
                                {item.href ? (
                                    <a 
                                        href={item.href}
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 block text-base"
                                    >
                                        {item.text}
                                    </a>
                                ) : (
                                    <span className="text-gray-300 text-base">{item.text}</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Refined CV Download Section */}
                <motion.div 
                    variants={itemVariants}
                    className="text-center"
                >
                    <h3 className="text-4xl font-bold mb-10 text-white">{t('aboutme.cv.title')}</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        {['english', 'french'].map((lang) => (
                            <motion.a
                                key={lang}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={`/cv/${lang === 'english' ? 'fr.pdf' : 'salah_sfar_cv_fr.pdf'}`}
                                download
                                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-5 px-10 rounded-2xl shadow-lg hover:shadow-indigo-500/40 transition-all duration-500 flex items-center space-x-4"
                            >
                                <FaDownload className="text-2xl group-hover:animate-bounce" />
                                <span className="text-lg">{t(`aboutme.cv.${lang}`)}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {showTerminal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-gray-900 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <button
                                onClick={() => setShowTerminal(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="p-4 h-96 overflow-auto font-mono" ref={terminalRef}>
                            <div className="text-green-400 mb-4">
                                Welcome to my interactive terminal! Type 'help' to see available commands.
                            </div>
                            {output.map((line, i) => (
                                <div key={i} className={`mb-2 ${line.startsWith('$') ? 'text-blue-400' : 'text-gray-300'}`}>
                                    {line}
                                </div>
                            ))}
                            <div className="flex items-center">
                                <span className="text-blue-400 mr-2">$</span>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="bg-transparent outline-none text-white flex-1"
                                    autoFocus
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default About;