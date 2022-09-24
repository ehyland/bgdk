import fetch from 'node-fetch';
import ms from 'ms';
import stripAnsi from 'strip-ansi';
import { cmd, paths, ResolveType } from '../test-utils';

jest.setTimeout(ms('5 minutes'));

describe('bgdk dev', () => {
  const CTX_PATH = paths.storybook.dev;
  const DEV_PORT = '3002';

  let ctx: ResolveType<typeof setup>;

  const setup = async () => {
    const child = cmd(`yarn dev`, {
      detached: true,
      cwd: CTX_PATH,
      env: {
        BGDK_DEV_PORT: DEV_PORT,
      },
    });

    child.all?.pipe(process.stderr);

    await new Promise((resolve) => {
      child.all?.on('data', (data) => {
        if (
          stripAnsi(data.toString()).includes(
            'webpack compiled successfully in',
          )
        ) {
          resolve(undefined);
        }
      });
    });

    return { child };
  };

  beforeAll(async () => {
    ctx = await setup();
  });

  afterAll(async () => {
    if (ctx.child.pid) {
      process.kill(-ctx.child.pid);
    }
  });

  it('serves the built app', async () => {
    const body = await fetch(`http://localhost:${DEV_PORT}`).then((res) =>
      res.text(),
    );

    if (!body.includes('<script defer src="/main.js">')) {
      console.log(body);
      throw new Error('Script not found in response');
    }
  });
});
