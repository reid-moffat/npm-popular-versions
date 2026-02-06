#!/usr/bin/env node
import { Command } from 'commander';

async function main() {
    const program = new Command();

    program
        .name('npm-popular-versions')
        .description('Gets the most popular versions of a Node.js package')
        .version('1.0.0');

    program
        .argument('<packageName>', 'Package name (required)')
        .option('-n, --number <count>', 'Number of versions to output', parseInt, 10)
        .option('--json', 'Output JSON instead of a table', false)
        .option('-o, --output <file>', 'Write output to a file instead of stdout')
        .action((packageName: string, options) => {
            const outputJson: boolean = options.json;
            const outputFile: string | undefined = options.output;
            const outputCount: number = options.number;

            console.log({
                packageName,
                outputJson,
                outputFile,
                outputCount,
            });
        });

    program.allowExcessArguments(false); // Max 1 package name

    await program.parseAsync(process.argv);
}

main();

const packageName: string = process.argv[2];

const LIMIT = 10;

try {
    const response: Response = await fetch(
        `https://api.npmjs.org/versions/${packageName.replaceAll('/', '%2F')}/last-week`
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: { package: string; downloads: { [key: string]: number } } = await response.json();

    const entries: [string, number][] = Object.entries(data.downloads);
    const sorted: [string, number][] = [];

    for (const entry of entries) {
        const downloads: number = entry[1];

        // Skip if items == LIMIT and this one isn't bigger than the smallest
        if (sorted.length >= LIMIT && downloads <= sorted[LIMIT - 1][1]) {
            continue;
        }

        let i: number = 0;
        while (i < sorted.length && sorted[i][1] > downloads) {
            i++;
        }
        sorted.splice(i, 0, entry as [string, number]);

        if (sorted.length > LIMIT) {
            sorted.pop();
        }
    }

    console.log(`\nTop ${LIMIT} versions of ${packageName} (last week):`);
    sorted.forEach(([version, downloads], index) => {
        console.log(
            `${`${index + 1}:`.padEnd(3)} ${version.padEnd(25)} ${downloads.toLocaleString()} downloads`
        );
    });
} catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    console.error(`Error fetching data: ${message}`);
    process.exit(1);
}
