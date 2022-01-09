[![Build Status](https://dev.azure.com/jacquespamiot/version-incrementor/_apis/build/status/Jacques-Philippe.vInc?branchName=azure-pipelines)](https://dev.azure.com/jacquespamiot/version-incrementor/_build/latest?definitionId=2&branchName=azure-pipelines)

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

We use `yarn pack`, which really is just `npm pack`. You can find more documentation about this process [here](https://docs.npmjs.com/cli/v8/using-npm/developers#what-is-a-package)  
As such, any files which are meant to be excluded from the build are specified in our `.npmignore` file.

## Fun fact for packing

You can use `yarn pack --dry-run` to get a list of all files which would be included in the tarball package. You can also use `yarn add path/to/package` to try installing the package before publishing.
