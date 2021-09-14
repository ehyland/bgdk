import webpack, { HotModuleReplacementPlugin } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { createWebpackConfig } from '../config/createWebpackConfig';
import { createWebpackDevServerConfig } from '../config/createWebpackDevServerConfig';
import { log } from '../lib/log';

export async function main() {
  log(`Starting app in dev mode...`);

  process.env.BABEL_ENV = 'development';
  process.env.NODE_ENV = 'development';

  const webpackConfig = createWebpackConfig({ mode: 'development' });

  const devServerConfig = createWebpackDevServerConfig();

  webpackConfig.plugins!.unshift(new HotModuleReplacementPlugin());

  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(compiler, devServerConfig);

  devServer.listen(3000, () => {
    log(`bgdk http://localhost:3000`);
  });
}
