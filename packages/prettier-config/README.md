# @fenge/prettier-config

[![](https://img.shields.io/npm/l/@fenge/prettier-config.svg)](https://github.com/zanminkian/fenge/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/@fenge/prettier-config.svg)](https://www.npmjs.com/package/@fenge/prettier-config)
[![](https://img.shields.io/npm/dm/@fenge/prettier-config.svg)](https://www.npmjs.com/package/@fenge/prettier-config)
[![](https://packagephobia.com/badge?p=@fenge/prettier-config)](https://packagephobia.com/result?p=@fenge/prettier-config)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

An elegant prettier shareable config.

## Features

- Elegant. One-line of config.
- Compatible with default prettier config `{}`. Only introduced some plugins.
- ~~Enforce consistent brace style. Powered by `prettier-plugin-curly`.~~
- Sort `package.json`. Powered by `prettier-plugin-packagejson`.
- Sort imports. Powered by `@ianvs/prettier-plugin-sort-imports`.
- Sort Tailwind CSS classes. Powered by `prettier-plugin-tailwindcss`.

## Usage

Install

```sh
pnpm add -D prettier @fenge/prettier-config
```

Config `prettier.config.js`

```js
import config from "@fenge/prettier-config";

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
