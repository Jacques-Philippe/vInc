[![Build Status](https://dev.azure.com/jacquespamiot/version-incrementor/_apis/build/status/Jacques-Philippe.vInc?branchName=azure-pipelines)](https://dev.azure.com/jacquespamiot/version-incrementor/_build/latest?definitionId=2&branchName=azure-pipelines)
![Build & Test workflow](https://github.com/Jacques-Philippe/vInc/actions/workflows/main.yml/badge.svg)

# Purpose

A small console application to increment a version number in an xml file. Version number should conform to the format `v[major].[minor].[patch]`

# Usage

```
./vInc ./data/Consumer.csproj
```

or

```
./vInc ./data/Consumer.xml
```

On execution, the program will ask whether the user wishes to increment the major version number, the minor version number, or the patch number.
Where `Consumer` is expected to contain some XML with a version number in the same place as the following

```
<Project Sdk="Microsoft.NET.Sdk">
    <ItemGroup>
        <ProjectReference
            Include="..\Calculator\Calculator.csproj"
        />
    </ItemGroup>
    <PropertyGroup>
        <PackageId>Test-CalculatorApp</PackageId>
        <Version>v2.1.1</Version>
        <Authors>Jacques-Philippe Amiot</Authors>
        <Company>Not A Company Inc.</Company>
        <OutputType>Exe</OutputType>
        <TargetFramework>net5.0</TargetFramework>
    </PropertyGroup>
</Project>

```
# How to get started (user)
1. Download whichever binary you need from the release
1. Ensure the binary can be executed on your system. This might mean explicitly telling your system to trust the file.   
    For Mac, make the file executable with a `chmod +x [file]`, try running the file, it won't work, then go to `Security and Privacy` and allow the app to be opened.
1. You should then be able to execute the binary.

# How to get started (dev)

1. Make sure you've installed, in this order, `nvm`, `npm`, and `yarn`; the last can be installed via `npm -g i yarn`
1. Make sure your yarn `node_linker` is set to pnp, you can know whether this is done by checking the contents of `~/yarnrc.yml`.
1. You may need to run a `yarn` or something in the project root directory
1. You'll definitely need to run `yarn prepare` for the pre-commit hooks to set up.
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

# How the executable binary was made

We use `ncc` to compile the application into a single .js file. We then use `nexe` to create an executable binary.

# How the node package was made

We use `yarn pack`, which really is just `npm pack`. You can find more documentation about this process [here](https://docs.npmjs.com/cli/v8/using-npm/developers#what-is-a-package)  
As such, any files which are meant to be excluded from the build are specified in our `.npmignore` file.

## Fun fact for packing

You can use `yarn pack --dry-run` to get a list of all files which would be included in the tarball package. You can also use `yarn add path/to/package` to try installing the package before publishing.
