import path from 'path';
import execa from 'execa';

export type ResolveType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;

if (!process.env.TEST_WORKSPACE) {
  throw new Error('TEST_WORKSPACE must be set');
}

if (!process.env.IS_RUNNING_IN_TEST_CONTAINER) {
  throw new Error(
    'This e2e test suit is designed to be run with `scripts/test-e2e`',
  );
}

const TEST_WORKSPACE = path.resolve(process.env.TEST_WORKSPACE!);

export const paths = {
  root: TEST_WORKSPACE,
  basic: {
    createLogs: path.resolve(TEST_WORKSPACE, 'basic/create-log.json'),
    create: path.resolve(TEST_WORKSPACE, 'basic/create'),
    build: path.resolve(TEST_WORKSPACE, 'basic/build'),
    dev: path.resolve(TEST_WORKSPACE, 'basic/dev'),
  },
  storybook: {
    createLogs: path.resolve(TEST_WORKSPACE, 'storybook/create-log.json'),
    create: path.resolve(TEST_WORKSPACE, 'storybook/create'),
    build: path.resolve(TEST_WORKSPACE, 'storybook/build'),
    dev: path.resolve(TEST_WORKSPACE, 'storybook/dev'),
  },
};

export function compareBuildFileByType(a: string, b: string) {
  return a
    .replace(/^main\.[a-z0-9]{20}\./, '')
    .localeCompare(b.replace(/^main\.[a-z0-9]{20}\./, ''));
}

export function cmd(
  cmdString: string,
  options?: Omit<execa.Options, 'all' | 'encoding' | 'extendEnv'>,
) {
  const child = execa.command(cmdString, {
    all: true,
    encoding: 'utf8',
    extendEnv: false,
    ...options,
    env: {
      PATH: process.env.PATH,
      ...options?.env,
    },
  });

  child.all?.pipe(process.stderr);

  return child;
}
