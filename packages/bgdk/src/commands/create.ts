import { log } from '../lib/log';
import chalk from 'chalk';

interface Options {
  appPath: string;
}

export async function main(options: Options) {
  log(`Command moved to create-bgdk package.`);
  log(`To bootstrap project run:

  $ ${chalk.whiteBright(`npm init bgdk`)}

  Or

  $ ${chalk.whiteBright(`yarn create bgdk`)}
`);

  process.exit(1);
}
