module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
