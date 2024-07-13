# @git-validator/eslint-config

[![](https://img.shields.io/npm/l/@git-validator/eslint-config.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@git-validator/eslint-config.svg)](https://www.npmjs.com/package/@git-validator/eslint-config)
[![](https://img.shields.io/npm/dm/@git-validator/eslint-config.svg)](https://www.npmjs.com/package/@git-validator/eslint-config)
[![](https://packagephobia.com/badge?p=@git-validator/eslint-config)](https://packagephobia.com/result?p=@git-validator/eslint-config)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

A strict eslint config for linting `js` / `ts` / `package.json` files. Based on [standard.js](https://github.com/standard/standard) without any stylistic opinions.

## Feature

- Lint `js` / `mjs` / `cjs` / `jsx` / `ts` / `mts` / `cts` / `tsx` / `package.json` files only.
- One-line of config.
- Type safe. TypeScript friendly.
- Respect `.gitignore`.
- Based on [standard.js](https://github.com/standard/standard).
- Have no stylistic opinions. Prettier friendly.
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Strict, but progressive.
- Modern. ESM first.
- React friendly.
- NestJS friendly.

## Usage

Install it in the root of js / ts project.

```sh
npm install -D eslint @git-validator/eslint-config
```

Config `eslint.config.js` (for ESM).

```js
import config from "@git-validator/eslint-config";

export default config;
```

If you are in CommonJS, config `eslint.config.js` bellow:

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

> Note: TypeScript project is required a `tsconfig.json` file in the root.

## Advanced Usage

### Config Builder

The default config is very strict. If you don't like the default config, use `Builder` to omit or pick some rules.

```ts
import { Builder } from "@git-validator/eslint-config";

export default new Builder()
  .enablePackagejson({
    select: {
      mode: "pick",
      rules: ["packagejson/top-types"], // only these rules will work in 'pick' mode
    },
  })
  .enableTypescript({
    project: "tsconfig.json", // tsconfig.json path
    select: {
      mode: "omit",
      rules: ["no-var"], // these rules will not work in 'omit' mode
    },
  })
  .toConfig();
```

### Type Infer

By using `.toConfig()` at the end, TypeScript will infer the config type correctly, which is consistent with the enabled rules. You can hover your mouse (in VSCode) to have a look.

![type infer](https://raw.githubusercontent.com/zanminkian/static/main/git-validator/type-infer.png)

## License

MIT
