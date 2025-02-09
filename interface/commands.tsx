import { Command } from "./commandInterface";

export const commands: Command[] = [
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
        action: (args?: string, setOutput?: (output: string[]) => void) => {
            if (setOutput) {
                setOutput([]);
            }
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
    },
    {
        command: 'cat bio',
        description: 'View my biography',
        action: (args?: string, setOutput?: (output: string[]) => void, t?: (key: string) => string) => {
            if (!t) return "Translation function not available";
            return t('aboutme.bio');
        }
    },{
        command: 'experience',
        description: 'View my projects',
        action: () =>  "I have worked on several projects, including a social media platform, a chat application, and a personal portfolio. I have experience with both frontend and backend technologies, and I am always looking to learn new things."
    }
];

