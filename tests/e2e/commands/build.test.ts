import execa from 'execa';
import path from 'path';
import fs from 'fs-extra';
import ms from 'ms';
import {
  compareBuildFileByType,
  ResolveType,
  scratchAppExists,
  SCRATCH_PATH,
} from '../test-utils';

jest.setTimeout(ms('5 minutes'));

describe('bgdk build', () => {
  let ctx: ResolveType<typeof setup>;

  const setup = async () => {
    if (!(await scratchAppExists())) {
      throw new Error('Scratch app not found');
    }

    const child = execa.command(`yarn build`, {
      detached: true,
      encoding: 'utf8',
      cwd: SCRATCH_PATH,
    });

    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);

    await child;

    return { child };
  };

  beforeAll(async () => {
    ctx = await setup();
  });

  it('creates build artifacts', async () => {
    const topLevelFiles = await fs.readdir(path.resolve(SCRATCH_PATH, 'dist'));

    const staticFiles = await fs.readdir(
      path.resolve(SCRATCH_PATH, 'dist/static'),
    );

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
