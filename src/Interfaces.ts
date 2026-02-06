interface CommandInputs {
    packageName: string;
    outputJson: boolean;
    outputSimple: boolean;
    outputFile: string | undefined;
    outputCount: number;
}

interface NpmApiResponse {
    package: string;
    downloads: {
        [key: string]: number;
    };
}

type VersionDownloads = [string, number][];

export { CommandInputs, NpmApiResponse, VersionDownloads };
