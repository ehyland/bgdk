import path from 'path';
import fs from 'fs-extra';
import execa from 'execa';
import { log } from '../lib/log';

interface Options {
  appPath: string;
}

export async function main(options: Options) {
  let outputPath = path.resolve(options.appPath);
  let outputPathRelative = path.relative(process.cwd(), outputPath);
  let templatePath = path.resolve(__dirname, '../../../examples/basic');

  log(`Creating app in ${outputPathRelative}`);

  await fs.copy(templatePath, outputPath, { overwrite: true });

  // Fix .gitignore. See [issue](https://github.com/npm/npm/issues/1862).
  try {
    await fs.move(
      path.resolve(outputPath, '.npmignore'),
      path.resolve(outputPath, '.gitignore'),
      { overwrite: true },
    );
  } catch (error) {
    log(`Failed creating gitignore, assuming this is local dev`);
  }

  log(`Installed deps`);

  await execa.command('npm i', {
    stdio: 'inherit',
    cwd: outputPath,
    env: {
      ...process.env,
      // Dev dependancies are skipped when NODE_ENV === 'production'
      NODE_ENV: undefined,

      // debug: is it pnpm?
      NODE_PATH: undefined,
    },
  });
}
