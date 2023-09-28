<h1 align="center">git-validator</h1>

<p align="center"> <b>Git</b> hooks and code style <b>Validator</b> </p>

<p align="center">
<a href="https://github.com/zanminkian/git-validator/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/git-validator.svg"/></a>
<a href="https://www.npmjs.com/package/git-validator"><img src="https://img.shields.io/npm/v/git-validator.svg"/></a>
<a href="https://www.npmjs.com/package/git-validator"><img src="https://img.shields.io/npm/dm/git-validator.svg"/></a>
<a href="https://www.npmjs.com/package/git-validator"><img src="https://img.shields.io/librariesio/release/npm/git-validator"/></a>
<a href="https://packagephobia.com/result?p=git-validator"><img src="https://packagephobia.com/badge?p=git-validator"/></a>
</p>

## What is it

- A cli tool for checking project code style.
- A cli tool for setting up git hooks to block 💩 slipping into your code base.
- A cli tool for blocking smelly commit messages when committing code.

In short, this is an all-in-one tool for code quality.

## Highlights

- 🔧 **Zero Configuration**: 0️⃣ configuration file is needed, while still allowing customization of `eslint`, `prettier` and `commitlint` rules.
- 📦 **Unified package**: Just 1️⃣ npm package to install, replacing multiple. You don't need `eslint`, `prettier`, `commitlint`, `lint-staged`, `husky` any more.
- 🚀 **Simple to use**: Only 2️⃣ steps required: set up `scripts` and run it once.

## Quick Start

Run this command in your project directory to lint code.

```sh
npx git-validator
```

Usually, we recommend you to install it and set it up in your project. Please continue reading the doc below.

## Install

```bash
pnpm add -D git-validator
```

## Usage

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

## CLI

There are some convenient built-in commands for you to lint and format code (using eslint and prettier under the hood). You can run `npx git-validator -h` for more details.

```
Usage: git-validator [options] [command] [paths...]

lint & format code using eslint & prettier

Arguments:
  paths                        dir or file paths to format and lint

Options:
  -u, --update                 automatically update files to fix code style problems
  -h, --help                   display help for command

Commands:
  lint [options] [paths...]    lint code using eslint
  format [options] [paths...]  format code using prettier
  install [options]            install git-validator config files
```

## How it Works

Running `git-validator install` writes `commit-msg` and `pre-commit` files to the `{PROJECT_ROOT}/.git/hooks` directory, which will check your code and commit messages after running the `git commit` command.

### `commit-msg` Stage

The `commit-msg` file we wrote validates your git commit message before the commit is made. We use [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) with [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) config to check the git commit message.

### `pre-commit` Stage

The `pre-commit` file we wrote lints and formats your staged code before the commit is made. We use [Eslint](https://www.npmjs.com/package/eslint) with [@git-validator/eslint-config](https://www.npmjs.com/package/@git-validator/eslint-config) and [Prettier](https://www.npmjs.com/package/prettier) with [@git-validator/prettier-config](https://www.npmjs.com/package/@git-validator/prettier-config) to check the committing code.

## Advanced Usage

### Customizing Configs

We use `eslint`, `prettier`, `commitlint`, and `lint-staged` under the hood. So we respect the config files of `eslint.config.js`, `.eslintignore`, `prettier.config.js`, `.prettierignore`, `commitlint.config.js`, and `lint-staged.config.js` in the root of the project. You can customize them to apply your own rules.

- Adding `eslint.config.js` file to apply your own rules when git committing and running `git-validator lint`. We use npm package [@git-validator/eslint-config](https://www.npmjs.com/package/@git-validator/eslint-config) as the default eslint config.
- Adding `.eslintignore` file to skip validating certain specific files when git committing and running `git-validator lint`.
- Addint `prettier.config.js` file to apply you own rules when git committing and running `git-validator format`. We use npm package [@git-validator/prettier-config](https://www.npmjs.com/package/@git-validator/prettier-config) as the default prettier config.
- Adding `.prettierignore` file to skip formatting certain specific files when git committing and running `git-validator format`.
- Adding `commitlint.config.js` file to apply your committing rules on the `commit-msg` stage. The default config is `{ extends: ['@commitlint/config-conventional'] }`.
- Adding `lint-staged.config.js` file to customize your lint-staged flow. The default config is `{ '*': ['npx git-validator -u'] }`.

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
