import path from 'path';
import fs from 'fs-extra';

export type ResolveType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;

export const SCRATH_PATH = process.env.SCRATH_PATH!;

if (!SCRATH_PATH) {
  throw new Error('Missing environment variable SCRATH_PATH');
}

export async function clearScratchSpace() {
  await fs.emptyDir(SCRATH_PATH);
}

export async function scratchAppExists() {
  const stat = await fs.stat(path.resolve(SCRATH_PATH, 'package.json'));
  return stat.isFile();
}