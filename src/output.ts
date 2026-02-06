import { CommandInputs } from './Interfaces.ts';

function outputData(output: [string, number][], inputs: CommandInputs) {
    let formattedOutput;
    if (inputs.outputJson) {
        formattedOutput = jsonOutput(output, inputs.packageName);
    } else if (inputs.outputSimple) {
        formattedOutput = simpleOutput(output, inputs.packageName);
    } else {
        formattedOutput = tableOutput(output, inputs.packageName);
    }

    if (inputs.outputFile) {
        // TODO
    } else {
        console.log(formattedOutput);
    }
}

function jsonOutput(output: [string, number][], packageName: string) {
    const outputJson: { package: string; topVersions: { [key: string]: number } } = {
        package: packageName,
        topVersions: {},
    };

    for (const version of output) {
        outputJson.topVersions[version[0]] = version[1];
    }

    return JSON.stringify(outputJson, null, 4);
}

function simpleOutput(output: [string, number][], packageName: string) {
    let outputString: string = '\n';

    outputString += `Top 10 versions of ${packageName} (last week):\n`;
    let rank = 1;
    for (const [key, value] of output) {
        outputString += `${(rank + ':').toString().padEnd(3)}  ${key.toString().padEnd(20)} ${value}\n`;
        rank++;
    }

    return outputString;
}

function tableOutput(output: [string, number][], packageName: string) {
    let outputString: string = '\n';

    outputString += `Package: ${packageName}`;

    return outputString;
}

export default outputData;
