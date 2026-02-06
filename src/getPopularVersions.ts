async function getPopularVersions(packageName: string, count: number) {
    const versionData: { package: string; downloads: { [key: string]: number } } =
        await getVersions(packageName);

    return filterByPopularity(versionData.downloads, count);
}

async function getVersions(packageName: string) {
    try {
        const response: Response = await fetch(
            `https://api.npmjs.org/versions/${packageName.replaceAll('/', '%2F')}/last-week`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const versionData: { package: string; downloads: { [key: string]: number } } =
            await response.json();

        return versionData;
    } catch (error: unknown) {
        const message: string = error instanceof Error ? error.message : String(error);
        console.error(`Error fetching package: ${message}`);
        process.exit(1);
    }
}

function filterByPopularity(versions: { [key: string]: number }, count: number) {
    const entries: [string, number][] = Object.entries(versions);
    const sorted: [string, number][] = [];

    for (const entry of entries) {
        const downloads: number = entry[1];

        // Skip if items == count and this one isn't bigger than the smallest
        if (sorted.length >= count && downloads <= sorted[count - 1][1]) {
            continue;
        }

        let i: number = 0;
        while (i < sorted.length && sorted[i][1] > downloads) {
            i++;
        }
        sorted.splice(i, 0, entry as [string, number]);

        if (sorted.length > count) {
            sorted.pop();
        }
    }

    return sorted;
}

export default getPopularVersions;
