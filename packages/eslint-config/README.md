# @zanminkian/eslint-config

[![](https://img.shields.io/npm/l/@zanminkian/eslint-config.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@zanminkian/eslint-config.svg)](https://www.npmjs.com/package/@zanminkian/eslint-config)
[![](https://img.shields.io/npm/dm/@zanminkian/eslint-config.svg)](https://www.npmjs.com/package/@zanminkian/eslint-config)
[![](https://img.shields.io/librariesio/release/npm/@zanminkian/eslint-config)](https://www.npmjs.com/package/@zanminkian/eslint-config)
[![](https://packagephobia.com/badge?p=@zanminkian/eslint-config)](https://packagephobia.com/result?p=@zanminkian/eslint-config)

Opinionated eslint config presets. Based on [standard.js](https://github.com/standard/standard).

## Feature

- Based on [standard.js](https://github.com/standard/standard). Better than it.
- One-line of config.
- Designed to work with TypeScript, Nestjs and React out-of-box.
- Aimed to be used standalone without Prettier.

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

## License

MIT