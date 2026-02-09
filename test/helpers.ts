import { execSync } from 'child_process';

function runCLI(args: string): string {
    return execSync(`npm-popular-versions ${args}`, {
        encoding: 'utf-8',
        stdio: 'pipe',
    }).trim();
}

export { runCLI };
