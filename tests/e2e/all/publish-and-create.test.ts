import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as util from './test-utils';
import fs from 'fs-extra';
import stripAnsi from 'strip-ansi';

test('publish & create', async () => {
  if (await fs.pathExists(util.APP_PATH)) {
    assert.ok(false, `Expected ${util.APP_PATH} to be empty`);
  }

  await util.setupVerdaccio();
  await util.run('npm cache clean --force');
  await util.run('scripts/publish-snapshot-release');

  await util.run('npx bgdk@dev create app', {
    cwd: util.APP_PARENT_PATH,
  });

  const { all: buildOutput } = await util.run('npm run build', {
    cwd: util.APP_PATH,
  });

  assert.match(stripAnsi(buildOutput!), '🥦  Successfully built app!');
});

test.run();
