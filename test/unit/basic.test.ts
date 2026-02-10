import { suite, test } from 'vitest';
import { runCLI, validateJson, validateStandard, validateSimple } from '../helpers.ts';
import { validPackages } from '../data.ts';

suite('Basic tests (no options)', () => {
    suite('Standard output', () => {
        validPackages.forEach((packageName: string) => {
            const command: string = packageName;
            test(command, (): void => {
                const output: string = runCLI(command);
                validateStandard(output, packageName);
            });

            setTimeout(() => {}, 500 + Math.random() * 500);
        });
    });

    suite('Simple output', () => {
        validPackages.forEach((packageName: string) => {
            const command: string = packageName + ' --simple';
            test(command, (): void => {
                const output: string = runCLI(command);
                validateSimple(output, packageName);
            });

            setTimeout(() => {}, 500 + Math.random() * 500);
        });
    });

    suite('JSON output', () => {
        validPackages.forEach((packageName: string) => {
            const command: string = packageName + ' --json';
            test(command, (): void => {
                const output: string = runCLI(command);
                validateJson(output, packageName);
            });

            setTimeout(() => {}, 500 + Math.random() * 500);
        });
    });
});
