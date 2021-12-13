import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import type {
  Configuration,
  RuleSetRule,
  WebpackPluginInstance,
} from 'webpack';
import path from 'path';

const root = path.resolve(process.cwd());
const src = path.resolve(root, 'src');

const srcMatchers = [src, /\.css\.ts$/, /\.vanilla\.css$/];

export function fixStorybookConfig(config: Configuration) {
  const rules = config.module?.rules as RuleSetRule[];

  // exclude app code from default loaders
  rules.forEach((rule: RuleSetRule) => {
    const previousExclude = rule.exclude || [];

    rule.exclude = [
      ...(Array.isArray(previousExclude) ? previousExclude : [previousExclude]), // Ensure we don't clobber any existing exclusions
      ...srcMatchers,
    ];
  });

  // add src loader for js
  rules.unshift({
    test: /\.(js|jsx|ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: { cacheDirectory: true },
    include: srcMatchers,
  });

  // add src loader for css
  rules.unshift({
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
    include: srcMatchers,
  });

  // add vanilla plugin
  config.plugins?.push(
    new VanillaExtractPlugin() as unknown as WebpackPluginInstance,
    new MiniCssExtractPlugin() as unknown as WebpackPluginInstance,
  );

  // base url
  config.resolve!.modules = ['node_modules', src];

  return config;
}
