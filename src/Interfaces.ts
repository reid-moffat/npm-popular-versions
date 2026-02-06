interface CommandInputs {
    packageName: string;
    outputJson: boolean;
    outputFile: string | undefined;
    outputCount: number;
}

interface NpmApiResponse {
    package: string;
    downloads: {
        [key: string]: number;
    };
}

export { CommandInputs, NpmApiResponse };
