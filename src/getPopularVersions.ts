import { NpmApiResponse, VersionDownloads } from './Interfaces.ts';

async function getPopularVersions(packageName: string, limit: number) {
    const versionData: NpmApiResponse = await getVersions(packageName);
    return filterByPopularity(versionData.downloads, limit);
}

async function getVersions(packageName: string) {
    const response: Response = await fetch(
        `https://api.npmjs.org/versions/${packageName.replaceAll('/', '%2F')}/last-week`
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const versionData: NpmApiResponse = await response.json();

    const isEmpty: boolean = Object.keys(versionData.downloads).length === 0;
    if (isEmpty) {
        throw new Error(`Package ${packageName} does not exist or has no downloads`);
    }

    return versionData;
}

function filterByPopularity(versions: { [key: string]: number }, limit: number) {
    const entries: VersionDownloads = Object.entries(versions);
    const sorted: VersionDownloads = [];

    for (const entry of entries) {
        const downloads: number = entry[1];

        // Skip if items == limit and this one isn't bigger than the smallest
        if (sorted.length >= limit && downloads <= sorted[limit - 1][1]) {
            continue;
        }

        let i: number = 0;
        while (i < sorted.length && sorted[i][1] > downloads) {
            i++;
        }
        sorted.splice(i, 0, entry as [string, number]);

        if (sorted.length > limit) {
            sorted.pop();
        }
    }

    return sorted;
}

export default getPopularVersions;
