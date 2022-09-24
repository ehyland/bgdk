import type { Configuration } from 'webpack-dev-server';

export function createWebpackDevServerConfig(): Configuration {
  return {
    open: false,
    host: '0.0.0.0',
    port: process.env.BGDK_DEV_PORT ?? 3000,
    hot: true,
    historyApiFallback: true,
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
