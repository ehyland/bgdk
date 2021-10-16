import execa from 'execa';
import path from 'path';
import fs from 'fs-extra';
import ms from 'ms';
import { ResolveType, clearScratchSpace, SCRATH_PATH } from '../test-utils';

jest.setTimeout(ms('5 minutes'));

describe('bgdk create app', () => {
  let ctx: ResolveType<typeof setup>;

  const setup = async () => {
    await clearScratchSpace();

    await execa.command(`cat /home/runner/work/_temp/.npmrc`, {
      stdio: 'inherit',
      cwd: SCRATH_PATH,
    });

    await execa.command(`npm config get registry`, {
      stdio: 'inherit',
      cwd: SCRATH_PATH,
    });

    await execa.command(`npm config get registry --global`, {
      stdio: 'inherit',
      cwd: SCRATH_PATH,
    });

    const child = execa.command(`npx bgdk@dev create app`, {
      all: true,
      encoding: 'utf8',
      cwd: SCRATH_PATH,
    });

    return { result: await child };
  };

  beforeAll(async () => {
    ctx = await setup();
  });

  it('Logs create messge', () => {
    expect(ctx.result.all).toContain('🥦  Creating app in ');
  });

  it('Creates the app in the correct dir', async () => {
    const packagePath = path.resolve(SCRATH_PATH, 'package.json');
    const packageStat = await fs.stat(packagePath);
    expect(packageStat.isFile()).toBe(true);
  });
});
