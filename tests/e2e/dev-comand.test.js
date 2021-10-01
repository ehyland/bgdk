const { test, shutdownHook, runAwaitingLine } = require('./test-helpers');
const { default: fetch } = require('node-fetch');

test(async () => {
  const child = await runAwaitingLine({
    exec: 'yarn',
    args: ['bgdk', 'dev'],
    search: 'webpack compiled successfully in',
  });

  const body = await fetch('http://localhost:3000').then((res) => res.text());

  if (!body.includes('<script defer src="main.js">')) {
    console.log(body);
    throw new Error('Script not found in response');
  }

  child.exit();
});
