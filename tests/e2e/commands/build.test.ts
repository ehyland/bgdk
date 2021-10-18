import execa from 'execa';
import path from 'path';
import fs from 'fs-extra';
import ms from 'ms';
import { ResolveType, scratchAppExists, SCRATCH_PATH } from '../test-utils';

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
    expect(await fs.readdir(path.resolve(SCRATCH_PATH, 'dist')))
      .toMatchInlineSnapshot(`
      Array [
        "index.html",
        "static",
      ]
    `);
    expect(await fs.readdir(path.resolve(SCRATCH_PATH, 'dist/static')))
      .toMatchInlineSnapshot(`
      Array [
        "main.2691ff97ba2b6fa3324b.js",
        "main.2691ff97ba2b6fa3324b.js.LICENSE.txt",
        "main.2691ff97ba2b6fa3324b.js.map",
        "main.d698e7d311a718042f53.css",
        "main.d698e7d311a718042f53.css.map",
      ]
    `);
  });
});
