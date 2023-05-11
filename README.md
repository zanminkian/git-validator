# git-validator

[![](https://img.shields.io/npm/l/git-validator.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/git-validator.svg)](https://www.npmjs.com/package/git-validator)
[![](https://img.shields.io/npm/dm/git-validator.svg)](https://www.npmjs.com/package/git-validator)
[![](https://img.shields.io/librariesio/release/npm/git-validator)](https://www.npmjs.com/package/git-validator)
[![](https://packagephobia.com/badge?p=git-validator)](https://packagephobia.com/result?p=git-validator)

This is a bundle of opinionated git hooks, all in one!

Replace `husky`, `eslint`, `lint-staged` and `commitlint` in your project with this npm package.

## Features

- **Unified package**: Just **ONE** npm package to install replacing multiple.
- **Simple to use**: Only two steps required; setting up scripts and installation.
- **Zero Configuration**: Sensible default settings suitable for enterprise apps.

## Usage

Installing `git-validator` equals to installing `eslint`, `lint-staged` and `commitlint`. So that you can uninstall them if they have been installed in your project.

```bash
pnpm remove eslint lint-staged commitlint
```

Set up `postinstall` script in `package.json` to invoke `git-validator install`.

```json
{
  "scripts": {
    "postinstall": "git-validator install"
  }
}
```

Next, install the package:

```sh
pnpm add -D git-validator
```

Now you can commit code to your project. Invalid code or commit messages will be automatically blocked.

## How it Works

Running `git-validator install` writes `commit-msg` and `pre-commit` files to the `{PROJECT_ROOT}/.git/hooks` directory, which will check your code and commit messages after running the `git commit` command.

### `commit-msg` Stage

The `commit-msg` file we wrote lints your git commit message before the commit is made. We use [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) with [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) config to check the git commit message.

### `pre-commit` Stage

The `pre-commit` file we wrote lints your staged code before the commit is made. We use [eslint](https://www.npmjs.com/package/eslint) with [@zanminkian/eslint-config](https://www.npmjs.com/package/@zanminkian/eslint-config) config to check the committing code.

## Commands

There are some convenient built-in commands within `git-validator`. We encourage you to use them instead of `eslint`.

- `git-validator lint [dir]`: lint code using `eslint` command under the hood.
- `git-validator lint --fix [dir]` lint and fix code using `eslint --fix` command under the hood.

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

Running `git-validator install` writes `commit-msg` and `pre-commit` files only. As git `pre-push` stage is widely used, you can run `git-validator install --pre-push <cmd>` to setup git `pre-push` stage additionally.

```json
{
  "scripts": {
    "postinstall": "git-validator install --pre-push 'npm run test'"
  }
}
```

### Customizing Configs

We use `eslint`, `commitlint` and `lint-staged` under the hood. So we respect the config files of `eslint.config.js`, `.eslintignore`, `commitlint.config.js` and `lint-staged.config.js` in the root of project. You can customize them to apply your own rules.

- Adding `eslint.config.js` file to apply your own rules when git committing and running `git-validator lint`. The default config is `{ extends: '@zanminkian' }`.
- Adding `.eslintignore` file to skip validating certain specific files when git committing and running `git-validator lint`.
- Adding `commitlint.config.js` file to apply your committing rules on the `commit-msg` stage. The default config is `{ extends: ['@commitlint/config-conventional'] }`.
- Adding `lint-staged.config.js` file to customize your lint-staged flow. The default config is `{ '*': ['npx git-validator lint --fix'] }`.

### Skip installing

If you don't want to check git commit message, adding `--no-commit-msg` option will skip writing `${PROJECT_ROOT}/.git/hooks/commit-msg` file. As the same, adding `--no-pre-commit` option will skip writing `${PROJECT_ROOT}/.git/hooks/pre-commit` file. Here is an example.

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
