import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as util from './test-utils';
import fetch from 'node-fetch';

test('dev', async () => {
  await util.run('yarn i', { cwd: util.APP_PATH });
  await util.run('ls -la node_modules/bin', { cwd: util.APP_PATH });
  const devProcess = util.run('yarn dev', { cwd: util.APP_PATH });

  await util.messageFromChild(devProcess, 'webpack compiled successfully in');
  const body = await fetch('http://localhost:3000').then((res) => res.text());
  console.log(body);
  assert.match(body, '<script defer src="static/main.js">');
});

test.run();
