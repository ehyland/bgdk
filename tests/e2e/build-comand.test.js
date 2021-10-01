const { test, runAwaitingLine } = require('./test-helpers');

test(async () => {
  const child = await runAwaitingLine({
    exec: 'yarn',
    args: ['bgdk', 'build'],
    search: '🥦  Successfully built app!',
  });

  child.exit();
});
