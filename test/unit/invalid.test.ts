import { suite, test, expect } from 'vitest';
import { runCLIError } from '../helpers.ts';
import { invalidPackages } from '../data.ts';
import { setTimeout } from 'node:timers/promises';

const delay = (): Promise<void> => setTimeout(1100 + Math.random() * 800);

suite('Invalid packages', () => {
    invalidPackages.forEach((packageName: string) => {
        test(`Rejects invalid package: ${packageName}`, async (): Promise<void> => {
            const stderr: string = runCLIError(packageName);
            expect(stderr).toContain('Error');
            await delay();
        });
    });
});
