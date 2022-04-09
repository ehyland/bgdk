import execa from 'execa';
import path from 'path';
import fs from 'fs-extra';
import ms from 'ms';
import { ResolveType, clearScratchSpace, SCRATCH_PATH } from '../test-utils';

jest.setTimeout(ms('5 minutes'));

async function cmd(
  cmdString: string,
  options?: Omit<execa.Options, 'all' | 'encoding' | 'extendEnv' | 'env'>,
) {
  console.log(`Running ${cmdString}`);

  const child = execa.command(cmdString, {
    all: true,
    encoding: 'utf8',
    extendEnv: false,
    env: {
      PATH: process.env.PATH,
      NPM_CONFIG_USERCONFIG: process.env.NPM_CONFIG_USERCONFIG,
      NODE_AUTH_TOKEN: process.env.NODE_AUTH_TOKEN,
    },
    ...options,
  });

  child.all?.pipe(process.stderr);

  return child;
}

describe('bgdk create app', () => {
  let ctx: ResolveType<typeof setup>;

  const setup = async () => {
    await clearScratchSpace();

    return {
      result: await cmd(`npm init bgdk@dev -- --storybook ${SCRATCH_PATH}`),
    };
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
    expect(packageStat.isFile()).toBe(true);
  });

  describe('yarn install', () => {
    beforeAll(async () => {
      await cmd(`yarn install`, {
        cwd: SCRATCH_PATH,
      });
    });

    it('installs successfully', async () => {
      expect((await fs.readdir(SCRATCH_PATH)).sort()).toMatchInlineSnapshot(`
        Array [
          ".babelrc",
          ".browserslistrc",
          ".gitignore",
          ".prettierrc",
          ".storybook",
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
});
