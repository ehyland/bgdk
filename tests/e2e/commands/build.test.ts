import execa from 'execa';
import path from 'path';
import fs from 'fs-extra';
import ms from 'ms';
import { ResolveType, scratchAppExists, SCRATH_PATH } from '../test-utils';

jest.setTimeout(ms('5 minutes'));

describe('bgdk build', () => {
  let ctx: ResolveType<typeof setup>;

  const setup = async () => {
    if (!(await scratchAppExists())) {
      throw new Error('Scratch app not found');
    }

    const child = execa.command(`yarn build`, {
      all: true,
      detached: true,
      encoding: 'utf8',
      cwd: SCRATH_PATH,
    });

    await child;

    return { child };
  };

  beforeAll(async () => {
    ctx = await setup();
  });

  it('creates build artifacts', async () => {
    expect(await fs.readdir(path.resolve(SCRATH_PATH, 'dist')))
      .toMatchInlineSnapshot(`
      Array [
        "index.html",
        "main.css",
        "main.js",
        "main.js.LICENSE.txt",
        "main.js.map",
      ]
    `);
  });
});
