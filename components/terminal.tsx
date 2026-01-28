import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaQuestionCircle, FaHistory, FaKeyboard, FaTerminal, FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { commands } from '@/interface/commands';

interface TerminalProps {
    onClose: () => void;
    t: (key: string) => string;  // Add this line
}

export const Terminal: React.FC<TerminalProps> = ({ onClose, t }) => {
    const [output, setOutput] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);

    const [lastTabTime, setLastTabTime] = useState(0);
    const [showHistoryBrowser, setShowHistoryBrowser] = useState(false);
    const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Command aliases for convenience
    const commandAliases: Record<string, string> = {
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

    // Update suggestions based on current input (but don't show them yet)
    useEffect(() => {
        if (input.trim() && suggestionsEnabled) {
            // Get the first word (command part)
            const inputParts = input.trim().split(' ');
            const commandPart = inputParts[0].toLowerCase();

            // If we're typing a command (not arguments)
            if (inputParts.length === 1) {
                // Get all available commands including aliases
                const availableCommands = [
                    ...commands.map(cmd => cmd.command),
                    ...Object.keys(commandAliases)
                ];

                // Filter commands that start with what user typed
                const matchedSuggestions = availableCommands.filter(cmd =>
                    cmd.startsWith(commandPart)
                );

                setSuggestions(matchedSuggestions);
                setSelectedSuggestion(0);
                // Don't show suggestions automatically - only on double Tab
                // setShowSuggestions(matchedSuggestions.length > 0);
            } else {
                // Handle argument suggestions for specific commands
                const command = inputParts[0].toLowerCase();
                if (command === 'cat') {
                    const files = ['bio', 'skills', 'contact'];
                    const argPart = inputParts[1] || '';
                    const matchedFiles = files.filter(file => file.startsWith(argPart.toLowerCase()));
                    setSuggestions(matchedFiles.map(file => `cat ${file}`));
                    setSelectedSuggestion(0);
                    // Don't show suggestions automatically - only on double Tab
                    // setShowSuggestions(matchedFiles.length > 0);
                } else {
                    // setShowSuggestions(false);
                }
            }
        } else {
            setSuggestions([]);
            // setShowSuggestions(false);
        }
    }, [input, suggestionsEnabled]);

    // Update scroll information when terminal content changes
    useEffect(() => {
        if (terminalRef.current) {
            const updateScrollInfo = () => {
                const { scrollTop, scrollHeight, clientHeight } = terminalRef.current!;
                setScrollPosition(scrollTop);
                setScrollHeight(scrollHeight);
                setClientHeight(clientHeight);
            };

            // Initial update
            updateScrollInfo();

            // Add scroll event listener
            const terminalElement = terminalRef.current;
            terminalElement.addEventListener('scroll', updateScrollInfo);

            // Clean up
            return () => {
                terminalElement.removeEventListener('scroll', updateScrollInfo);
            };
        }
    }, [output]);

    // Process command with pipe support
    const processCommand = (cmdString: string) => {
        if (!cmdString.trim()) return null;

        // Check for command aliases
        const expandedCmd = expandAlias(cmdString);

        // Check for pipe operator
        if (expandedCmd.includes('|')) {
            return handlePipedCommand(expandedCmd);
        }

        // Handle single command
        return handleSingleCommand(expandedCmd);
    };

    // Expand command aliases
    const expandAlias = (cmdString: string) => {
        const parts = cmdString.trim().split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        if (command in commandAliases) {
            const aliasExpansion = commandAliases[command];
            const aliasParts = aliasExpansion.split(' ');

            // If alias expands to command with args, combine with user args
            if (aliasParts.length > 1) {
                return aliasExpansion + (args ? ' ' + args : '');
            } else {
                // Simple command replacement
                return aliasExpansion + (args ? ' ' + args : '');
            }
        }

        return cmdString;
    };

    // Handle piped commands (cmd1 | cmd2)
    const handlePipedCommand = (cmdString: string) => {
        const [firstCmd, secondCmd] = cmdString.split('|').map(cmd => cmd.trim());

        // Execute first command
        const firstResult = handleSingleCommand(firstCmd);
        if (!firstResult) return 'Error: First command returned no output';

        // Use first command's output as input to second command
        const secondParts = secondCmd.split(' ');
        const secondCommand = secondParts[0];
        const secondArgs = secondParts.slice(1).join(' ');

        // Find the second command
        const foundSecond = commands.find(c => c.command === secondCommand);
        if (!foundSecond) return `Command not found: ${secondCommand}`;

        // Special handling for grep command
        if (secondCommand === 'grep') {
            return foundSecond.action(`${secondArgs} | ${firstCmd}`, setOutput, t);
        }

        // Generic piping - pass first result as argument to second command
        return foundSecond.action(`${secondArgs} ${firstResult}`, setOutput, t);
    };

    // Handle a single command
    const handleSingleCommand = (cmd: string) => {
        if (cmd === 'clear') {
            setOutput([]);
            return null;
        }

        // Split command and arguments
        const [command, ...args] = cmd.trim().split(' ');
        const found = commands.find(c => c.command === command);

        if (found) {
            return found.action(args.join(' '), setOutput, t);
        }

        return `Command not found: ${command}. Type 'help' for available commands or try 'alias' to see shortcuts.`;
    };

    // Smooth scroll to a specific position
    const smoothScrollTo = (element: HTMLElement, to: number, duration: number) => {
        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = () => {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };

        // Easing function for smooth scrolling
        const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        animateScroll();
    };

    // Execute a command and update terminal
    const executeCommand = (commandText: string) => {
        const trimmedInput = commandText.trim();
        if (trimmedInput) {
            // Add command to history
            setCommandHistory(prev => [...prev, trimmedInput]);
            setHistoryIndex(-1);

            const result = processCommand(trimmedInput);
            if (result !== null) {
                const newOutput = [...output, `$ ${trimmedInput}`, result];
                setOutput(newOutput);
            }
        }
        setInput('');
        setShowSuggestions(false);

        // Smooth scroll to bottom
        if (terminalRef.current) {
            setTimeout(() => {
                smoothScrollTo(terminalRef.current!, terminalRef.current!.scrollHeight, 300);
            }, 50);
        }
    };

    // Apply selected suggestion
    const applySuggestion = (suggestion: string) => {
        setInput(suggestion);
        setShowSuggestions(false);
        inputRef.current?.focus();
    };



    // Format terminal output with syntax highlighting
    const formatOutput = (line: string) => {
        // Command input lines
        if (line.startsWith('$')) {
            return <span className="text-blue-400">{line}</span>;
        }

        // Process multi-line text without changing color or size
        const processText = (text: string) => {
            // Split by newlines but preserve them in the output
            return text.split('\n').map((part, i, arr) => (
                <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <br />}
                </React.Fragment>
            ));
        };

        // Default text color for all output
        return <span className="text-gray-300">{processText(line)}</span>;
    };

    // Handle keyboard navigation and commands
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle Tab for suggestions and autocomplete
        if (e.key === 'Tab') {
            e.preventDefault();

            // Check if this is a double-tab (two tabs in quick succession)
            const now = Date.now();
            const isDoubleTap = (now - lastTabTime) < 500; // 500ms threshold for double-tab
            setLastTabTime(now);

            if (isDoubleTap && suggestionsEnabled) {
                // On double-tab, show suggestions
                if (suggestions.length > 0) {
                    setShowSuggestions(true);
                }
            } else if (showSuggestions && suggestions.length > 0) {
                // If suggestions are already showing, apply the selected one
                applySuggestion(suggestions[selectedSuggestion]);
            }
            return;
        }

        // Handle Enter to execute command
        if (e.key === 'Enter') {
            executeCommand(input);
            return;
        }

        // Handle Escape to close suggestions
        if (e.key === 'Escape') {
            setShowSuggestions(false);
            return;
        }

        // Handle keyboard shortcuts
        if (e.ctrlKey) {
            if (e.key === 'l') {
                e.preventDefault();
                setOutput([]);
                return;
            }
            if (e.key === 'k') {
                e.preventDefault();
                setShowShortcutsHelp(prev => !prev);
                return;
            }
            if (e.key === 'h') {
                e.preventDefault();
                setShowHistoryBrowser(prev => !prev);
                return;
            }
            if (e.key === 's') {
                e.preventDefault();
                setSuggestionsEnabled(prev => !prev);
                return;
            }
        }

        // Handle suggestion navigation
        if (showSuggestions && suggestions.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedSuggestion(prev => (prev + 1) % suggestions.length);
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedSuggestion(prev => (prev - 1 + suggestions.length) % suggestions.length);
                return;
            }
        } else {
            // Handle command history navigation
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistory.length > 0) {
                    const newIndex = historyIndex + 1;
                    if (newIndex < commandHistory.length) {
                        setHistoryIndex(newIndex);
                        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                    }
                }
                return;
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                } else if (historyIndex === 0) {
                    setHistoryIndex(-1);
                    setInput('');
                }
                return;
            }
        }

    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass-strong w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden border border-white/10"
            >
                {/* Terminal header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-gray-400 text-sm font-mono flex items-center select-none">
                             salah-sfar ~ portfolio
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setSuggestionsEnabled(prev => !prev)}
                            className={`${suggestionsEnabled ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-300 transition-colors text-sm flex items-center`}
                            title={`${suggestionsEnabled ? 'Disable' : 'Enable'} Suggestions`}
                        >
                            {suggestionsEnabled ?
                                <FaLightbulb className="mr-1" /> :
                                <FaRegLightbulb className="mr-1" />
                            }
                            <span className="hidden sm:inline">Suggestions</span>
                        </button>
                        <button
                            onClick={() => setShowShortcutsHelp(prev => !prev)}
                            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                            title="Keyboard Shortcuts (Ctrl+K)"
                        >
                            <FaKeyboard className="mr-1" />
                            <span className="hidden sm:inline">Shortcuts</span>
                        </button>
                        <button
                            onClick={() => setShowHistoryBrowser(prev => !prev)}
                            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                            title="Command History (Ctrl+H)"
                        >
                            <FaHistory className="mr-1" />
                            <span className="hidden sm:inline">History</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                            title="Close Terminal"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
                {/* Terminal content */}
                <div className="relative">
                    <div
                        className="p-4 h-96 overflow-auto font-mono custom-scrollbar"
                        ref={terminalRef}
                        style={{
                            scrollbarGutter: 'stable',
                            scrollBehavior: output.length > 0 ? 'auto' : 'smooth'
                        }}
                    >
                        {/* Scroll position indicator */}
                        {scrollHeight > clientHeight && (
                            <div className="absolute right-0 top-0 px-1 py-0.5 bg-gray-800/80 text-xs text-gray-400 rounded-bl">
                                {Math.round((scrollPosition / (scrollHeight - clientHeight)) * 100)}%
                            </div>
                        )}
                    <div className="text-green-400 mb-4 flex items-center">
                        <FaQuestionCircle className="mr-2" />
                        Welcome to my interactive terminal! Type 'help' to see available commands.
                    </div>
                    {output.map((line, i) => (
                        <div key={i} className="mb-2 whitespace-pre-wrap">
                            {formatOutput(line)}
                        </div>
                    ))}
                    <div className="flex items-center relative">
                        <span className="text-blue-400 mr-2">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);

                                // Don't show suggestions automatically
                                setShowSuggestions(false);
                            }}
                            onKeyDown={handleKeyDown}
                            onFocus={() => {
                                // Don't show suggestions on focus
                                setShowSuggestions(false);

                            }}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                            className="bg-transparent outline-none text-white flex-1"
                            autoFocus
                            aria-label="Terminal command input"
                            placeholder="Type a command..."
                        />
                    </div>

                    {/* Command suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute bottom-24 left-8 right-8 bg-gray-800 rounded-md shadow-lg overflow-hidden border border-gray-700 z-10">
                            <div className="p-1 text-xs text-gray-400 border-b border-gray-700 bg-gray-900">
                                Suggestions (use Tab to autocomplete, ↑↓ to navigate)
                            </div>
                            <ul>
                                {suggestions.map((suggestion, index) => {
                                    // Find if it's a command or an alias
                                    const isAlias = !commands.find(c => c.command === suggestion.split(' ')[0]);
                                    const aliasTarget = isAlias ? commandAliases[suggestion.split(' ')[0]] : null;
                                    const cmd = commands.find(c => c.command === (isAlias ? aliasTarget?.split(' ')[0] : suggestion.split(' ')[0]));

                                    return (
                                        <li
                                            key={suggestion}
                                            className={`px-3 py-2 cursor-pointer hover:bg-gray-700 flex justify-between ${index === selectedSuggestion ? 'bg-indigo-900' : ''}`}
                                            onClick={() => applySuggestion(suggestion)}
                                        >
                                            <span className="text-indigo-400 font-bold">{suggestion}</span>
                                            {isAlias ? (
                                                <span className="text-gray-400 text-xs">alias for: {aliasTarget}</span>
                                            ) : cmd ? (
                                                <span className="text-gray-400 text-xs">{cmd.description}</span>
                                            ) : null}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {/* Keyboard shortcuts help */}
                    {showShortcutsHelp && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute inset-x-8 top-20 bg-gray-800 rounded-md shadow-lg overflow-hidden border border-gray-700 z-20"
                        >
                            <div className="p-2 text-sm font-bold text-white border-b border-gray-700 bg-gray-900 flex justify-between">
                                <span>Keyboard Shortcuts</span>
                                <button onClick={() => setShowShortcutsHelp(false)} className="text-gray-400 hover:text-white">
                                    <FaTimes size={14} />
                                </button>
                            </div>
                            <div className="p-3 text-sm">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-gray-400">Tab (double-tap)</div>
                                    <div className="text-white">Show suggestions</div>
                                    <div className="text-gray-400">Tab</div>
                                    <div className="text-white">Apply selected suggestion</div>
                                    <div className="text-gray-400">↑ / ↓</div>
                                    <div className="text-white">Navigate history/suggestions</div>
                                    <div className="text-gray-400">Ctrl+L</div>
                                    <div className="text-white">Clear terminal</div>
                                    <div className="text-gray-400">Ctrl+K</div>
                                    <div className="text-white">Show/hide shortcuts</div>
                                    <div className="text-gray-400">Ctrl+H</div>
                                    <div className="text-white">Show/hide command history</div>
                                    <div className="text-gray-400">Ctrl+S</div>
                                    <div className="text-white">Toggle suggestions on/off</div>
                                    <div className="text-gray-400">Esc</div>
                                    <div className="text-white">Close suggestions</div>
                                    <div className="text-gray-400">|</div>
                                    <div className="text-white">Pipe commands (ex: skills | grep react)</div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Command history browser */}
                    {showHistoryBrowser && commandHistory.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute inset-x-8 top-20 bg-gray-800 rounded-md shadow-lg overflow-hidden border border-gray-700 z-20 max-h-64 flex flex-col"
                        >
                            <div className="p-2 text-sm font-bold text-white border-b border-gray-700 bg-gray-900 flex justify-between">
                                <span>Command History</span>
                                <button onClick={() => setShowHistoryBrowser(false)} className="text-gray-400 hover:text-white">
                                    <FaTimes size={14} />
                                </button>
                            </div>
                            <div className="overflow-auto flex-1">
                                <ul>
                                    {[...commandHistory].reverse().map((cmd, index) => (
                                        <li
                                            key={index}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-700 border-b border-gray-700 last:border-0"
                                            onClick={() => {
                                                setInput(cmd);
                                                setShowHistoryBrowser(false);
                                                inputRef.current?.focus();
                                            }}
                                        >
                                            <span className="text-blue-400 mr-2">$</span>
                                            <span className="text-white">{cmd}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};