import { compact } from 'lodash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import type { Configuration, WebpackPluginInstance } from 'webpack';
import * as paths from './paths';

interface Options {
  mode: 'development' | 'production';
}

export function createWebpackConfig({
  mode = 'development',
}: Partial<Options>): Configuration {
  const dev = mode === 'development';

  return {
    mode: mode,
    devtool: dev ? 'eval-source-map' : 'source-map',
    entry: paths.entryRelative,
    output: {
      path: paths.dist,
      filename: dev ? '[name].js' : 'static/[name].[contenthash].js',
      chunkFilename: dev
        ? '[name].chunk.js'
        : 'static/[name].chunk.[contenthash].js',
    },
    plugins: compact([
      new VanillaExtractPlugin(),
      new MiniCssExtractPlugin({
        filename: dev ? '[name].css' : 'static/[name].[contenthash].css',
        chunkFilename: dev
          ? '[name].chunk.css'
          : 'static/[name].chunk.[contenthash].css',
      }),
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
      dev && new ReactRefreshWebpackPlugin(),
    ]) as WebpackPluginInstance[],
    resolve: {
      modules: ['node_modules', paths.src],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            plugins: compact([dev && require.resolve('react-refresh/babel')]),
          },
        },
        {
          test: /\.vanilla\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                url: false, // Required as image imports should be handled via JS/TS import statements
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
          type: 'asset',
        },
      ],
    },
  };
}
