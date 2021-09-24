import { compact } from "lodash";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import type { Configuration } from "webpack";
import * as paths from "./paths";

interface Options {
  mode: "development" | "production";
}

export function createWebpackConfig({
  mode = "development",
}: Partial<Options>): Configuration {
  const dev = mode === "development";

  return {
    mode: mode,
    devtool: dev ? "eval-source-map" : "source-map",
    entry: paths.entryRelative,
    output: {
      path: paths.dist,
    },
    plugins: compact([
      new VanillaExtractPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({ template: "src/index.html" }),
      dev && new ReactRefreshWebpackPlugin(),
    ]),
    resolve: {
      modules: ["node_modules", paths.src],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: compact([dev && require.resolve("react-refresh/babel")]),
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
          type: "asset",
        },
      ],
    },
  };
}
