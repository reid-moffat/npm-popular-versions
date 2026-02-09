#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';

function run(cmd) {
    console.log(`> ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
}

try {
    run('pnpm run build');
    run('pnpm pack --out ./npm-popular-versions.tgz');

    const tarball = path.resolve('./npm-popular-versions.tgz');
    run(`pnpm add -g "${tarball}"`);

    console.log('\n✓ Successfully installed globally');
} catch (error) {
    console.error('Installation failed:', error.message);
    process.exit(1);
}
