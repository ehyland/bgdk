# Baked Good Development Kit

Or, create react app for vanilla-extract apps.

> **Note:** This project is a work in progress, see [TODO](#todo) to track progress.  
> All feedback is welcome :)

## Features

- Preconfigures webpack, babel, jest & storybook for vanilla-extract
- Dev server
- Component generator
- Easily extended through `.babelrc`, `jest.config.js`, `.browserslistrc` & `bgdk.config.js` (coming soon)

## Create a new app

```bash
npx bgdk create ./my-new-app
```

## Start the app in dev mode

```bash
bgdk dev
```

## Create a build for production

```bash
bgdk build
```

## Generate a component

```bash
bgdk component src/component/ComponentName
```

## TODO

- [x] Add project bootstrap command with template
- [x] Add component generator
- [x] Add docs to readme
- [ ] Open source
- [ ] Setup releases in CI with [changesets](https://github.com/atlassian/changesets)
- [ ] Break storybook helpers into it's own package
- [ ] Config preset for jest
- [ ] Config preset for eslint
- [ ] 🚀 v1
