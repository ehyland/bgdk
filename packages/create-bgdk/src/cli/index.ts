import sade from 'sade';
import { main } from '../create';

const prog = sade('create-bgdk <app-path>', true);

prog.option('--storybook', 'Include storybook', false);

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
  .describe('Create a new project with bgdk')
  .action(async (appPath: string, { storybook }: { storybook: boolean }) => {
    await main({ appPath, withStorybook: storybook });
  });

prog.parse(process.argv);
