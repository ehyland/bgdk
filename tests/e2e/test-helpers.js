const { spawn } = require('child_process');
const path = require('path');
const stripAnsi = require('strip-ansi');
const ms = require('ms');
// const testAppPath = path.resolve('test-app');
const TEST_APP_PATH = path.resolve('examples/basic');

let shutdownHooks = [];
const shutdown = () => {
  const promise = Promise.all(shutdownHooks.map((hook) => hook()));
  shutdownHooks = [];
  return promise;
};

const shutdownHook = (fn) => shutdownHooks.push(fn);

const runAwaitingLine = ({ exec, args, search }) => {
  return new Promise((resolve) => {
    const child = spawn(exec, args, {
      cwd: TEST_APP_PATH,
      detached: true,
    });

    const onData = (data) => {
      if (stripAnsi(data.toString()).includes(search)) {
        child.stderr.off('data', onData);
        child.stdout.off('data', onData);
        resolve({ exit });
      }
    };

    const exit = () =>
      new Promise((done) => {
        if (child.exitCode !== null) {
          done();
          return;
        }

        process.kill(-child.pid);
        child.once('exit', done);
      });

    shutdownHook(exit);

    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);

    child.stderr.on('data', onData);
    child.stdout.on('data', onData);
  });
};

const test = (testFn) => {
  const timeoutRef = setTimeout(() => {
    throw new Error('Timeout');
  }, ms('5 minutes'));

  testFn()
    .then(
      () => {
        console.log(`Success`);
        return 0;
      },
      (error) => {
        console.error(error);
        console.log(`Failed`);
        return 1;
      }
    )
    .then(async (status) => {
      clearTimeout(timeoutRef);
      await shutdown();
      process.exit(status);
    });
};

module.exports = {
  shutdownHook,
  runAwaitingLine,
  test,
};

['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, async () => {
    await shutdown();
    process.exit(1);
  });
});

process.on('unhandledRejection', async (err) => {
  console.error(err);
  await shutdown();
  process.exit(1);
});

process.on('exit', async (err) => {
  await shutdown();
});
