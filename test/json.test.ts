import { suite, test } from 'vitest';
import { runCLI, validateJson } from './helpers.ts';

suite('JSON checks (no options)', () => {
    test('firebase  --json', () => {
        const output = runCLI('firebase --json');
        validateJson(output, 'firebase');
    });

    test('@types/node  --json', () => {
        const output = runCLI('@types/node  --json');
        validateJson(output, '@types/node');
    });

    test('@prisma/client  --json', () => {
        const output = runCLI('@prisma/client  --json');
        validateJson(output, '@prisma/client');
    });
});
