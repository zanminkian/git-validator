# @git-validator/tsconfig

Strict shared tsconfig out-of-box

[![](https://img.shields.io/npm/l/@git-validator/tsconfig.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@git-validator/tsconfig.svg)](https://www.npmjs.com/package/@git-validator/tsconfig)
[![](https://img.shields.io/npm/dm/@git-validator/tsconfig.svg)](https://www.npmjs.com/package/@git-validator/tsconfig)
[![](https://img.shields.io/librariesio/release/npm/@git-validator/tsconfig)](https://www.npmjs.com/package/@git-validator/tsconfig)
[![](https://packagephobia.com/badge?p=@git-validator/tsconfig)](https://packagephobia.com/result?p=@git-validator/tsconfig)

## Feature

- Strictest configs with best practices.
- One-line of tsconfig.
- Support `ESM` and `CommonJS` by `type` field in `package.json`.
- Support FE (eg: [React](https://github.com/facebook/react)) & BE (eg: [Nest](https://github.com/nestjs/nest)) project.

## Requirement

- Typescript 5.0+.
- Node 16+.

## Usage

### Install

```sh
npm i @git-validator/tsconfig -D
```

For node project, you may need to install `@types/node` additionally.

```sh
npm i @types/node -D
```

For frontend project (like React), you may need to install `@types/web` additionally.

```sh
npm i @types/web -D
```

### Config `tsconfig.json`

```json
{
  "extends": "@git-validator/tsconfig"
}
```

## Best Practices

Here are the best practices if you are using this package.

### For polyrepo

```
├── src
│   └── index.ts
├── test
│   └── index.spec.ts
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```

#### tsconfig.json

```json
{
  "extends": "@git-validator/tsconfig"
}
```

#### tsconfig.build.json

```json
{
  "extends": "./tsconfig",
  "include": ["src"],
  "exclude": ["**/*.spec.ts"],
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

### For monorepo

```
├── apps
│   ├── app1
│   │   ├── src
│   │   │   └── main.ts
│   │   ├── test
│   │   │   └── main.spec.ts
│   │   ├── package.json
│   │   └── tsconfig.build.json
│   └── app2
│       ├── src
│       │   └── main.ts
│       ├── test
│       │   └── main.spec.ts
│       ├── package.json
│       └── tsconfig.build.json
├── package.json
└── tsconfig.json
```

#### tsconfig.json in the root of project

```json
{
  "extends": "@git-validator/tsconfig"
}
```

#### tsconfig.build.json in each app

```json
{
  "extends": "../../tsconfig",
  "include": ["src"],
  "exclude": ["**/*.spec.ts"],
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

## Commands

After installing `@git-validator/tsconfig`, you can run `npx tsconfig init` command to generate a `tsconfig.json` file. Run `npx tsconfig init -h` for more detail of the command:

```txt
Usage: tsconfig init [options]

init a tsconfig file

Options:
  -p, --path <path>      directory path to generate file to (default: ".")
  -n, --name <filename>  tsconfig file name (default: "tsconfig.json")
  -f, --force            forcefully overwrite existing file
  -h, --help             display help for command
```

## License

MIT
