import sade from 'sade';

const prog = sade('bgdk');

// exit on unhandled promise
process.on('unhandledRejection', (err) => {
  throw err;
});

// exit on signals
['SIGINT', 'SIGTERM'].forEach(function (sig) {
  process.on(sig, function () {
    process.exit();
  });
});

const pkg = require('../../package.json');

prog.version(pkg.version);

prog
  .command('dev')
  .describe('Start dev server')
  .action(async () => {
    await require('bgdk/commands/dev').main();
  });

prog
  .command('build')
  .describe('Create a production build')
  .action(async () => {
    await require('bgdk/commands/build').main();
  });

prog
  .command('create <app-path>')
  .describe('Create a new project with bgdk')
  .action(async (appPath: string) => {
    await require('bgdk/commands/create').main({ appPath });
  });

prog
  .command('component <component-path>')
  .describe('Create a new component')
  .action(async (componentPath: string) => {
    await require('bgdk/commands/component').main({ componentPath });
  });

prog.parse(process.argv);
