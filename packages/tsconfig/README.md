# @git-validator/tsconfig

Strict shared tsconfig out-of-box

[![](https://img.shields.io/npm/l/@git-validator/tsconfig.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@git-validator/tsconfig.svg)](https://www.npmjs.com/package/@git-validator/tsconfig)
[![](https://img.shields.io/npm/dm/@git-validator/tsconfig.svg)](https://www.npmjs.com/package/@git-validator/tsconfig)
[![](https://packagephobia.com/badge?p=@git-validator/tsconfig)](https://packagephobia.com/result?p=@git-validator/tsconfig)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

## Feature

- Strictest configs with best practices.
- One-line of tsconfig.
- Support `ESM` and `CommonJS`.
- Support FE (eg: [React](https://github.com/facebook/react)) & BE (eg: [Nest](https://github.com/nestjs/nest)) project.

## Requirement

- Typescript 5.0+.
- Node 18+.

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
  "exclude": ["**/*.spec.ts", "**/*.test.ts"],
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
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── app2
│       ├── src
│       │   └── main.ts
│       ├── test
│       │   └── main.spec.ts
│       ├── package.json
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── package.json
└── tsconfig.json
```

#### tsconfig.json in the root of project

```json
{
  "extends": "@git-validator/tsconfig"
}
```

#### tsconfig.json in each app

```json
{
  "extends": "../../tsconfig"
}
```

#### tsconfig.build.json in each app

```json
{
  "extends": "./tsconfig",
  "include": ["src"],
  "exclude": ["**/*.spec.ts", "**/*.test.ts"],
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

## Commands

After installing `@git-validator/tsconfig`, you can run `npx tsconfig init` command to generate a `tsconfig.json` file. Run `npx tsconfig -h` for all commands details:

```txt
Usage: tsconfig [options] [command]

Options:
  -h, --help      display help for command

Commands:
  init [options]  init a tsconfig file
  diff [options]  show differences between recommended tsconfig and current project tsconfig
  help [command]  display help for command
```

## License

MIT
