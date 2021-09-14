import { compact } from 'lodash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import type { Configuration } from 'webpack-dev-server';
import * as paths from './paths';

export function createWebpackDevServerConfig(): Configuration {
  return {
    open: false,
    contentBase: paths.dist,
    host: 'localhost',
    hot: true,
    injectClient: true,
    injectHot: true,
    stats: {
      preset: 'errors-warnings',
      colors: true,
      entrypoints: true,
      assets: true,
      performance: true,
      timings: true,
    },
  };
}
