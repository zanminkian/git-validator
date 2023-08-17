# git-validator

[![](https://img.shields.io/npm/l/git-validator.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/git-validator.svg)](https://www.npmjs.com/package/git-validator)
[![](https://img.shields.io/npm/dm/git-validator.svg)](https://www.npmjs.com/package/git-validator)
[![](https://img.shields.io/librariesio/release/npm/git-validator)](https://www.npmjs.com/package/git-validator)
[![](https://packagephobia.com/badge?p=git-validator)](https://packagephobia.com/result?p=git-validator)

**Git** hooks and code style **Validator**.

## Motivation

In order to improve project code quality, we usually install `husky`, `eslint`, `prettier`, `lint-staged`, `commitlint` and configure them. It's too tedious. This light wight library provide the best practice for you. You can replace them in your project with this all-in-one package.

## Features

- 📦 **Unified package**: Just **ONE** npm package to install, replacing multiple.
- 🚀 **Simple to use**: Only **TWO** steps required: installation and setting up scripts.
- 🔧 **Zero Configuration**: **ZERO** configuration file is needed, while still allowing customization of `eslint`, `prettier` and `commitlint` rules.

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
    "style:apply": "git-validator -a" // Run this to check the whole project code style and apply fixes
  }
}
```

```sh
pnpm run postinstall
```

Now you can commit code (using Git) to your project. Invalid code or commit messages will be automatically blocked.

## CLI

There are some convenient built-in commands within `git-validator`. You can run `npx git-validator -h` for more details.

- `git-validator install`: Install the git hooks.
- `git-validator [dir]`: Format and lint code using Prettier and Eslint.
- `git-validator -a [dir]`: Format and lint code using Prettier and Eslint. Files will be automatically updated.
- `git-validator format [dir]`: Format code using Prettier.
- `git-validator lint [dir]`: Lint code using Eslint.
- `git-validator -h`: Print the help for command.

## How it Works

Running `git-validator install` writes `commit-msg` and `pre-commit` files to the `{PROJECT_ROOT}/.git/hooks` directory, which will check your code and commit messages after running the `git commit` command.

### `commit-msg` Stage

The `commit-msg` file we wrote validates your git commit message before the commit is made. We use [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) with [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) config to check the git commit message.

### `pre-commit` Stage

The `pre-commit` file we wrote formats and lints your staged code before the commit is made. We use [Prettier](https://www.npmjs.com/package/prettier) with [@zanminkian/prettier-config](https://www.npmjs.com/package/@zanminkian/prettier-config) and [Eslint](https://www.npmjs.com/package/eslint) with [@zanminkian/eslint-config](https://www.npmjs.com/package/@zanminkian/eslint-config) to check the committing code.

## Advanced Usage

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

### Setup `pre-push` Stage

Running `git-validator install` writes `commit-msg` and `pre-commit` files only. As git `pre-push` stage is widely used, you can run `git-validator install --pre-push <cmd>` to set up git `pre-push` stage additionally.

```json
{
  "scripts": {
    "postinstall": "git-validator install --pre-push 'npm run test'"
  }
}
```

### Customizing Configs

We use `eslint`, `prettier`, `commitlint`, and `lint-staged` under the hood. So we respect the config files of `eslint.config.js`, `.eslintignore`, `prettier.config.js`, `.prettierignore`, `commitlint.config.js`, and `lint-staged.config.js` in the root of the project. You can customize them to apply your own rules.

- Adding `eslint.config.js` file to apply your own rules when git committing and running `git-validator lint`. The default config is `{ extends: '@zanminkian' }`.
- Adding `.eslintignore` file to skip validating certain specific files when git committing and running `git-validator lint`.
- Addint `prettier.config.js` file to apply you own rules when git committing and running `git-validator format`. The default config is `require('@zanminkian/prettier-config')`.
- Adding `.prettierignore` file to skip formatting certain specific files when git committing and running `git-validator format`.
- Adding `commitlint.config.js` file to apply your committing rules on the `commit-msg` stage. The default config is `{ extends: ['@commitlint/config-conventional'] }`.
- Adding `lint-staged.config.js` file to customize your lint-staged flow. The default config is `{ '*': ['npx git-validator -a'] }`.

### Skipping installation

If you don't want to check git commit messages, adding the `--no-commit-msg` option will skip writing `${PROJECT_ROOT}/.git/hooks/commit-msg` file. Similarly, adding the `--no-pre-commit` option will skip writing `${PROJECT_ROOT}/.git/hooks/pre-commit` file. Here is an example:

```json
{
  "scripts": {
    "postinstall": "git-validator install --no-commit-msg"
  }
}
```

## Contributing

- Clone this repository.
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`.
- Install dependencies using `pnpm install`.
- Start coding and submit your PR.

## Show your support

Give a ⭐️ if this project helped you!

## License

MIT
