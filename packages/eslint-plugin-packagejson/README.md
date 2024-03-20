# @git-validator/eslint-plugin-packagejson

[![](https://img.shields.io/npm/l/@git-validator/eslint-plugin-packagejson.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@git-validator/eslint-plugin-packagejson.svg)](https://www.npmjs.com/package/@git-validator/eslint-plugin-packagejson)
[![](https://img.shields.io/npm/dm/@git-validator/eslint-plugin-packagejson.svg)](https://www.npmjs.com/package/@git-validator/eslint-plugin-packagejson)
[![](https://img.shields.io/librariesio/release/npm/@git-validator/eslint-plugin-packagejson)](https://www.npmjs.com/package/@git-validator/eslint-plugin-packagejson)
[![](https://packagephobia.com/badge?p=@git-validator/eslint-plugin-packagejson)](https://packagephobia.com/result?p=@git-validator/eslint-plugin-packagejson)

ESlint plugin for linting package json.

## Features

- Lint `package.json`s in your project.
- Simple. Tiny. Fast.

## Usage

Install

```sh
pnpm add -D eslint @git-validator/eslint-plugin-packagejson
```

Config `eslint.config.js`

```js
import packagejsonPlugin, {
  processor,
} from "@git-validator/eslint-plugin-packagejson";

export default [
  {
    files: ["**/package.json"],
    processor,
    plugins: {
      packagejson: packagejsonPlugin,
    },
    rules: {
      /**
       * Force 'default' field on the bottom of 'exports'.
       */
      "packagejson/bottom-default": "error",
      /**
       * In monorepo, root 'package.json' should be private.
       */
      "packagejson/private-workspace-root": "error",
      /**
       * Public package should specify its repository address.
       */
      "packagejson/required-repository": "error",
      /**
       * Force 'types' field on the top of 'exports'.
       */
      "packagejson/top-types": "error",
      /**
       * Force 'type' field to be 'module'. It means your project should be ESM.
       */
      "packagejson/type-module": "warn",
      /**
       * In monorepo, root 'package.json' should not install any packages to 'dependencies'.
       */
      "packagejson/no-dependencies-in-workspace-root": "warn",
    },
  },
];
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
