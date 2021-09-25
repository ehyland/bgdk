import type { Configuration } from 'webpack-dev-server';
// import * as paths from './paths';

export function createWebpackDevServerConfig(): Configuration {
  return {
    open: false,
    host: 'localhost',
    port: 3000,
    hot: true,
    devMiddleware: {
      stats: {
        preset: 'errors-warnings',
        colors: true,
        entrypoints: true,
        assets: true,
        performance: true,
        timings: true,
      },
    },
  };
}
