import { suite, test } from 'vitest';
import { runCLI, validateJson, validateSimple, validateStandard } from '../helpers.ts';

suite('Tests with options', () => {
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
