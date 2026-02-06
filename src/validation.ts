import { CommandInputs } from './Interfaces.ts';

function validateInputs(inputs: CommandInputs) {
    if (inputs.outputCount < 1) {
        throw new Error(`number of versions to output must be >= 1`);
    }

    if (inputs.outputJson && inputs.outputSimple) {
        throw new Error(`The --json and --simple flags cannot be combined`);
    }
}

export default validateInputs;
