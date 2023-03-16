# @zanminkian/git-hooks

[![](https://img.shields.io/npm/l/@zanminkian/git-hooks.svg)](https://github.com/zanminkian/git-hooks/blob/master/LICENSE)
[![](https://img.shields.io/npm/v/@zanminkian/git-hooks.svg)](https://www.npmjs.com/package/@zanminkian/git-hooks)
[![](https://img.shields.io/npm/dm/@zanminkian/git-hooks.svg)](https://www.npmjs.com/package/@zanminkian/git-hooks)
[![](https://img.shields.io/librariesio/release/npm/@zanminkian/git-hooks)](https://www.npmjs.com/package/@zanminkian/git-hooks)
[![](https://packagephobia.com/badge?p=@zanminkian/git-hooks)](https://packagephobia.com/result?p=@zanminkian/git-hooks)

A bundle of opinionated git hooks. All in one!

Drop `husky`, `eslint`, `lint-staged` and `commitlint` in your project.

## Feature

- Easy to use. Just install it. It will lint your staged code and committed message automatically before git commit.
- Zero Configs. Reasonable default settings for enterprise app.

## Usage

Setup scripts in your `package.json`.

- `git-hooks install`: Install the hook files to `.git/hooks` directory, in order to check your code and committed message after running `git commit` command.
- `git-hooks format`: Check and format all the files of your project. Use `eslint --fix` command under the hood.
- `git-hooks lint`: Check all the files of your project. Use `eslint` command under the hood.

```json
{
  "scripts": {
    "postinstall": "git-hooks install",
    "format": "git-hooks format",
    "lint": "git-hooks lint"
  }
}
```

And then install it.

```sh
pnpm add -D @zanminkian/git-hooks
```

After that, you can commit your code in your project. The invalid code and the invalid committed message will be blocked automatically.

## How it works

After running `git-hooks install`, it will write `commit-msg` file and `pre-commit` file to `{PROJECT_ROOT}/.git/hooks` directory.

- The `commit-msg` file will lint your git commit message before git commit.
- The `pre-commit` file will lint your staged code before git commit.

## License

MIT
