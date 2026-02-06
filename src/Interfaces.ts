interface CommandInputs {
    packageName: string;
    outputCount: number;
    outputJson: boolean;
    outputSimple: boolean;
    outputFile: string | undefined;
}

interface NpmApiResponse {
    package: string;
    downloads: {
        [key: string]: number;
    };
}

type VersionDownloads = [string, number][];

export { CommandInputs, NpmApiResponse, VersionDownloads };
