import { log } from '../lib/log';
import execa from 'execa';

export async function main() {
  log(`Serving app from ./dist ...`);

  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';

  await execa.command(`serve ./dist -p 3000 --single --no-clipboard`, {
    stdio: 'inherit',
  });
}
