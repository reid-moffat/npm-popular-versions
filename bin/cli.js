#!/usr/bin/env node

const packageName = process.argv[2];

if (!packageName) {
    console.error('Usage: npm-popular-versions <package-name>');
    console.error('E.g. pnpm dlx npm-popular-versions firebase');
    process.exit(1);
}

const LIMIT = 10;

try {
    const response = await fetch(
        `https://api.npmjs.org/versions/${packageName.replaceAll('/', '%2F')}/last-week`
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    const entries = Object.entries(data.downloads);
    const sorted = [];

    for (const entry of entries) {
        const downloads = entry[1];

        // Skip if items == LIMIT and this one isn't bigger than the smallest
        if (sorted.length >= LIMIT && downloads <= sorted[LIMIT - 1][1]) {
            continue;
        }

        let i = 0;
        while (i < sorted.length && sorted[i][1] > downloads) {
            i++;
        }
        sorted.splice(i, 0, entry);

        if (sorted.length > LIMIT) {
            sorted.pop();
        }
    }

    console.log(`\nTop ${LIMIT} versions of ${packageName} (last week):`);
    sorted.forEach(([version, downloads], index) => {
        console.log(`${index + 1}: ${version.padEnd(30)} ${downloads.toLocaleString()} downloads`);
    });
} catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    process.exit(1);
}
