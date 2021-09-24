import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
import type { Configuration } from "webpack";
import * as paths from "./paths";

const customLoaderMatchers = [paths.src, /\.css\.ts$/, /\.vanilla\.css$/];

export function fixStorybookConfig(config: Configuration) {
  // exclude app code from default loaders
  config?.module?.rules?.forEach((rule) => {
    // @ts-expect-error
    const previousExclude = rule.exclude || [];

    // @ts-expect-error
    rule.exclude = [
      ...(Array.isArray(previousExclude) ? previousExclude : [previousExclude]), // Ensure we don't clobber any existing exclusions
      ...customLoaderMatchers,
    ];
  });

  // add src loader for js
  config?.module?.rules?.unshift({
    test: /\.(js|jsx|ts|tsx)$/,
    loader: "babel-loader",
    options: { cacheDirectory: true },
    include: customLoaderMatchers,
  });

  // add src loader for css
  config?.module?.rules?.unshift({
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
    include: customLoaderMatchers,
  });

  // add vanilla plugin
  config?.plugins?.push(new VanillaExtractPlugin(), new MiniCssExtractPlugin());

  // base url
  config!.resolve!.modules = ["node_modules", paths.src];

  return config;
}
