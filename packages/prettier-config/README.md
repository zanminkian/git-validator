# @git-validator/prettier-config

[![](https://img.shields.io/npm/l/@git-validator/prettier-config.svg)](https://github.com/zanminkian/git-validator/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@git-validator/prettier-config.svg)](https://www.npmjs.com/package/@git-validator/prettier-config)
[![](https://img.shields.io/npm/dm/@git-validator/prettier-config.svg)](https://www.npmjs.com/package/@git-validator/prettier-config)
[![](https://packagephobia.com/badge?p=@git-validator/prettier-config)](https://packagephobia.com/result?p=@git-validator/prettier-config)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

An elegant prettier shareable config.

## Features

- Elegant. One-line of config.
- Compatible with default prettier config `{}`. Only introduced some plugins.
- Enforce consistent brace style. Powered by `prettier-plugin-curly`.
- Sort `package.json`. Powered by `prettier-plugin-packagejson`.
- Sort imports. Powered by `@ianvs/prettier-plugin-sort-imports`.
- Sort Tailwind CSS classes. Powered by `prettier-plugin-tailwindcss`.

## Usage

Install

```sh
pnpm add -D prettier @git-validator/prettier-config
```

Config `prettier.config.js`

```js
import config from "@git-validator/prettier-config";

export default config;
```

Config `package.json`

```json
{
  "scripts": {
    "format": "prettier -c .",
    "format:write": "prettier -c -w ."
  }
}
```

## License

MIT
