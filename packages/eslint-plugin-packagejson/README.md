# @git-validator/eslint-plugin-packagejson

[![](https://img.shields.io/npm/l/@git-validator/eslint-plugin-packagejson.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@git-validator/eslint-plugin-packagejson.svg)](https://www.npmjs.com/package/@git-validator/eslint-plugin-packagejson)
[![](https://img.shields.io/npm/dm/@git-validator/eslint-plugin-packagejson.svg)](https://www.npmjs.com/package/@git-validator/eslint-plugin-packagejson)
[![](https://packagephobia.com/badge?p=@git-validator/eslint-plugin-packagejson)](https://packagephobia.com/result?p=@git-validator/eslint-plugin-packagejson)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

ESlint plugin for linting package.json.

## Features

- Lint `package.json`s.
- Simple. Tiny. Fast.
- Zero dependencies.

## Requirement

- ESLint >= 8.57.0

## Usage

Install

```sh
pnpm add -D eslint @git-validator/eslint-plugin-packagejson
```

Config `eslint.config.js`

```js
import * as packagejsonPlugin from "@git-validator/eslint-plugin-packagejson";

export default [
  ...
  {
    files: ["**/package.json"],
    processor: "packagejson/processor",
    plugins: {
      packagejson: packagejsonPlugin,
    },
    rules: {
      "packagejson/no-lifecycle-script": "error",
      ...
      // Visit https://github.com/zanminkian/git-validator/tree/main/packages/eslint-plugin-packagejson/doc/rules for more other rules
    },
  },
  ...
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

## Rules

Click [here](https://github.com/zanminkian/git-validator/tree/main/packages/eslint-plugin-packagejson/doc/rules).

## License

MIT
