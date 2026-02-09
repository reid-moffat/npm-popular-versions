import { suite, test, expect } from 'vitest';
import { runCLI } from './helpers.ts';

suite('JSON checks (no options)', () => {
    test('firebase  --json', () => {
        const output = runCLI('firebase --json');
        expect(output).toContain('firebase');
    });

    test('@types/node  --json', () => {
        const output = runCLI('@types/node  --json');
        expect(output).toContain('@types/node');
    });

    test('@prisma/client  --json', () => {
        const output = runCLI('@prisma/client  --json');
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
