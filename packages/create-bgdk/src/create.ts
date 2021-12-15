import path from 'path';
import fs from 'fs-extra';
import { log } from './log';
import chalk from 'chalk';

interface Options {
  appPath: string;
}

export async function main(options: Options) {
  let outputPath = path.resolve(options.appPath);
  let outputPathRelative = path.relative(process.cwd(), outputPath);
  let templatePath = path.resolve(__dirname, '../../examples/basic');

  log(`Creating app in ${outputPathRelative}`);

  if (await fs.pathExists(outputPath)) {
    const { isDirectory } = await fs.stat(outputPath);

    if (!isDirectory) {
      log(`File exists at output path ${outputPathRelative}`);
      process.exit(1);
    }

    const files = await fs.readdir(outputPath);

    if (files.length !== 0) {
      log(`${outputPathRelative} is not empty`);
      process.exit(1);
    }
  }

  await fs.copy(templatePath, outputPath, { overwrite: true });

  // Fix .gitignore. See [issue](https://github.com/npm/npm/issues/1862).
  try {
    await fs.move(
      path.resolve(outputPath, '.npmignore'),
      path.resolve(outputPath, '.gitignore'),
      { overwrite: true },
    );
  } catch (error) {
    // assuming this is local dev
  }

  log(`App created! Next steps
  $ ${chalk.whiteBright(`cd ${outputPathRelative}`)}
  $ ${chalk.whiteBright(`yarn install`)}
  `);
}
