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

    const child = execa.command(`pnpm build`, {
      detached: true,
      encoding: 'utf8',
      cwd: SCRATH_PATH,
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
    expect(await fs.readdir(path.resolve(SCRATH_PATH, 'dist')))
      .toMatchInlineSnapshot(`
      Array [
        "index.html",
        "static",
      ]
    `);
    expect(await fs.readdir(path.resolve(SCRATH_PATH, 'dist/static')))
      .toMatchInlineSnapshot(`
      Array [
        "main.2691ff97ba2b6fa3324b.js",
        "main.2691ff97ba2b6fa3324b.js.LICENSE.txt",
        "main.2691ff97ba2b6fa3324b.js.map",
        "main.52ef703aa4fbedfccf7e.css",
      ]
    `);
  });
});
