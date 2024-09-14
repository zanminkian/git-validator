# eslint-plugin-esm

[![](https://img.shields.io/npm/l/eslint-plugin-esm.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/eslint-plugin-esm.svg)](https://www.npmjs.com/package/eslint-plugin-esm)
[![](https://img.shields.io/npm/dm/eslint-plugin-esm.svg)](https://www.npmjs.com/package/eslint-plugin-esm)
[![](https://packagephobia.com/badge?p=eslint-plugin-esm)](https://packagephobia.com/result?p=eslint-plugin-esm)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

ESLint plugin for linting ESM (import/export syntax)

## Requirement

- ESLint >= 8.57.0

## Usage

Install

```sh
npm i -D eslint eslint-plugin-esm
```

Config `eslint.config.js`

```js
import * as esm from "eslint-plugin-esm";

export default [
  ...
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"],
    plugins: { esm },
    rules: {
      "esm/no-git-ignored-imports": "error"
      ...
      // See https://github.com/zanminkian/git-validator/packages/eslint-plugin-esm/doc/rules for more other rules
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

Click [here](https://github.com/zanminkian/git-validator/packages/eslint-plugin-esm/doc/rules).

## License

MIT
