import execa from 'execa';
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs-extra';
import ms from 'ms';
import stripAnsi from 'strip-ansi';
import { ResolveType, scratchAppExists, SCRATH_PATH } from '../test-utils';

jest.setTimeout(ms('5 minutes'));

describe('bgdk dev', () => {
  let ctx: ResolveType<typeof setup>;

  const setup = async () => {
    if (!(await scratchAppExists())) {
      throw new Error('Scratch app not found');
    }

    const child = execa.command(`yarn dev`, {
      all: true,
      detached: true,
      encoding: 'utf8',
      cwd: SCRATH_PATH,
    });

    await new Promise((resolve) => {
      child.all?.on('data', (data) => {
        if (
          stripAnsi(data.toString()).includes(
            'webpack compiled successfully in'
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
    const body = await fetch('http://localhost:3000').then((res) => res.text());

    if (!body.includes('<script defer src="main.js">')) {
      console.log(body);
      throw new Error('Script not found in response');
    }
  });
});
