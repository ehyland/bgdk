import path from 'path';
import fs from 'fs-extra';
import ms from 'ms';
import { cmd, compareBuildFileByType, paths } from '../test-utils';

jest.setTimeout(ms('5 minutes'));

const CTX_PATH = paths.storybook.build;

describe('bgdk build', () => {
  beforeAll(async () => {
    await cmd(`yarn build`, {
      cwd: CTX_PATH,
      detached: true,
    });
  });

  it('creates build artifacts', async () => {
    const topLevelFiles = await fs.readdir(path.resolve(CTX_PATH, 'dist'));

    const staticFiles = await fs.readdir(path.resolve(CTX_PATH, 'dist/static'));

    expect(topLevelFiles.sort()).toEqual([
      expect.stringMatching(/^index\.html$/),
      expect.stringMatching(/^static$/),
    ]);

    expect(staticFiles.sort(compareBuildFileByType)).toEqual([
      expect.stringMatching(/^main\.[a-z0-9]{20}\.css$/),
      expect.stringMatching(/^main\.[a-z0-9]{20}\.css\.map$/),
      expect.stringMatching(/^main\.[a-z0-9]{20}\.js$/),
      expect.stringMatching(/^main\.[a-z0-9]{20}\.js\.LICENSE.txt$/),
      expect.stringMatching(/^main\.[a-z0-9]{20}\.js\.map$/),
    ]);
  });
});
