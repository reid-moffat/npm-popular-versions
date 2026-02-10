import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { suite, test, expect, afterEach } from 'vitest';
import { runCLI, validateJson, validateSimple, validateStandard } from '../helpers.ts';

suite('Tests with options', () => {
    suite('Limit option', () => {
        test('Limit 900 firebase standard', () => {
            const output: string = runCLI('firebase --limit 900');
            validateStandard(output, 'firebase', 900);
        });

        test('Limit 10000 @prisma/client json', () => {
            const output: string = runCLI('@prisma/client -l 10000 --json');
            validateJson(output, '@prisma/client', 10000);
        });

        test('Limit 2000 istanbul-lib-instrument simple', () => {
            const output: string = runCLI('istanbul-lib-instrument -l 2000 --simple');
            validateSimple(output, 'istanbul-lib-instrument', 2000);
        });
    });

    suite('Output file option', () => {
        const testFiles: string[] = [];

        afterEach(() => {
            testFiles.forEach((file) => {
                if (existsSync(file)) {
                    unlinkSync(file);
                }
            });
            testFiles.length = 0;
        });

        test('Output standard to .txt file', () => {
            const filePath: string = 'test-output-standard.txt';
            testFiles.push(filePath);

            const consoleOutput: string = runCLI(`typescript --output ${filePath}`);
            expect(consoleOutput).toContain(filePath);
            expect(existsSync(filePath)).toBe(true);

            const fileContent: string = readFileSync(filePath, 'utf-8');
            validateStandard(fileContent, 'typescript');
        });

        test('Output JSON to .json file', () => {
            const filePath: string = 'test-output-json.json';
            testFiles.push(filePath);

            const consoleOutput: string = runCLI(`commander --json --output ${filePath}`);
            expect(consoleOutput).toContain(filePath);
            expect(existsSync(filePath)).toBe(true);

            const fileContent: string = readFileSync(filePath, 'utf-8');
            validateJson(fileContent, 'commander');
        });

        test('Output simple to file without extension', () => {
            const filePath: string = 'test-output-simple';
            const expectedPath: string = filePath + '.txt';
            testFiles.push(expectedPath);

            const consoleOutput: string = runCLI(`keyv --simple -o ${filePath}`);
            expect(consoleOutput).toContain(expectedPath);
            expect(existsSync(expectedPath)).toBe(true);

            const fileContent: string = readFileSync(expectedPath, 'utf-8');
            validateSimple(fileContent, 'keyv');
        });

        test('Output JSON to file without extension adds .json', () => {
            const filePath: string = 'test-output-json-noext';
            const expectedPath: string = filePath + '.json';
            testFiles.push(expectedPath);

            const consoleOutput: string = runCLI(`pnpm --json -o ${filePath}`);
            expect(consoleOutput).toContain(expectedPath);
            expect(existsSync(expectedPath)).toBe(true);

            const fileContent: string = readFileSync(expectedPath, 'utf-8');
            validateJson(fileContent, 'pnpm');
        });
    });
});
