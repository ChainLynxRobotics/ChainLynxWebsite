import { exec } from 'node:child_process';
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
async function pathExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}
let packageManager = 'npm'; // Default to NPM
await Promise.all([
  pathExists(resolve('.', 'yarn.lock')),
  pathExists(resolve('.', 'pnpm-lock.yaml')),
  pathExists(resolve('.', 'bun.lockb')),
]).then(([isYarn, isPnpm, isBun]) => {
  if (isYarn) {
    packageManager = 'yarn';
  } else if (isPnpm) {
    packageManager = 'pnpm';
  } else if (isBun) {
    packageManager = 'bun';
  }
});
if (process.platform === 'win32') {
  exec(`${packageManager} run postInstall:win`);
} else {
  exec(`${packageManager} run postInstall:nix`);
}
