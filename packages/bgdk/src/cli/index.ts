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
    const module = await import('../commands/dev');
    await module.main();
  });

prog
  .command('build')
  .describe('Create a production build')
  .action(async () => {
    const module = await import('../commands/build');
    await module.main();
  });

prog
  .command('serve')
  .describe('Serve app from ./dist')
  .action(async () => {
    const module = await import('../commands/serve');
    await module.main();
  });

prog
  .command('create <app-path>')
  .describe('Create a new project with bgdk')
  .action(async (appPath: string) => {
    const module = await import('../commands/create');
    await module.main({ appPath });
  });

prog
  .command('component <component-path>')
  .describe('Create a new component')
  .action(async (componentPath: string) => {
    const module = await import('../commands/component');
    await module.main({
      componentPath,
    });
  });

prog.parse(process.argv);
