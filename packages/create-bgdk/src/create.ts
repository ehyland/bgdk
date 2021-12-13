import path from 'path';
import fs from 'fs-extra';
import { log } from './log';

interface Options {
  appPath: string;
}

export async function main(options: Options) {
  let outputPath = path.resolve(options.appPath);
  let outputPathRelative = path.relative(process.cwd(), outputPath);
  let templatePath = path.resolve(__dirname, '../../../examples/basic');

  log(`Creating app in ${outputPathRelative}`);

  await fs.copy(templatePath, outputPath, { overwrite: true });

  log(`App created! Next steps

  $ cd ${outputPathRelative}
  $ yarn install
  `);
}
