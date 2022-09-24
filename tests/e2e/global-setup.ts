import fs from 'fs-extra';
import path from 'path';
import { cmd, paths } from './test-utils';

export default async function setup() {
  await fs.emptyDir(paths.root);
  await fs.ensureDir(path.dirname(paths.basic.createLogs));
  await fs.ensureDir(path.dirname(paths.storybook.createLogs));
  await Promise.all([
    // create basic
    cmd(`npm init bgdk@dev ${paths.basic.create}`).then(async (result) => {
      await fs.writeJSON(paths.basic.createLogs, result);
      await cmd(`yarn install`, {
        cwd: paths.basic.create,
      });
    }),

    // create storybook
    cmd(`npm init bgdk@dev -- --storybook ${paths.storybook.create}`).then(
      async (result) => {
        await fs.writeJSON(paths.storybook.createLogs, result);
        await cmd(`yarn install`, {
          cwd: paths.storybook.create,
        });
      },
    ),
  ]);

  console.log(`successfully created apps`);

  await Promise.all([
    fs.copy(paths.basic.create, paths.basic.build),
    fs.copy(paths.basic.create, paths.basic.dev),
    fs.copy(paths.storybook.create, paths.storybook.build),
    fs.copy(paths.storybook.create, paths.storybook.dev),
  ]);

  console.log(`successfully copied apps`);
}
