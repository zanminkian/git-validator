# @git-validator/eslint-config

[![](https://img.shields.io/npm/l/@git-validator/eslint-config.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@git-validator/eslint-config.svg)](https://www.npmjs.com/package/@git-validator/eslint-config)
[![](https://img.shields.io/npm/dm/@git-validator/eslint-config.svg)](https://www.npmjs.com/package/@git-validator/eslint-config)
[![](https://img.shields.io/librariesio/release/npm/@git-validator/eslint-config)](https://www.npmjs.com/package/@git-validator/eslint-config)
[![](https://packagephobia.com/badge?p=@git-validator/eslint-config)](https://packagephobia.com/result?p=@git-validator/eslint-config)

A strict eslint config for better code quality. Based on [standard.js](https://github.com/standard/standard) without any stylistic opinions.

## Feature

- Based on [standard.js](https://github.com/standard/standard), but introduced more powerful rules to forbid stupid codes.
- One-line of config.
- Work well with Prettier without conflicts.
- Designed to work with TypeScript, NestJS and React out-of-box.

## Usage

Install

```sh
pnpm add -D eslint @git-validator/eslint-config
```

Config `eslint.config.js`

```js
import config from "@git-validator/eslint-config";

export default config;
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
