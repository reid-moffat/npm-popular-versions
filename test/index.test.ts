import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

function runCLI(args: string): string {
    return execSync(`npm-popular-versions ${args}`, {
        encoding: 'utf-8',
        stdio: 'pipe',
    }).trim();
}

describe('CLI End-to-End Tests', () => {
    it('should display version', () => {
        const output = runCLI('--version');
        expect(output).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('should display help', () => {
        const output = runCLI('--help');
        expect(output).toContain('Usage:');
        expect(output).toContain('Options:');
    });

    it('should fetch popular versions for a package', () => {
        const output = runCLI('firebase');
        expect(output).toContain('firebase');
    });

    it('should handle scoped packages', () => {
        const output = runCLI('@types/node');
        expect(output).toContain('@types/node');
    });

    it('should handle packages with many dependencies', () => {
        const output = runCLI('@prisma/client');
        expect(output).toContain('@prisma/client');
    });

    it('should handle invalid package names gracefully', () => {
        runCLI('invalidpkgsjahflasaksfhjsafjldsjldsflkdsa');
    });

    it('should respect --json flag', () => {
        const output = runCLI('firebase --json');
        expect(() => JSON.parse(output)).not.toThrow();
        const data = JSON.parse(output);
        expect(data).toHaveProperty('package', 'firebase');
        expect(data).toHaveProperty('topVersions');
    });
});
