import { setTimeout } from 'node:timers/promises';
import { suite, test } from 'vitest';
import { runCLI, validateJson, validateStandard, validateSimple } from '../helpers.ts';
import { validPackages } from '../data.ts';

const delay = (): Promise<void> => setTimeout(800 + Math.random() * 700);

suite('Basic tests (no options)', () => {
    suite('Standard output', () => {
        validPackages.forEach((packageName: string) => {
            test(packageName, async (): Promise<void> => {
                const output: string = runCLI(packageName);
                validateStandard(output, packageName);
                await delay();
            });
        });
    });

    suite('Simple output', () => {
        validPackages.forEach((packageName: string) => {
            const command: string = packageName + ' --simple';
            test(command, async (): Promise<void> => {
                const output: string = runCLI(command);
                validateSimple(output, packageName);
                await delay();
            });
        });
    });

    suite('JSON output', () => {
        validPackages.forEach((packageName: string) => {
            const command: string = packageName + ' --json';
            test(command, async (): Promise<void> => {
                const output: string = runCLI(command);
                validateJson(output, packageName);
                await delay();
            });
        });
    });
});
