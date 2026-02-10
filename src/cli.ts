#!/usr/bin/env node

import { Command } from 'commander';
import getPopularVersions from './getPopularVersions.ts';
import { CommandInputs, VersionDownloads } from './Interfaces.ts';
import validateInputs from './validation.ts';
import outputData from './output.ts';
import packageJson from '../package.json' with { type: 'json' };

async function main() {
    const program = new Command();

    program
        .name('npm-popular-versions')
        .description('Gets the most popular versions of a Node.js package')
        .version(packageJson.version);

    program
        .argument('<packageName>', 'Package name (required)')
        .option('-l, --limit <limit>', 'Maximum number of versions to output', parseInt, 10)
        .option('--json', 'Output JSON instead of a formatted table', false)
        .option('--simple', 'Minimal plain-text output instead of a formatted table', false)
        .option('-o, --output <file>', 'Write output to a file instead of stdout')
        .action(async (packageName: string, options) => {
            try {
                const inputs: CommandInputs = {
                    packageName,
                    outputLimit: options.limit,
                    outputJson: options.json,
                    outputSimple: options.simple,
                    outputFile: options.output,
                };

                validateInputs(inputs);

                const output: VersionDownloads = await getPopularVersions(
                    packageName,
                    options.limit
                );

                outputData(output, inputs);
            } catch (error) {
                console.error('Error:', error instanceof Error ? error.message : String(error));
                process.exit(1);
            }
        });

    program.allowExcessArguments(false); // Max 1 package name

    await program.parseAsync(process.argv);
}

main().catch((error) => {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
});
