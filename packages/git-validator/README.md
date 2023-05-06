# git-validator

[![](https://img.shields.io/npm/l/git-validator.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/git-validator.svg)](https://www.npmjs.com/package/git-validator)
[![](https://img.shields.io/npm/dm/git-validator.svg)](https://www.npmjs.com/package/git-validator)
[![](https://img.shields.io/librariesio/release/npm/git-validator)](https://www.npmjs.com/package/git-validator)
[![](https://packagephobia.com/badge?p=git-validator)](https://packagephobia.com/result?p=git-validator)

This is a bundle of opinionated git hooks, all in one!

Replace `husky`, `eslint`, `lint-staged`, and `commitlint` in your project with this npm package.

## Features

- **Unified package**: Just **ONE** npm package to install replacing multiple.
- **Simple to use**: Only two steps required; setting up scripts and installation.
- **Zero Configuration**: Sensible default settings suitable for enterprise apps.

## Usage

Set up the following scripts in your `package.json`:

- `git-validator install`: Installs hook files to `{PROJECT_ROOT}/.git/hooks` directory, which will check your code and commit messages after running the `git commit` command.
- `git-validator format`: Checks and formats all project files using the `eslint --fix` command.
- `git-validator lint`: Checks all project files using the `eslint` command.

```json
{
  "scripts": {
    "postinstall": "git-validator install",
    "format": "git-validator format",
    "lint": "git-validator lint"
  }
}
```

Next, install the package:

```sh
pnpm add -D git-validator
```

Now you can commit code to your project. Invalid code or commit messages will be automatically blocked.

## How it Works

Running `git-validator install` writes `commit-msg` and `pre-commit` files to the `{PROJECT_ROOT}/.git/hooks` directory.

- The `commit-msg` file lints your git commit message before the commit is made.
- The `pre-commit` file lints your staged code before the commit is made.

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

### Customizing eslint Config

Under the hood, we use `eslint` to lint and format code. If you want to use a different eslint config, add your own `.eslintrc.js` at the root of your project. Here's an example:

```js
module.exports = {
  rules: {
    // write your rules here
  }
}
```

## Contributing

- Clone this repository.
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10).
- Install dependencies using `pnpm install`.
- Start coding and submit your PR.

## Show your support

Give a ⭐️ if this project helped you!

## License

MIT
