import { writeFileSync } from 'node:fs';
import { extname } from 'node:path';
import { CommandInputs, VersionDownloads } from './Interfaces.ts';

/**
 * Formats and outputs the package versions with the specified format
 */
function outputData(output: VersionDownloads, inputs: CommandInputs) {
    let formattedOutput;
    if (inputs.outputJson) {
        formattedOutput = jsonOutput(output, inputs.packageName);
    } else if (inputs.outputSimple) {
        formattedOutput = simpleOutput(output, inputs);
    } else {
        formattedOutput = standardOutput(output, inputs.packageName);
    }

    if (inputs.outputFile) {
        let filePath: string = inputs.outputFile;
        if (!extname(filePath)) {
            filePath += inputs.outputJson ? '.json' : '.txt';
        }
        writeFileSync(filePath, formattedOutput);
        console.log(`Output written to ${filePath}`);
    } else {
        console.log(formattedOutput);
    }
}

/**
 * Standard output (no flag) -> makes a table
 */
function standardOutput(output: VersionDownloads, packageName: string) {
    const versionColWidth: number = Math.max(7, ...output.map(([v]) => v.length));
    const downloadsColWidth: number = Math.max(
        9,
        ...output.map(([, d]) => d.toLocaleString().length)
    );

    let outputString: string = '';
    outputString += `Package: ${packageName}\n`;
    outputString += `Top ${output.length} versions (last week):\n`;

    const header = `| ${'#'.padEnd(4)} | ${'Version'.padEnd(versionColWidth)} | ${'Downloads'.padStart(downloadsColWidth)} |`;
    const separator = `|${'-'.repeat(6)}|${'-'.repeat(versionColWidth + 2)}|${'-'.repeat(downloadsColWidth + 2)}|`;

    outputString += separator + '\n';
    outputString += header + '\n';
    outputString += separator + '\n';

    let rank: number = 1;
    for (const [version, downloads] of output) {
        const rankStr: string = rank.toString().padEnd(4);
        const versionStr: string = version.padEnd(versionColWidth);
        const downloadsStr: string = downloads.toLocaleString().padStart(downloadsColWidth);
        outputString += `| ${rankStr} | ${versionStr} | ${downloadsStr} |\n`;
        rank++;
    }

    outputString += separator;

    return outputString;
}

/**
 * JSON output (--json flag) -> makes a simple JSON object
 */
function jsonOutput(output: VersionDownloads, packageName: string) {
    const outputJson: { package: string; topVersions: { [key: string]: number } } = {
        package: packageName,
        topVersions: {},
    };

    for (const version of output) {
        outputJson.topVersions[version[0]] = version[1];
    }

    return JSON.stringify(outputJson, null, 4);
}

/**
 * Simple output (--simple flag) -> simple header and lines with version & downloads
 */
function simpleOutput(output: VersionDownloads, inputs: CommandInputs) {
    let outputString: string = '';

    outputString += `Top ${inputs.outputCount} versions of ${inputs.packageName} (last week):`;
    for (const [key, value] of output) {
        outputString += `\n${key.toString().padEnd(10)} ${value}`;
    }

    return outputString;
}

export default outputData;
