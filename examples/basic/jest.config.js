module.exports = {
  testEnvironment: 'node',
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
