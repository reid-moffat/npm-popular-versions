#!/usr/bin/env node

import { Command } from 'commander';
import getPopularVersions from './getPopularVersions.ts';
import { CommandInputs } from './Interfaces.ts';
import validateInputs from './validation.ts';
import outputData from './output.ts';

async function main() {
    const program = new Command();

    program
        .name('npm-popular-versions')
        .description('Gets the most popular versions of a Node.js package')
        .version('1.0.0');

    program
        .argument('<packageName>', 'Package name (required)')
        .option('-n, --number <count>', 'Number of versions to output', parseInt, 10)
        .option('--json', 'Output JSON instead of a formatted table', false)
        .option('--simple', 'Minimal plain-text output instead of a formatted table', false)
        .option('-o, --output <file>', 'Write output to a file instead of stdout')
        .action(async (packageName: string, options) => {
            const inputs: CommandInputs = {
                packageName,
                outputJson: options.json,
                outputSimple: options.simple,
                outputFile: options.output,
                outputCount: options.number,
            };

            validateInputs(inputs);

            const output: [string, number][] = await getPopularVersions(
                packageName,
                options.number
            );

            outputData(output, inputs);
        });

    program.allowExcessArguments(false); // Max 1 package name

    await program.parseAsync(process.argv);
}

main();
