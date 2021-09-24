const { fixStorybookConfig } = require('@bgdk/storybook');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  webpackFinal: fixStorybookConfig,
};
