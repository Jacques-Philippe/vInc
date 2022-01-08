# Purpose

This project serves as a means to interactively increment a .csproj version number.

# How to get started (dev)

1. Make sure you've installed, in this order, `nvm`, `npm`, and `yarn`; the last can be installed via `npm -g i yarn`
1. Make sure your yarn `node_linker` is set to pnp, you can know whether this is done by checking the contents of `~/yarnrc.yml`.
1. After that, you should be able to run the `package.json` commands from this project's root.

## Running package.json commands

If you didn't know, you can run the `scripts` in `package.json` by running, from the project directory,

```
yarn [the script]
```

So for instance, to run the tests, we can say

```
yarn test
```

# How prettier was configured

See [the following readme](https://classic.yarnpkg.com/en/package/lint-staged)

# How the executable was made

We use [yarn package pkg](https://classic.yarnpkg.com/en/package/pkg) to create executables from our nodejs project.
