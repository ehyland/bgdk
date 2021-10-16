import { test } from 'uvu';
import execa from 'execa';
import path from 'path';

export const APP_PATH = process.env.APP_PATH
  ? path.resolve(process.env.APP_PATH)
  : path.resolve(execa.commandSync(`mktemp -d`).stdout, 'app');

export const APP_PARENT_PATH = path.dirname(APP_PATH);

export const REPO_DIR = process.cwd();

export const VERDACCIO_CONFIG_PATH = path.resolve(
  '.github/actions/setup-verdaccio/verdaccio-config.yaml',
);

const shutdownHooks: Function[] = [];

test.after(async () => {
  await Promise.all(
    shutdownHooks.map(async (hook) => {
      try {
        await hook();
      } catch (error) {
        console.log(`Error in shutdown hook`);
        console.error(error);
      }
    }),
  );
});

export function run(
  cmd: string,
  options: execa.Options & { log?: boolean } = {},
) {
  console.log(`$ ${cmd}`);
  let isRunning = true;

  const childProcess = execa.command(cmd, {
    ...options,
    all: true,
    detached: true,
  });

  childProcess.once('close', () => {
    isRunning = false;
  });

  shutdownHooks.push(() => {
    if (isRunning && childProcess.pid) {
      console.log(`killing ${cmd}`);
      process.kill(-childProcess.pid!);
    }
  });

  if (options.log !== false) childProcess.all?.pipe(process.stderr);

  return childProcess;
}

export async function setupVerdaccio() {
  const verdaccio = run(`verdaccio --config ${VERDACCIO_CONFIG_PATH}`, {
    log: false,
  });

  await messageFromChild(verdaccio, 'http address');

  await run(`npm set registry http://localhost:4873`, {
    cwd: process.env.HOME!,
  });

  await run(`npm config set unsafe-perm true`, {
    cwd: process.env.HOME!,
  });

  // setup auth
  await run(
    `npm-auth-to-token -u test -p test -e test@test.com -r http://localhost:4873`,
    { cwd: '/' },
  );

  await run(
    `npm-auth-to-token -u test -p test -e test@test.com -r http://localhost:4873`,
    { cwd: REPO_DIR },
  );
}

export async function messageFromChild(
  child: execa.ExecaChildProcess<string>,
  message: string,
) {
  await new Promise((r) => {
    child.all?.on('data', (data: string) => {
      if (data.includes(message)) r(undefined);
    });
  });
}
