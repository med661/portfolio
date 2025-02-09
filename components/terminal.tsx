import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
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
    const terminalRef = useRef<HTMLDivElement>(null);

    const handleCommand = (cmd: string) => {
        if (!cmd.trim()) return null;

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

        return `Command not found: ${command}. Type 'help' for available commands.`;
    };

    // Add this function to handle arrow key navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmedInput = input.trim();
            if (trimmedInput) {
                // Add command to history
                setCommandHistory(prev => [...prev, trimmedInput]);
                setHistoryIndex(-1);
                
                const result = handleCommand(trimmedInput);
                if (result !== null) {
                    const newOutput = [...output, `$ ${trimmedInput}`, result];
                    setOutput(newOutput);
                }
            }
            setInput('');
            
            // Scroll to bottom
            if (terminalRef.current) {
                setTimeout(() => {
                    terminalRef.current!.scrollTop = terminalRef.current!.scrollHeight;
                }, 0);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < commandHistory.length) {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden"
            >
                {/* Terminal header */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>
                {/* Terminal content */}
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
    );
};