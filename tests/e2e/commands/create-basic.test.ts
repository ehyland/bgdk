import path from 'path';
import fs from 'fs-extra';
import ms from 'ms';
import { cmd, ResolveType, paths } from '../test-utils';

jest.setTimeout(ms('5 minutes'));

let createResult: ResolveType<typeof cmd>;

describe('bgdk create app', () => {
  const CTX_PATH = paths.basic.create;

  beforeAll(async () => {
    createResult = await fs.readJSON(paths.basic.createLogs);
  });

  it('Logs create message', () => {
    expect(createResult.all).toContain('🥦  Creating app in ');
  });

  it('Creates the app in the correct dir', async () => {
    const packagePath = path.resolve(CTX_PATH, 'package.json');
    const packageStat = await fs.stat(packagePath);
    expect(packageStat.isFile()).toBe(true);
  });

  it('installs successfully', async () => {
    expect((await fs.readdir(CTX_PATH)).sort()).toMatchInlineSnapshot(`
      [
        ".babelrc",
        ".browserslistrc",
        ".gitignore",
        ".prettierrc",
        "CHANGELOG.md",
        "README.md",
        "jest.config.js",
        "node_modules",
        "package.json",
        "src",
        "tsconfig.json",
        "yarn.lock",
      ]
    `);
  });
});
