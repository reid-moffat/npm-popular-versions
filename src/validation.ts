import { CommandInputs } from './Interfaces.ts';

function validateInputs(inputs: CommandInputs): void {
    // Package name: Simple validation (string, non-empty, no leading/trailing whitespace)
    // If the package name is invalid, easier to catch via API
    if (typeof inputs.packageName !== 'string') {
        throw new Error(`The package name must be a string`);
    }

    if (inputs.packageName.length === 0) {
        throw new Error(`The package name must be non-empty`);
    }

    if (inputs.packageName !== inputs.packageName.trim()) {
        throw new Error(`The package name must not have leading or trailing whitespace`);
    }

    // Output count: Must be a positive real number
    if (typeof inputs.outputCount !== 'number' || !Number.isInteger(inputs.outputCount)) {
        throw new Error(`The number of versions to output must be an integer`);
    }

    if (inputs.outputCount < 1) {
        throw new Error(`The number of versions to output must be at least 1`);
    }

    // Output json & simple: Must both be booleans and are mutually exclusive
    if (typeof inputs.outputJson !== 'boolean') {
        throw new Error(`The flag outputJson must be boolean`);
    }

    if (typeof inputs.outputSimple !== 'boolean') {
        throw new Error(`The flag outputSimple must be boolean`);
    }

    if (inputs.outputJson && inputs.outputSimple) {
        throw new Error(`The --json and --simple flags cannot be combined`);
    }

    // Output file: Must be undefined or a string
    if (typeof inputs.outputFile !== 'string' && inputs.outputFile !== undefined) {
        throw new Error(`The output file must be a string or undefined`);
    }
}

export default validateInputs;
