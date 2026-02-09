import { suite, test, expect } from 'vitest';
import { runCLI } from './helpers.ts';
import packageJson from '../package.json' with { type: 'json' };

suite('Package metadata tests', () => {
    test('Package version', () => {
        const output: string = runCLI('--version');
        expect(output).to.equal(packageJson.version);
    });

    test('Package help', () => {
        const output: string = runCLI('--help');
        expect(output).toContain('Usage:');
        expect(output).toContain('Arguments:');
        expect(output).toContain('Options:');
    });
});
