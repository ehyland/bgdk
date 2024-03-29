# Baked Good Development Kit

Or, create react app for vanilla-extract apps.

## Project Archived

I started this project when setting up vanilla-extract was not a simple task.

Since then the vanilla extract team have built many great framework and bundler integrations.

I'd recommend using one of them instead of bgdk.

## Features

- Pre-configures webpack, babel, jest & storybook for vanilla-extract
- Dev server
- Component generator
- Easily extended through `.babelrc`, `jest.config.js`, `.browserslistrc` & `bgdk.config.js` (coming soon)

## Create a new app

```bash
# with npm
npm init bgdk ./my-new-app

# with yarn
yarn create bgdk ./my-new-app
```

## Start the app in dev mode

```bash
bgdk dev
```

## Create a build for production

```bash
bgdk build
```

## Serve built app (for local testing only)

```bash
bgdk serve
```

## Generate a component

```bash
bgdk component src/component/ComponentName
```

## TODO

- [x] Add project bootstrap command with template
- [ ] Add component generator
- [x] Add docs to readme
- [x] Open source
- [x] Setup releases in CI with [changesets](https://github.com/atlassian/changesets)
- [x] Break storybook helpers into it's own package
- [x] Config preset for babel
- [ ] Config preset for jest
- [ ] Config preset for eslint
- [ ] 🚀 v1
