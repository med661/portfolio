import { Command } from "./commandInterface";
import { textToFiglet } from './figlet';

// Add this before commands array
const gameManager = {
    currentGame: {
        word: '',
        hint: '',
        guessed: new Set<string>(),
        attempts: 6,
        isActive: false,
        hintsUsed: 0
    },

    startNewGame() {
        const wordList = [
            { word: 'typescript', hint: 'A statically typed superset of JavaScript' },
            { word: 'javascript', hint: 'The language of the web' },
            { word: 'react', hint: 'A popular UI library created by Facebook' },
            { word: 'nodejs', hint: 'JavaScript runtime built on Chrome\'s V8 engine' },
            { word: 'express', hint: 'Fast, unopinionated web framework for Node.js' },
            { word: 'mongodb', hint: 'NoSQL database that stores data in JSON-like documents' },
            { word: 'docker', hint: 'Platform for developing, shipping, and running applications in containers' },
            { word: 'github', hint: 'Web-based platform for version control using Git' },
            { word: 'frontend', hint: 'The part of a website that users interact with directly' },
            { word: 'backend', hint: 'The server-side of a website that users don\'t see directly' }
        ];
        
        const randomIndex = Math.floor(Math.random() * wordList.length);
        const selectedWord = wordList[randomIndex];
        
        this.currentGame = {
            word: selectedWord.word,
            hint: selectedWord.hint,
            guessed: new Set<string>(),
            attempts: 6,
            isActive: true,
            hintsUsed: 0
        };
        return this.getGameStatus();
    },

    makeGuess(letter: string) {
        if (!this.currentGame.isActive) {
            return 'No active game. Type "hangman start" to begin!';
        }

        if (this.currentGame.guessed.has(letter)) {
            return `You already guessed '${letter}'! Try another letter.\n${this.getGameStatus()}`;
        }

        this.currentGame.guessed.add(letter);

        if (!this.currentGame.word.includes(letter)) {
            this.currentGame.attempts--;

            if (this.currentGame.attempts === 0) {
                this.currentGame.isActive = false;
                return `💀 Game Over! The word was: ${this.currentGame.word}\nType 'hangman start' to play again!`;
            }

            return `❌ Wrong guess!\n${this.getGameStatus()}`;
        }

        if (this.isWin()) {
            this.currentGame.isActive = false;
            return `🎉 Congratulations! You guessed the word: ${this.currentGame.word}\nType 'hangman start' to play again!`;
        }

        return `✅ Good guess!\n${this.getGameStatus()}`;
    },

    getGameStatus() {
        const displayWord = this.currentGame.word
            .split('')
            .map(letter => this.currentGame.guessed.has(letter) ? letter : '_')
            .join(' ');

        let status = `\nWord: ${displayWord}
Attempts left: ${'❤️'.repeat(this.currentGame.attempts)}
Guessed letters: ${Array.from(this.currentGame.guessed).join(', ') || 'none'}`;
        
        // Add hint info
        if (this.currentGame.hintsUsed > 0) {
            status += `\nHint: ${this.currentGame.hint}`;
        } else {
            status += `\nType 'hangman hint' to get a hint (costs 1 attempt)`;
        }
        
        return status;
    },

    isWin() {
        return this.currentGame.word
            .split('')
            .every(letter => this.currentGame.guessed.has(letter));
    },
    
    getHint() {
        if (!this.currentGame.isActive) {
            return 'No active game. Type "hangman start" to begin!';
        }
        
        if (this.currentGame.hintsUsed > 0) {
            return `Hint: ${this.currentGame.hint}\n${this.getGameStatus()}`;
        }
        
        // Using a hint costs one attempt
        this.currentGame.attempts--;
        this.currentGame.hintsUsed++;
        
        if (this.currentGame.attempts === 0) {
            this.currentGame.isActive = false;
            return `💀 Game Over! The word was: ${this.currentGame.word}\nType 'hangman start' to play again!`;
        }
        
        return `🔍 Hint: ${this.currentGame.hint}\n${this.getGameStatus()}`;
    }
};

export const commands: Command[] = [
    {
        command: 'alias',
        description: 'Show command aliases',
        action: () => {
            const aliases = {
                'ls': 'help',
                'h': 'help',
                'cls': 'clear',
                'c': 'clear',
                'sk': 'skills',
                'bio': 'cat bio',
                'projects': 'projectex -a',
                'me': 'whoami',
                'g': 'grep',
                'find': 'grepskills'
            };

            let output = '🔄 Available Command Aliases:\n\n';

            for (const [alias, command] of Object.entries(aliases)) {
                output += `${alias.padEnd(10)} → ${command}\n`;
            }

            return output;
        }
    },
    {
        command: 'help',
        description: 'Show available commands',
        action: () =>
`🚀 Available Commands

📋 General:
  ℹ️  help       Shows this help message
  👤  whoami     Show the current user
  🧹  clear      Clear the terminal screen (alias: cls, c)
  📖  man        Show manual for a command (ex: man grep)
  🔄  alias      Show available command shortcuts

👨‍💻 Professional Info:
  📝  cat bio    View my professional biography (alias: bio)
  🛠️  skills     Display my technical skillset (alias: sk)
  📧  contact    Show my contact information
  📂  projectex  List professional projects (alias: projects)

🔍 Search Tools:
  🔎  grep       Search through command output (alias: g)
  🔍  grepskills Search through skills (alias: find)

🎮 Games & Fun:
  ✊  rps        Play Rock Paper Scissors (ex: rps rock)
  🔤  hangman    Play Word Guessing game (ex: hangman start)
  🎨  figlet     Display text as ASCII art (ex: figlet Hello)

⌨️ Keyboard Shortcuts:
  Tab (2x)    Show command suggestions
  Tab        Apply selected suggestion
  ↑↓         Navigate history/suggestions
  Ctrl+L     Clear terminal
  Ctrl+K     Show keyboard shortcuts
  Ctrl+H     Show command history
  Ctrl+S     Toggle suggestions on/off
  |          Pipe commands (ex: skills | grep react)

Type any command to get started!`
    },



    {
        command: 'skills',
        description: 'List technical skills',
        action: () =>
            `My Technical Skills           :
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
    Can be filtered using grep command.`,
    // Add to the man command's manPages object
    projectex: `NAME
projectex - List professional projects

SYNOPSIS
projectex [option]

DESCRIPTION
Display professional experience projects with details.
Shows project title, description, and technologies used.

OPTIONS
-a, --all    List all projects
-h, --help   Show this help message

EXAMPLES
projectex -a     Show all projects
projectex -h     Show this help message`,
                figlet: `NAME
    figlet - display text as ASCII art

SYNOPSIS
    figlet <text>

DESCRIPTION
    Converts text to large ASCII art characters.
    Makes your text stand out in the terminal.

EXAMPLES
    figlet Hello     - Display "Hello" in ASCII art
    figlet Welcome   - Display "Welcome" in ASCII art`
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
        action: (_args?: string, setOutput?: (output: string[]) => void) => {
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
        command: 'cat',
        description: 'View file contents',
        action: (args?: string, _setOutput?: (output: string[]) => void, t?: (key: string) => string) => {
            if (!t) return "Translation function not available";

            if (!args) return "Usage: cat <filename>\nExample: cat bio";

            const files: { [key: string]: string } = {
                'bio': t('aboutme.bio'),
                'skills': t('skills'),
                'contact': t('contact')
            };

            const requestedFile = args.toLowerCase().trim();

            if (!(requestedFile in files)) {
                return `Error: File '${requestedFile}' not found.\nAvailable files: ${Object.keys(files).join(', ')}`;
            }

            return files[requestedFile];
        }
    },
    {
        command: 'rps',
        description: 'Play Rock Paper Scissors',
        action: (args?: string) => {
            const playerChoice = args?.trim().toLowerCase();
            const choices = ['rock', 'paper', 'scissors'];

            if (!playerChoice || !choices.includes(playerChoice)) {
                return `Welcome to Rock Paper Scissors!
Usage: rps <rock|paper|scissors>
Example: rps rock`;
            }

            const computerChoice = choices[Math.floor(Math.random() * choices.length)];

            // Game logic
            const getResult = (player: string, computer: string) => {
                if (player === computer) return '🤝 Draw!';
                if (
                    (player === 'rock' && computer === 'scissors') ||
                    (player === 'paper' && computer === 'rock') ||
                    (player === 'scissors' && computer === 'paper')
                ) {
                    return '🎉 You win!';
                }
                return '💻 Computer wins!';
            };

            // Format choices with emojis
            const formatChoice = (choice: string) => {
                const emojis = {
                    rock: '🪨',
                    paper: '📄',
                    scissors: '✂️'
                };
                return `${choice.toUpperCase()} ${emojis[choice as keyof typeof emojis]}`;
            };

            return `Your choice: ${formatChoice(playerChoice)}
Computer's choice: ${formatChoice(computerChoice)}
Result: ${getResult(playerChoice, computerChoice)}`;
        }
    },
    {
        command: 'whoami',
        description: 'the current user laptop',
        action: () => {
            return `Salah sfar`
        }
    },
    // Add this to your commands array
{
    command: 'projectex',
    description: 'List professional projects',
    action: (args?: string, _setOutput?: (output: string[]) => void, t?: (key: string) => string) => {
        if (!t) return "Translation function not available";

        // Show help if no arguments
        if (!args) {
            return `Usage: projects [option]
Options:
  -a, --all    List all projects
  -h, --help   Show this help message
Example: projects -a`;
        }

        const arg = args.trim().toLowerCase();

        if (arg === '-h' || arg === '--help') {
            return `projects - List professional projects

Usage: projects [option]
Options:
  -a, --all    List all projects
  -h, --help   Show this help message

Example: projects -a`;
        }

        if (arg === '-a' || arg === '--all') {
            const projectKeys = ['project1', 'project2', 'project3'];
            let output = `=== ${t('experiences.title')} ===\n`;
            output += `${t('experiences.job1.company')} | ${t('experiences.job1.title')}\n`;
            output += `${t('experiences.job1.date')}\n\n`;

            projectKeys.forEach((projectKey) => {
                output += `🚀 ${t(`experiences.job1.projects.${projectKey}.title`)}\n`;
                output += `📝 ${t(`experiences.job1.projects.${projectKey}.description`)}\n`;
                output += `🛠️  ${t(`experiences.job1.projects.${projectKey}.technologies`)}\n\n`;
            });

            return output;
        }

        return `Invalid option: ${args}\nUse 'projects -h' for help`;
    }
},
{
    command: 'hangman',
    description: 'Play Word Guessing game',
    action: (args?: string) => {
        if (!args) {
            return `🎮 Word Guessing Game!
Commands:
- hangman start : Start new game
- hangman <letter> : Guess a letter
- hangman hint : Get a hint (costs 1 attempt)
- hangman help : Show commands

Type 'hangman start' to begin!`;
        }

        const command = args.toLowerCase().trim();

        if (command === 'help') {
            return `🎮 Word Guessing Commands:
start     : Start new game
<letter>  : Guess a letter
hint      : Get a hint (costs 1 attempt)
help      : Show this help message

Example:
hangman start   - Start new game
hangman a       - Guess letter 'a'
hangman hint    - Get a hint`;
        }

        if (command === 'start') {
            return gameManager.startNewGame();
        }
        
        if (command === 'hint') {
            return gameManager.getHint();
        }

        if (command.length !== 1) {
            return 'Please guess one letter at a time!';
        }

        return gameManager.makeGuess(command);
    }
},
// Add the figlet command
{
    command: 'figlet',
    description: 'Display text as ASCII art',
    action: (args?: string) => {
        if (!args || args.trim() === '') {
            return `Usage: figlet <text>
Example: figlet Hello World

Displays text as ASCII art.`;
        }
        
        return textToFiglet(args);
    }
}
];
