# @git-validator/eslint-config

[![](https://img.shields.io/npm/l/@git-validator/eslint-config.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@git-validator/eslint-config.svg)](https://www.npmjs.com/package/@git-validator/eslint-config)
[![](https://img.shields.io/npm/dm/@git-validator/eslint-config.svg)](https://www.npmjs.com/package/@git-validator/eslint-config)
[![](https://img.shields.io/librariesio/release/npm/@git-validator/eslint-config)](https://www.npmjs.com/package/@git-validator/eslint-config)
[![](https://packagephobia.com/badge?p=@git-validator/eslint-config)](https://packagephobia.com/result?p=@git-validator/eslint-config)

A strict eslint config for better code quality. Based on [standard.js](https://github.com/standard/standard) without any stylistic opinions.

## Feature

- Lint `js` / `mjs` / `cjs` / `jsx` / `ts` / `mts` / `cts` / `tsx` / `package.json` files only.
- Based on [standard.js](https://github.com/standard/standard).
- Have no stylistic opinions. Prettier friendly.
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Strict, but progressive.
- One-line of config.
- Modern. ESM first.
- Respect `.gitignore`.
- React friendly.
- NestJS friendly.
- Type safe.

## Usage

Install

```sh
pnpm add -D eslint @git-validator/eslint-config
```

Config `eslint.config.js` (for ESM)

```js
import config from "@git-validator/eslint-config";

export default config;
```

If you are in CommonJS, config `eslint.config.js` bellow

```js
module.exports = import("@git-validator/eslint-config");
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

> Note: TypeScript project is required a `tsconfig.eslint.json` or `tsconfig.json` or `tsconfig.build.json` file in the root of the project. Otherwise, ts files will be ignored and only js files will be linted.

## Progressive Usage

The default config is too strict for some projects. You can use `pick` or `omit` function in `eslint.config.js` to enable the rules step by step, progressively.

```js
// @ts-check
import { pick } from "@git-validator/eslint-config";

// Enable the rules that you configured. The other builtin rules will not work.
export default pick([
  "unicorn/error-message",
  "@typescript-eslint/no-floating-promises",
  // Other rules key. You will get auto suggestions in VSCode here.
]);
```

```js
// @ts-check
import { omit } from "@git-validator/eslint-config";

// Ignore the rules that you configure. The other builtin rules will work.
export default omit([
  "unicorn/error-message",
  "@typescript-eslint/no-floating-promises",
  // Other rules key. You will get auto suggestions in VSCode here.
]);
```

> Tips: After enabling ts check by adding `// @ts-check` at the top, you will get auto suggestions when you are using `pick` and `omit`.

## License

MIT
