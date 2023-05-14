# @zanminkian/eslint-config

[![](https://img.shields.io/npm/l/@zanminkian/eslint-config.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@zanminkian/eslint-config.svg)](https://www.npmjs.com/package/@zanminkian/eslint-config)
[![](https://img.shields.io/npm/dm/@zanminkian/eslint-config.svg)](https://www.npmjs.com/package/@zanminkian/eslint-config)
[![](https://img.shields.io/librariesio/release/npm/@zanminkian/eslint-config)](https://www.npmjs.com/package/@zanminkian/eslint-config)
[![](https://packagephobia.com/badge?p=@zanminkian/eslint-config)](https://packagephobia.com/result?p=@zanminkian/eslint-config)

Opinionated eslint config presets. Based on `@antfu/eslint-config`.

## Feature

Check [@antfu/eslint-config](https://github.com/antfu/eslint-config#antfueslint-config).

## Usage

Install

```sh
pnpm add -D eslint @zanminkian/eslint-config
```

Config `.eslintrc.js`

```js
module.exports = {
  extends: '@zanminkian'
}
```

Config `package.json`

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Main Differences Between `@antfu/eslint-config`

- Support DI projects, such as Nest and Angular.
- Support [noPropertyAccessFromIndexSignature](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature) in `tsconfig.json`.
- Support ignoring those files that we cannot lint. It's friendly to `lint-staged`, which means you can set `.lintstagedrc` file as `{"*": "eslint --fix"}`.

## License

MIT