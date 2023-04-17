# @zanminkian/git-hooks

[![](https://img.shields.io/npm/l/@zanminkian/git-hooks.svg)](https://github.com/zanminkian/git-hooks/blob/master/LICENSE)
[![](https://img.shields.io/npm/v/@zanminkian/git-hooks.svg)](https://www.npmjs.com/package/@zanminkian/git-hooks)
[![](https://img.shields.io/npm/dm/@zanminkian/git-hooks.svg)](https://www.npmjs.com/package/@zanminkian/git-hooks)
[![](https://img.shields.io/librariesio/release/npm/@zanminkian/git-hooks)](https://www.npmjs.com/package/@zanminkian/git-hooks)
[![](https://packagephobia.com/badge?p=@zanminkian/git-hooks)](https://packagephobia.com/result?p=@zanminkian/git-hooks)

This is a bundle of opinionated git hooks, all in one!

Replace `husky`, `eslint`, `lint-staged`, and `commitlint` in your project with this npm package.

## Features

- Unified package: Just **ONE** npm package to install replacing multiple.
- Simple to use: Only two steps required; setting up scripts and installation.
- Zero Configuration: Sensible default settings suitable for enterprise apps.

## Usage

Set up the following scripts in your `package.json`:

- `git-hooks install`: Installs hook files to `{PROJECT_ROOT}/.git/hooks` directory, which will check your code and commit messages after running the `git commit` command.
- `git-hooks format`: Checks and formats all project files using the `eslint --fix` command.
- `git-hooks lint`: Checks all project files using the `eslint` command.

```json
{
  "scripts": {
    "postinstall": "git-hooks install",
    "format": "git-hooks format",
    "lint": "git-hooks lint"
  }
}
```

Next, install the package:

```sh
pnpm add -D @zanminkian/git-hooks
```

Now you can commit code to your project. Invalid code or commit messages will be automatically blocked.

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

### Customizing eslint Config

Under the hood, we use `eslint` to lint and format code. If you want to use a different eslint config, add your own `.eslintrc.js` at the root of your project. Here's an example:

```js
module.exports = {
  extends: '@zanminkian',
  rules: {
    // write your rules here
  }
}
```

## How it Works

Running `git-hooks install` writes `commit-msg` and `pre-commit` files to the `{PROJECT_ROOT}/.git/hooks` directory.

- The `commit-msg` file lints your git commit message before the commit is made.
- The `pre-commit` file lints your staged code before the commit is made.

## License

MIT
