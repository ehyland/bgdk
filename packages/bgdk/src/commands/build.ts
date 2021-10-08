import webpack, { Stats } from 'webpack';
import { createWebpackConfig } from '../config/createWebpackConfig';
import * as paths from '../config/paths';
import { log } from '../lib/log';
import fs from 'fs-extra';

export async function main() {
  log(`Creating production build ...`);

  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';

  await fs.rm(paths.dist, { force: true, recursive: true });

  const webpackConfig = createWebpackConfig({ mode: 'production' });
  const compiler = webpack(webpackConfig);

  const stats = await new Promise<Stats | undefined>((resolve) => {
    compiler.run((err, stats) => {
      if (err) throw err;
      resolve(stats);
    });
  });

  console.log(
    stats?.toString({
      preset: 'errors-warnings',
      colors: true,
      entrypoints: true,
      assets: true,
      performance: true,
      timings: true,
    }),
  );

  log(`Successfully built app!`);
}
