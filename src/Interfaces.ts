/**
 * CLI input options from commander
 */
interface CommandInputs {
    packageName: string;
    outputLimit: number;
    outputJson: boolean;
    outputSimple: boolean;
    outputFile: string | undefined;
}

/**
 * The response format from NPM's API
 */
interface NpmApiResponse {
    package: string;
    downloads: {
        [key: string]: number;
    };
}

/**
 * List of package versions and their downloads
 */
type VersionDownloads = [string, number][];

export { CommandInputs, NpmApiResponse, VersionDownloads };
