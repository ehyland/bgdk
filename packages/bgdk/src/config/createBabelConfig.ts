import type { ConfigAPI } from '@babel/core';

export function createBabelConfig(api: ConfigAPI) {
  return {
    plugins: [
      require.resolve('@babel/plugin-transform-runtime'),
      require.resolve('@vanilla-extract/babel-plugin'),
    ],
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          useBuiltIns: 'entry',
          corejs: 3,
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        require.resolve('@babel/preset-react'),
        {
          runtime: 'automatic',
          development: api.env('development'),
        },
      ],
      [require.resolve('@babel/preset-typescript')],
    ],
  };
}
