# eslint-plugin-pkg-json

[![](https://img.shields.io/npm/l/eslint-plugin-pkg-json.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/eslint-plugin-pkg-json.svg)](https://www.npmjs.com/package/eslint-plugin-pkg-json)
[![](https://img.shields.io/npm/dm/eslint-plugin-pkg-json.svg)](https://www.npmjs.com/package/eslint-plugin-pkg-json)
[![](https://packagephobia.com/badge?p=eslint-plugin-pkg-json)](https://packagephobia.com/result?p=eslint-plugin-pkg-json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

ESLint plugin for linting `package.json` file.

## Features

- Lint `package.json`s.
- Simple. Tiny. Fast.
- Zero dependencies.

## Requirement

- ESLint >= 8.57.0

## Usage

Install

```sh
pnpm add -D eslint eslint-plugin-pkg-json
```

Config `eslint.config.js`

```js
import * as pkg from "eslint-plugin-pkg-json";

export default [
  ...
  {
    files: ["**/package.json"],
    processor: "pkg-json/processor",
    plugins: { "pkg-json": pkg },
    rules: {
      "pkg-json/no-lifecycle-script": "error",
      ...
      // Visit https://github.com/zanminkian/git-validator/tree/main/packages/eslint-plugin-pkg-json/doc/rules for more other rules
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

Click [here](https://github.com/zanminkian/git-validator/tree/main/packages/eslint-plugin-pkg-json/doc/rules).

## License

MIT
