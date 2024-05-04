# @git-validator/eslint-plugin-packagejson

[![](https://img.shields.io/npm/l/@git-validator/eslint-plugin-packagejson.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@git-validator/eslint-plugin-packagejson.svg)](https://www.npmjs.com/package/@git-validator/eslint-plugin-packagejson)
[![](https://img.shields.io/npm/dm/@git-validator/eslint-plugin-packagejson.svg)](https://www.npmjs.com/package/@git-validator/eslint-plugin-packagejson)
[![](https://packagephobia.com/badge?p=@git-validator/eslint-plugin-packagejson)](https://packagephobia.com/result?p=@git-validator/eslint-plugin-packagejson)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

ESlint plugin for linting package json.

## Features

- Lint `package.json`s in your project.
- Simple. Tiny. Fast.
- Zero dependencies.

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
       * `dependencies` and `devDependencies` are expected exact package versions.
       * Versions like`"foo": "^1.0.0"` are not allowed.
       */
      "packagejson/exact-dependency-version": "error",
      /**
       * In monorepo, root 'package.json' should be private.
       */
      "packagejson/private-workspace-root": "error",
      /**
       * The root package.json should specify `engines` field.
       */
      "packagejson/required-engines": "error",
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
