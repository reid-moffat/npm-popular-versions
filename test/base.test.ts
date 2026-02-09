import { suite, test, expect } from 'vitest';
import { runCLI } from './helpers.ts';

suite('Base checks (no options)', () => {
    test('firebase', () => {
        const output = runCLI('firebase');
        expect(output).toContain('firebase');
    });

    test('@types/node', () => {
        const output = runCLI('@types/node');
        expect(output).toContain('@types/node');
    });

    test('@prisma/client', () => {
        const output = runCLI('@prisma/client');
        expect(output).toContain('@prisma/client');
    });

    test('should handle invalid package names gracefully', () => {
        runCLI('invalidpkgsjahflasaksfhjsafjldsjldsflkdsa');
    });

    test('should respect --json flag', () => {
        const output = runCLI('firebase --json');
        expect(() => JSON.parse(output)).not.toThrow();
        const data = JSON.parse(output);
        expect(data).toHaveProperty('package', 'firebase');
        expect(data).toHaveProperty('topVersions');
    });
});
