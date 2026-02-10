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
function validateJson(json: string, packageName: string, limit: number = 10) {
    expect(() => JSON.parse(json)).not.toThrow();
    const data: { package: string; topVersions: object } = JSON.parse(json);

    // Validate top-level data
    expect(data).toHaveProperty('package', packageName);
    expect(data).toHaveProperty('topVersions');

    const topVersions: object = data.topVersions;

    expect(typeof topVersions).toBe('object');
    expect(topVersions).not.toBeNull();

    // Entries must be below the max and semver:downloads pairs
    const entries: [string, number][] = Object.entries(topVersions);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.length).toBeLessThanOrEqual(limit);

    const values: number[] = [];
    entries.forEach(([key, value]: [string, number]): void => {
        expect(key).toMatch(/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/);

        expect(Number.isInteger(value)).toBe(true);
        expect(value).toBeGreaterThan(0);

        values.push(value);
    });

    validateSorted(values);
}

/**
 * Validates the standard (table) output format
 */
function validateStandard(output: string, packageName: string, limit: number = 10) {
    const lines: string[] = output.split('\n');

    // First line: Package: {packageName}, Second line: Top {limit} versions (last week)
    expect(lines[0]).toBe(`Package: ${packageName}`);
    expect(lines[1]).toMatch(/^Top \d+ versions \(last week\):$/);

    // Lines 2, 4, and final are separators (|------|...), 3 is header
    expect(lines[2]).toMatch(/^\|[-]+\|[-]+\|[-]+\|$/);
    expect(lines[4]).toMatch(/^\|[-]+\|[-]+\|[-]+\|$/);
    expect(lines[lines.length - 1]).toMatch(/^\|[-]+\|[-]+\|[-]+\|$/);

    expect(lines[3]).toMatch(/^\|\s*#\s*\|\s*Version\s*\|\s*Downloads\s*\|$/);

    // Row format: | {rank} | {version} | {downloads} |
    const dataRows: string[] = lines.slice(5, -1);
    expect(dataRows.length).toBeGreaterThan(0);
    expect(dataRows.length).toBeLessThanOrEqual(limit);

    const values: number[] = [];
    dataRows.forEach((row: string, index: number): void => {
        expect(row).toMatch(/^\|\s*\d+\s*\|\s*[\w.-]+\s*\|\s*[\d,]+\s*\|$/);

        const parts: string[] = row.split('|').filter((p: string): string => p.trim());
        expect(parts).toHaveLength(3);

        const rank: number = parseInt(parts[0].trim(), 10);
        const version: string = parts[1].trim();
        const downloads: number = parseInt(parts[2].trim().replace(/,/g, ''), 10);

        expect(rank).toBe(index + 1);
        expect(version).toMatch(/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/);
        expect(Number.isInteger(downloads)).toBe(true);
        expect(downloads).toBeGreaterThan(0);

        values.push(downloads);
    });

    validateSorted(values);
}

/**
 * Validates the simple output format
 */
function validateSimple(output: string, packageName: string, limit: number = 10) {
    const lines: string[] = output.split('\n');

    // First line: Top {limit} versions of {packageName} (last week):
    const escapedName: string = packageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    expect(lines[0]).toMatch(new RegExp(`^Top \\d+ versions of ${escapedName} \\(last week\\):$`));

    // Remaining lines are version/download pairs: {version.padEnd(10)} {downloads}
    const dataLines: string[] = lines.slice(1);
    expect(dataLines.length).toBeGreaterThan(0);
    expect(dataLines.length).toBeLessThanOrEqual(limit);

    const values: number[] = [];
    dataLines.forEach((line) => {
        const parts: string[] = line.trim().split(/\s+/);
        expect(parts).toHaveLength(2);

        const version: string = parts[0];
        const downloads: number = parseInt(parts[1], 10);

        expect(version).toMatch(/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/);
        expect(Number.isInteger(downloads)).toBe(true);
        expect(downloads).toBeGreaterThan(0);

        values.push(downloads);
    });

    validateSorted(values);
}

/**
 * Validates an array of download numbers is in descending order
 */
function validateSorted(downloadValues: number[]) {
    const sortedValues: number[] = [...downloadValues].sort((a, b) => b - a);
    expect(downloadValues).toEqual(sortedValues);
}

export { runCLI, validateJson, validateStandard, validateSimple };
