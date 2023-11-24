<h1 align="center">📈 git-validator</h1>

<p align="center"> <b>Git</b> hooks and code style <b>Validator</b> </p>

<p align="center">
<a href="https://github.com/zanminkian/git-validator/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/git-validator.svg"/></a>
<a href="https://www.npmjs.com/package/git-validator"><img src="https://img.shields.io/npm/v/git-validator.svg"/></a>
<a href="https://www.npmjs.com/package/git-validator"><img src="https://img.shields.io/npm/dm/git-validator.svg"/></a>
<a href="https://www.npmjs.com/package/git-validator"><img src="https://img.shields.io/librariesio/release/npm/git-validator"/></a>
<a href="https://packagephobia.com/result?p=git-validator"><img src="https://packagephobia.com/badge?p=git-validator"/></a>
</p>

## What is it

This is a cli tool for:

- checking JS/TS code style
- blocking smelly commit messages when committing code
- setting up git hooks to block 💩 slipping into your code base

In short, this is an all-in-one tool for code quality. In other words, this is a **great alternative** to [standard](https://www.npmjs.com/package/standard) and [xo](https://www.npmjs.com/package/xo).

## Highlights

- 🔧 **Zero Configuration**: **ZERO** configuration file is needed, while still allowing customization of `eslint`, `prettier` and `commitlint` rules.
- 📦 **Unified package**: Just **ONE** npm package to install, replacing multiple. You don't need `eslint`, `prettier`, `commitlint`, `lint-staged`, `husky` any more.
- 🚀 **Simple to use**: Only **TWO** steps required: set up `scripts` and run it once.

## Quick Start

Run this command in your project directory to lint code.

```sh
npx git-validator
```

Usually, we recommend you to install it and set it up in your project. Please continue reading the doc below.

## Install

Run command below in **the root of your project** to install this tool. You can replace pnpm with npm or yarn if you want.

```bash
pnpm add -D git-validator
```

## Usage

### Basic

Edit `package.json > postinstall` script and run it once.

```json
{
  "scripts": {
    "postinstall": "git-validator install",
    "style": "git-validator", // Run this to check the whole project code style
    "style:update": "git-validator -u" // Run this to check the whole project code style and apply fixes
  }
}
```

```sh
pnpm run postinstall
```

Now you can commit code (using Git) to your project. Invalid code or commit messages will be automatically blocked.

Powered by [@git-validator/eslint-config](https://www.npmjs.com/package/@git-validator/eslint-config), we now support `.js` / `.mjs` / `.cjs` / `.jsx` / `.ts` / `.mts` / `.cts` / `.tsx` / `package.json` by default.

### Setup `tsconfig.json`

This tool has integrated [@git-validator/tsconfig](https://www.npmjs.com/package/@git-validator/tsconfig). Optionally, you can setup `tsconfig.json` using `git-validator/tsconfig` if you like. It provides a more consistent development experience.

```json
// tsconfig.json
{
  "extends": "git-validator/tsconfig"
}
```

For more best practices, please refer to the [document](https://www.npmjs.com/package/@git-validator/tsconfig) of `@git-validator/tsconfig`.

### CLI

There are some convenient built-in commands for you to lint and format code (using eslint and prettier under the hood). You can run `npx git-validator -h` for more details.

```
Usage: git-validator [options] [command] [paths...]

lint & format code using eslint & prettier

Arguments:
  paths                        dir or file paths to format and lint

Options:
  -V, --version                output the version number
  -u, --update                 automatically update files to fix code style problems
  -h, --help                   display help for command

Commands:
  lint [options] [paths...]    lint code using eslint
  format [options] [paths...]  format code using prettier
  install [options]            install git-validator config files by writing git hook files to .git/hooks
```

### Customizing Linting & Formatting Rules

The default linting rule is [@git-validator/eslint-config](https://www.npmjs.com/package/@git-validator/eslint-config) and the default formatting rule is [@git-validator/prettier-config](https://www.npmjs.com/package/@git-validator/prettier-config). You can add `eslint.config.js` and `prettier.config.js` in the root of project to apply your own linting & formatting rules.

`eslint.config.js` example.

```js
// You may need to install '@sxzz/eslint-config' first
import { all } from "@sxzz/eslint-config";

export default all;
```

`prettier.config.js` example.

```js
import config from "@git-validator/prettier-config";

export default {
  ...config,
  printWidth: 120,
};
```

By default, you don't need `.eslintignore` and `.prettierignore` files in the root of project. But you can still add them to ignore some files when linting or formatting.

> We recommend you to use this tool in zero configs. If you have better suggestions about linting and formatting rules, please submit the issue or PR. Any reasonable suggestions are welcome!

### Customizing Commit Message Rules

By default, this tool requires your commit messages to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines. You can customize it by adding `commitlint.config.js` file in the root of project.

`commitlint.config.js` example.

```js
// You may need to install '@commitlint/config-angular' first
export default { extends: ["@commitlint/config-angular"] };
```

## How it Works

Running `git-validator install` writes `commit-msg` and `pre-commit` files to the `{PROJECT_ROOT}/.git/hooks` directory, which will check your code and commit messages after running the `git commit` command.

### `commit-msg` Stage

The `commit-msg` file we wrote validates your git commit message before the commit is made. We use [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) with [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) config to check the git commit message.

### `pre-commit` Stage

The `pre-commit` file we wrote lints and formats your staged code before the commit is made. We use [Eslint](https://www.npmjs.com/package/eslint) with [@git-validator/eslint-config](https://www.npmjs.com/package/@git-validator/eslint-config) and [Prettier](https://www.npmjs.com/package/prettier) with [@git-validator/prettier-config](https://www.npmjs.com/package/@git-validator/prettier-config) to check the committing code.

## Advanced Usage

### Setup `pre-push` Stage

Running `git-validator install` writes `commit-msg` and `pre-commit` files only. As git `pre-push` stage is widely used, you can run `git-validator install --pre-push <cmd>` to set up git `pre-push` stage additionally.

```json
{
  "scripts": {
    "postinstall": "git-validator install --pre-push 'npm run test'"
  }
}
```

### Skipping installation

If you don't want to check git commit messages, adding the `--no-commit-msg` option will skip writing `${PROJECT_ROOT}/.git/hooks/commit-msg` file. Similarly, adding the `--no-pre-commit` option will skip writing `${PROJECT_ROOT}/.git/hooks/pre-commit` file. Here is an example:

```json
{
  "scripts": {
    "postinstall": "git-validator install --no-commit-msg"
  }
}
```

### Skipping linting or formatting on `pre-commit` stage

When you commit you code, it will lint (using `eslint`) code first and then format (using `prettier`) code. If you want to skip one of them, you can pass `--no-eslint` or `--no-prettier` option when running `git install`.

```json
{
  "scripts": {
    // it will not lint code and will only format code when you commit your code
    "postinstall": "git-validator install --no-eslint",
    "format": "git-validator format",
    "format:update": "git-validator format -u"
  }
}
```

```json
{
  "scripts": {
    // it will not format code and will only lint code when you commit your code
    "postinstall": "git-validator install --no-prettier",
    "lint": "git-validator lint",
    "lint:update": "git-validator lint -u"
  }
}
```

### Working with `husky`

This library can work as a standalone package. However, if you have Husky 5 or a later version installed, you'll need to manually add `.husky/commit-msg` and `.husky/pre-commit`, as Husky will ignore the `.git/hooks/commit-msg` and `.git/hooks/pre-commit`:

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

.git/hooks/commit-msg $1
```

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

.git/hooks/pre-commit $1
```

## Contributing

- Clone this repository.
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`.
- Install dependencies using `pnpm install`.
- Run `pnpm style:update` to develop.
- Start coding and submit your PR.

## Show your support

Give a ⭐️ if this project helped you!

## License

MIT
