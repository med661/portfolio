export interface Command {
    command: string;
    description: string;
    action: (args?: string, setOutput?: (output: string[]) => void, t?: (key: string) => string) => string;
}