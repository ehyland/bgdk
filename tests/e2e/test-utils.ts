import path from 'path';
import fs from 'fs-extra';

export type ResolveType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;

export const SCRATCH_PATH = process.env.SCRATCH_PATH!;

if (!SCRATCH_PATH) {
  throw new Error('Missing environment variable SCRATCH_PATH');
}

export async function clearScratchSpace() {
  await fs.emptyDir(SCRATCH_PATH);
}

export async function scratchAppExists() {
  const stat = await fs.stat(path.resolve(SCRATCH_PATH, 'package.json'));
  return stat.isFile();
}
