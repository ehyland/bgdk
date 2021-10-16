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

    await execa.command(`npm cache clean --force`, {
      stdio: 'inherit',
    });

    console.log(process.env);

    console.log(`Running npx bgdk@dev create ${SCRATH_PATH}`);

    const child = execa.command(`npx bgdk@dev create ${SCRATH_PATH}`, {
      all: true,
      encoding: 'utf8',
    });

    child.all?.pipe(process.stderr);

    return { result: await child };
  };

  beforeAll(async () => {
    ctx = await setup();
    console.log(`successfullt created app`);
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
