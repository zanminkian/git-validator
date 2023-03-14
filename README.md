# @zanminkian/git-hooks

[![](https://img.shields.io/npm/l/@zanminkian/git-hooks.svg)](https://github.com/zanminkian/git-hooks/blob/master/LICENSE)
[![](https://img.shields.io/npm/v/@zanminkian/git-hooks.svg)](https://www.npmjs.com/package/@zanminkian/git-hooks)
[![](https://img.shields.io/npm/dm/@zanminkian/git-hooks.svg)](https://www.npmjs.com/package/@zanminkian/git-hooks)
[![](https://img.shields.io/librariesio/release/npm/@zanminkian/git-hooks)](https://www.npmjs.com/package/@zanminkian/git-hooks)

A bundle of opinionated git hooks. All in one!

Drop `husky`, `eslint`, `lint-staged` and `commitlint` in your project.

## Feature

- Easy to use. Just install it. It will lint your staged code and committed message automatically before git commit.
- Zero Configs. Reasonable default settings for enterprise app.

## Usage

Setup `postinstall` script in your `package.json`.

```json
{
  "scripts": {
    "postinstall": "git-hooks install"
  }
}
```

And then install it.

```sh
pnpm add -D @zanminkian/git-hooks
```

After that, `@zanminkian/git-hooks` will check your code and your commit message when you commit your code.

## How it works

After running `git-hooks install`, it will write `commit-msg` file and `pre-commit` file to `{PROJECT_ROOT}/.git/hooks` directory.

- The `commit-msg` file will lint your git commit message before git commit.
- The `pre-commit` file will lint your staged code before git commit.

## License

MIT
