import { suite, test, expect } from 'vitest';
import { runCLI } from './helpers.ts';

suite('Simple checks (no options)', () => {
    test('firebase --simple', () => {
        const output = runCLI('firebase --simple');
        expect(output).toContain('firebase');
    });

    test('@types/node --simple', () => {
        const output = runCLI('@types/node --simple');
        expect(output).toContain('@types/node');
    });

    test('@prisma/client --simple', () => {
        const output = runCLI('@prisma/client --simple');
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
