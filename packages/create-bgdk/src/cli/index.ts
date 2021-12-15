import sade from 'sade';
import { main } from '../create';

const prog = sade('create-bgdk <app-path>', true);

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
  .action(async (appPath: string) => {
    await main({ appPath });
  });

prog.parse(process.argv);
