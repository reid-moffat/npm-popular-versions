import { suite, test, expect } from 'vitest';
import { runCLI } from '../helpers.ts';

suite('Tests with options', () => {
    test('Fetch JSON', () => {
        const output = runCLI('firebase --json');
        expect(output).toContain('firebase');
    });
});
