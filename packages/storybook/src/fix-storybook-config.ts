import MiniCssExtractPlugin from 'bgdk/alias/mini-css-extract-plugin';
import { VanillaExtractPlugin } from 'bgdk/alias/vanilla-extract-webpack-plugin';
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

  const fixRuleSet = (ruleSet: RuleSetRule[]) => {
    ruleSet.forEach((rule) => {
      if (Array.isArray(rule.oneOf)) {
        fixRuleSet(rule.oneOf);
      } else {
        const previousExclude = rule.exclude || [];
        rule.exclude = [
          ...(Array.isArray(previousExclude)
            ? previousExclude
            : [previousExclude]), // Ensure we don't clobber any existing exclusions
          ...srcMatchers,
        ];
      }
    });
  };

  fixRuleSet(rules);

  // add src loader for js
  rules.unshift({
    test: /\.(js|jsx|ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: { cacheDirectory: true },
    include: srcMatchers,
  });

  // add src loader for css
  rules.unshift({
    test: /\.css$/i,
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

  // add asset loader
  rules.unshift({
    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
    type: 'asset' as any,
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
