import { CommandInputs, VersionDownloads } from './Interfaces.ts';

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
        // TODO
    } else {
        console.log(formattedOutput);
    }
}

function standardOutput(output: VersionDownloads, packageName: string) {
    const versionColWidth = Math.max(7, ...output.map(([v]) => v.length));
    const downloadsColWidth = Math.max(9, ...output.map(([, d]) => d.toLocaleString().length));

    let outputString: string = '\n';
    outputString += `Package: ${packageName}\n`;
    outputString += `Top ${output.length} versions (last week):\n`;

    const header = `| ${'#'.padEnd(4)} | ${'Version'.padEnd(versionColWidth)} | ${'Downloads'.padStart(downloadsColWidth)} |`;
    const separator = `|${'-'.repeat(6)}|${'-'.repeat(versionColWidth + 2)}|${'-'.repeat(downloadsColWidth + 2)}|`;

    outputString += separator + '\n';
    outputString += header + '\n';
    outputString += separator + '\n';

    let rank: number = 1;
    for (const [version, downloads] of output) {
        const rankStr = rank.toString().padEnd(4);
        const versionStr = version.padEnd(versionColWidth);
        const downloadsStr = downloads.toLocaleString().padStart(downloadsColWidth);
        outputString += `| ${rankStr} | ${versionStr} | ${downloadsStr} |\n`;
        rank++;
    }

    outputString += separator + '\n';

    return outputString;
}

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

function simpleOutput(output: VersionDownloads, inputs: CommandInputs) {
    let outputString: string = '\n';

    outputString += `Top ${inputs.outputCount} versions of ${inputs.packageName} (last week):\n`;
    let rank = 1;
    for (const [key, value] of output) {
        outputString += `${(rank + ':').toString().padEnd(3)}  ${key.toString().padEnd(20)} ${value}\n`;
        rank++;
    }

    return outputString;
}

export default outputData;
