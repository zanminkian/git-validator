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

The default config is very strict. If you don't like the default config, use `Builder` to customize your own.

```ts
import { Builder } from "@git-validator/eslint-config";

export default new Builder()
  .enablePackagejson({
    pick: ["packagejson/top-types"], // only these rules will work for package.json files
  })
  .enableJavascript({
    omit: ["no-var"], // these rules will not work for js files
  })
  .enableTypescript({
    project: "tsconfig.json", // tsconfig.json path
    extend: {
      // apply additional rules for ts files
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
    },
  })
  .toConfig();
```

## License

MIT
