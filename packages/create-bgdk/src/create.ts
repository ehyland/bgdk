import path from 'path';
import fs from 'fs-extra';
import { log } from './log';
import chalk from 'chalk';
import globby from 'globby';

interface Options {
  appPath: string;
  withStorybook: boolean;
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

  if (!options.withStorybook) {
    await removeStorybook({ outputPath });
  }

  log(`App created! Next steps
  $ ${chalk.whiteBright(`cd ${outputPathRelative}`)}
  $ ${chalk.whiteBright(`yarn install`)}
  `);
}

async function removeStorybook(opts: { outputPath: string }) {
  // remove storybook packages
  const pkgPath = path.resolve(opts.outputPath, 'package.json');
  const pkg: {
    scripts: Record<string, string>;
    devDependencies: Record<string, string>;
    dependencies: Record<string, string>;
  } = await fs.readJson(pkgPath);

  deleteStorybookFields(pkg.scripts);
  deleteStorybookFields(pkg.dependencies);
  deleteStorybookFields(pkg.devDependencies);

  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });

  // remove storybook config
  const storybookConfigPath = path.resolve(opts.outputPath, '.storybook');
  await fs.rm(storybookConfigPath, { force: true, recursive: true });

  // remove stories
  const storyFiles = await globby(`src/**/*.stories.tsx`, {
    cwd: opts.outputPath,
    absolute: true,
  });

  await Promise.all(storyFiles.map((file) => fs.rm(file)));
}

function deleteStorybookFields(object: Record<string, string>) {
  Object.keys(object).forEach((key) => {
    if (key.match(/storybook/)) {
      delete object[key];
    }
  });
}
