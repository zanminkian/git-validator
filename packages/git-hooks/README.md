# git-hooks

A bundle of opinionated git hooks. All in one!

## Feature

- Easy to use. Just install it. It will lint your staged code and commit message automatically before git commit.
- Zero Configs. Reasonable default settings for enterprise app.

## Usage

Setup `postinstall` script in your `package.json`. And then install.

```json
{
  "scripts": {
    "postinstall": "git-hooks install"
  }
}
```

```sh
pnpm add -D @zanminkian/git-hooks
```

After that, `@zanminkian/git-hooks` will check your code and your commit message when you commit your code.

## License

MIT
