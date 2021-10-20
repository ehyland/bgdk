import execa from 'execa';
import path from 'path';
import fs from 'fs-extra';
import ms from 'ms';
import { ResolveType, clearScratchSpace, SCRATCH_PATH } from '../test-utils';

jest.setTimeout(ms('5 minutes'));

describe('bgdk create app', () => {
  let ctx: ResolveType<typeof setup>;

  const setup = async () => {
    await clearScratchSpace();

    console.log(`Running npx bgdk@dev create ${SCRATCH_PATH}`);

    const child = execa.command(`npx bgdk@dev create ${SCRATCH_PATH}`, {
      all: true,
      encoding: 'utf8',
      extendEnv: false,
      env: {
        PATH: process.env.PATH,
        NPM_CONFIG_USERCONFIG: process.env.NPM_CONFIG_USERCONFIG,
        NODE_AUTH_TOKEN: process.env.NODE_AUTH_TOKEN,
        SCRATCH_PATH: process.env.SCRATCH_PATH,
      },
    });

    child.all?.pipe(process.stderr);

    return { result: await child };
  };

  beforeAll(async () => {
    ctx = await setup();
    console.log(`successfully created app`);
  });

  it('Logs create message', () => {
    expect(ctx.result.all).toContain('🥦  Creating app in ');
  });

  it('Creates the app in the correct dir', async () => {
    const packagePath = path.resolve(SCRATCH_PATH, 'package.json');
    const packageStat = await fs.stat(packagePath);
    console.log(await fs.readFile(packagePath, 'utf8'));
    expect(packageStat.isFile()).toBe(true);
  });
});
