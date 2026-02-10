# npm-popular-versions

[![npm](https://img.shields.io/npm/v/npm-popular-versions)](https://www.npmjs.com/package/npm-popular-versions)
[![npm](https://img.shields.io/npm/dt/npm-popular-versions)](https://www.npmjs.com/package/npm-popular-versions)
[![npm](https://img.shields.io/npm/l/npm-popular-versions)](https://www.npmjs.com/package/npm-popular-versions)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?logo=buy-me-a-coffee)](https://buymeacoffee.com/reidmoffat)

Shows the most popular versions of an NPM package

## 📦 Running

Run via CLI with your preferred package manager:

```bash
npx npm-popular-versions [package-name] <...options>

# or
pnpm dlx npm-popular-versions [package-name] <...options>

# or
yarn dlx npm-popular-versions [package-name] <...options>

# or
bunx npm-popular-versions [package-name] <...options>
```

## ⚙️ Options

You must provide a package name. Without any options this will print out a table of the 10 (max) most popular versions:

```bash
npx npm-popular-versions typescript

# Sample output:
Package: typescript
Top 10 versions (last week):
|------|---------|------------|
| #    | Version |  Downloads |
|------|---------|------------|
| 1    | 5.9.3   | 44,488,226 |
| 2    | 5.8.3   | 13,041,822 |
| 3    | 4.9.5   | 10,679,390 |
| 4    | 5.9.2   |  6,303,369 |
| 5    | 5.6.3   |  4,384,251 |
| 6    | 5.7.3   |  3,867,990 |
| 7    | 5.4.5   |  3,792,599 |
| 8    | 5.8.2   |  3,516,504 |
| 9    | 5.5.4   |  3,004,184 |
| 10   | 3.9.10  |  2,581,539 |
|------|---------|------------|
```

You can get minimalist output:

```bash
npx npm-popular-versions typescript --simple

# Sample output
Top 10 versions of typescript (last week):
5.9.3      44488226
5.8.3      13041822
4.9.5      10679390
5.9.2      6303369
5.6.3      4384251
5.7.3      3867990
5.4.5      3792599
5.8.2      3516504
5.5.4      3004184
3.9.10     2581539
```

Or as JSON:

```bash
npx npm-popular-versions typescript --json

# Sample output
{
    "package": "typescript",
    "topVersions": {
        "5.9.3": 44488226,
        "5.8.3": 13041822,
        "4.9.5": 10679390,
        "5.9.2": 6303369,
        "5.6.3": 4384251,
        "5.7.3": 3867990,
        "5.4.5": 3792599,
        "5.8.2": 3516504,
        "5.5.4": 3004184,
        "3.9.10": 2581539
    }
}
```

Change the version limit with `-l` or `--limit`:

```bash
npx npm-popular-versions typescript --limt 5

bunx npm-popular-versions typescript -l 1000

pnpm dlx npm-popular-versions typescript --limit 5000
```

Or output to a file with `-o` or `--output` (defaults to .json for `--json` and --txt otherwise):

```bash
yarn dlx npm-popular-versions firebase --json -o versions.txt # Written to versions.txt

pnpm dlx npm-popular-versions firebase --output ver # Written to ver.txt

bunx npm-popular-versions firebase -o fb-ver --simple -l 500 # Written to fb-ver.txt

npx npm-popular-versions @types/node -o t-n-o --json --limit 5 # Written to t-n-o.json
```

## 📝 Notes

Only package versions that have had at least 1 download over the last week can be fetched. A package with 7 versions
with downloads and 50 without will only return 7 results with --limit 10 (default).

A package without any downloads will receive an error response as it cannot be differentiated from a package that
doesn't exist.

Download counts on npm include all HTTP 200 responses (mirrors, bots, ci, etc), so take small values especially with a
grain of salt. More info [here](https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts-work.html)

## 📜 Changelog

To view the release notes for each version, view the changelog:

- On GitHub: [Link](https://github.com/reid-moffat/npm-popular-versions/blob/main/CHANGELOG.md)
- On npm: [package page](https://www.npmjs.com/package/npm-popular-versions?activeTab=code) -> CHANGELOG.md
- In the repository: CHANGELOG.md

---

☕ [Buy me a coffee](https://buymeacoffee.com/reidmoffat) if this package helped you!
