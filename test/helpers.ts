import { execSync } from 'child_process';
import { expect } from 'vitest';

function runCLI(args: string): string {
    return execSync(`npm-popular-versions ${args}`, {
        encoding: 'utf-8',
        stdio: 'pipe',
    }).trim();
}

/**
 * Validates a JSON response
 */
function validateJson(json: string, packageName: string) {
    expect(() => JSON.parse(json)).not.toThrow();
    const data: { package: string; topVersions: object } = JSON.parse(json);

    expect(data).toHaveProperty('package', packageName);
    expect(data).toHaveProperty('topVersions');

    // Top versions must have 10 key:value pairs in the format semver:number (sorted)
    const topVersions: object = data.topVersions;

    expect(typeof topVersions).toBe('object');
    expect(topVersions).not.toBeNull();

    const entries: [string, number][] = Object.entries(topVersions);
    expect(entries).toHaveLength(10);

    const values: number[] = [];
    entries.forEach(([key, value]) => {
        expect(key).toMatch(/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/);

        expect(Number.isInteger(value)).toBe(true);
        expect(value).toBeGreaterThan(0);

        values.push(value);
    });

    const sortedValues: number[] = [...values].sort((a, b) => b - a);
    expect(values).toEqual(sortedValues);
}

export { runCLI, validateJson };
