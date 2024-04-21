<h1 align="center">📈 git-validator</h1>

<p align="center"> <b>Git</b> hooks and code style <b>Validator</b> </p>

<p align="center"> <a href="https://github.com/zanminkian/git-validator/blob/main/packages/git-validator/README.md">English</a> | 简体中文 </p>

<p align="center">
<a href="https://github.com/zanminkian/git-validator/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/git-validator.svg"/></a>
<a href="https://www.npmjs.com/package/git-validator"><img src="https://img.shields.io/npm/v/git-validator.svg"/></a>
<a href="https://www.npmjs.com/package/git-validator"><img src="https://img.shields.io/npm/dm/git-validator.svg"/></a>
<a href="https://www.npmjs.com/package/git-validator"><img src="https://img.shields.io/librariesio/release/npm/git-validator"/></a>
<a href="https://packagephobia.com/result?p=git-validator"><img src="https://packagephobia.com/badge?p=git-validator"/></a>
</p>

## 这是什么

这是一个 cli 工具，用于：

- 检查 `js`/`jsx`/`ts`/`tsx` 的代码风格
- 规范 git 提交信息
- 设置 git hooks 来阻止垃圾代码提交

简而言之, 这是一个 all-in-one 的用于提升代码质量的工具。换句话说，这是 [standard](https://www.npmjs.com/package/standard) 和 [xo](https://www.npmjs.com/package/xo) 的**绝佳替代方案**。

## 亮点

- 🔧 **零配置**: 默认 **0** 配置，同时也允许你自定义 `eslint`、`prettier` 和 `commitlint` 规则。
- 📦 **只需一个包**: 只需安装这 **1** 个 npm 包。无需再安装 `eslint`、`prettier`、`commitlint`、`lint-staged`、`husky`。
- 🚀 **简单易用**: 只需 **2** 步：设置 `scripts`，然后运行 1 次。

## 要求

- Node >= 18
- Typescript >= 5.0

## 快速开始

在你项目目录中运行以下命令，即可检查项目的代码风格。

```sh
npx git-validator
```

通常，我们推荐你安装这个工具，并在项目中设置好。请继续阅读下面的文档。

## 安装

在你的项目根目录运行以下命令来安装这个工具。你也可以将 pnpm 换成 npm 或者 yarn。

```bash
pnpm add -D git-validator
```

## 用法

### 基础用法

编辑 `package.json > postinstall` 脚本，然后运行一次。

```json
{
  "scripts": {
    "postinstall": "git-validator install",
    "style": "git-validator", // 运行这个命令可以检查整个项目的代码风格
    "style:update": "git-validator -u" // 运行这个命令可以检查整个项目的代码风格，并自动改正
  }
}
```

```sh
pnpm run postinstall
```

现在，你可以在你的项目中提交你的代码（用 Git）。任何不规范的代码和提交信息都会被自动阻止。

底层使用 [@git-validator/eslint-config](https://www.npmjs.com/package/@git-validator/eslint-config) 预设配置文件，我们默认支持检查这些文件： `.js` / `.mjs` / `.cjs` / `.jsx` / `.ts` / `.mts` / `.cts` / `.tsx` / `package.json`。

### 设置 `tsconfig.json`

这个工具集成了 [@git-validator/tsconfig](https://www.npmjs.com/package/@git-validator/tsconfig). 如果你需要，你可以设置的项目的 `tsconfig.json` 继承 `git-validator/tsconfig`。这将使你的开发体验更加丝滑一致。

```json
// tsconfig.json
{
  "extends": "git-validator/tsconfig"
}
```

更多最佳实践，请查看 `@git-validator/tsconfig` 的 [文档](https://www.npmjs.com/package/@git-validator/tsconfig)。

### CLI

这个工具内置了一些命令，让你更好地检查代码风格以及格式化代码（底层使用 eslint 和 prettier）。你可以执行 `npx git-validator -h` 查看更多信息。

```
Usage: git-validator [options] [command] [paths...]

lint & format code using eslint & prettier

Arguments:
  paths                        dir or file paths to format and lint

Options:
  -V, --version                output the version number
  -f, --fix                    automatically fix problems using eslint
  -w, --write                  automatically format code using prettier
  -u, --update                 automatically fix problems and format code using eslint and prettier
  -h, --help                   display help for command

Commands:
  lint [options] [paths...]    lint code using eslint
  format [options] [paths...]  format code using prettier
  install [options]            install git-validator config files by writing git hook files to .git/hooks
  analyze [options] [path]     analyze js/ts project quality and print the report
  init-tsconfig [options]      init a tsconfig file
  diff-tsconfig [options]      show differences between recommended tsconfig and current project tsconfig
```

### 自定义 Linting 和 Formatting 规则

默认的 lint 规则是用 [@git-validator/eslint-config](https://www.npmjs.com/package/@git-validator/eslint-config)，默认的 format 规则是用 [@git-validator/prettier-config](https://www.npmjs.com/package/@git-validator/prettier-config)。你可以在你项目的根目录添加 `eslint.config.js` 和 `prettier.config.js` 文件来实现你自己想要的规则。

`eslint.config.js` example.

```js
// 你也可以自行安装并使用其他 eslint config，例如 `@sxzz/eslint-config`
import { omit } from "@git-validator/eslint-config";

// 移除你不想要开启的规则
export default omit([
  "no-plusplus",
  // ...
]);
```

`prettier.config.js` example.

```js
import config from "@git-validator/prettier-config";

export default {
  ...config,
  printWidth: 120,
};
```

默认情况下，你项目的根目录不需要有 `.eslintignore` 和 `.prettierignore` 文件。但是你仍然可以自行添加这两个文件来忽略你不想要被 lint 或 format 的文件。

> 我们推荐你零配置地使用这个工具。如果你有更好的关于 lint 或 format 的建议，请提交 issue 或者 PR。欢迎任何合理的建议！

### 自定义提交信息规则

默认情况下，这个工具要求你的提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范。你可以添加 `commitlint.config.js` 文件到你的项目根目录，来自定你的提交信息规则。

`commitlint.config.js` example.

```js
// You may need to install '@commitlint/config-angular' first
export default { extends: ["@commitlint/config-angular"] };
```

### 自定义 `lint-staged.config.js`

当你提交你的代码，每个文件都会经过 `npx git-validator -w` 命令被检查代码风格并被格式化。你可以在你项目的根目录添加 `lint-staged.config.js` 文件来改变相关的规则。下面演示一个样例。

```js
// 这个配置意思是：js 文件将会被 lint 然后 format，而 md 文件只会被 format。
export default {
  "*.js": "npx git-validator -u",
  "*.md": "npx git-validator format -u",
};
```

## 如何工作的

运行 `git-validator install` 会将 `commit-msg` 和 `pre-commit` 文件写到 `{PROJECT_ROOT}/.git/hooks` 文件夹，这两个文件会在你运行 `git commit` 命令后运行，用来检查你的代码和提交信息。

### `commit-msg` 阶段

我们写入的 `commit-msg` 文件会在执行提交前检查你的提交信息。我们使用 [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) 和 [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) 配置，来检查你的 git 提交信息。

### `pre-commit` 阶段

我们写入的 `pre-commit` 文件会在执行提交前 lint 然后 format 暂存（staged）起来的代码。我们使用 [Eslint](https://www.npmjs.com/package/eslint) 和 [@git-validator/eslint-config](https://www.npmjs.com/package/@git-validator/eslint-config)，以及 [Prettier](https://www.npmjs.com/package/prettier) 和 [@git-validator/prettier-config](https://www.npmjs.com/package/@git-validator/prettier-config) 来检查代码风格。

## 高级用法

### 设置 `pre-push` 阶段

运行 `git-validator install` 只会写入 `commit-msg` 和 `pre-commit` 文件。因为 git 的 `pre-push` 阶段也被广泛使用，你可以执行 `git-validator install --pre-push <cmd>` 命令来额外地设置 git 的 `pre-push` 阶段.

```json
{
  "scripts": {
    "postinstall": "git-validator install --pre-push 'npm run test'"
  }
}
```

### 跳过安装

如果你不想检查 git 的提交信息，可以添加 `--no-commit-msg` 参数来跳过写入 `${PROJECT_ROOT}/.git/hooks/commit-msg` 文件。同样的，添加 `--no-pre-commit` 参数也会跳过写入 `${PROJECT_ROOT}/.git/hooks/pre-commit` 文件。示例如下：

```json
{
  "scripts": {
    "postinstall": "git-validator install --no-commit-msg"
  }
}
```

### 在 `pre-commit` 阶段跳过 lint 或 format

当你提交你的代码，这个工具会先对代码文件执行 lint（底层使用 `eslint`），然后执行 format（底层使用 `prettier`）。如果你想跳过这两个中的一个，你可以在 `git install` 命令额外添加 `--no-eslint` 或 `--no-prettier` 参数。

```json
{
  "scripts": {
    // 当你提交代码时，这将不会 lint 你的代码，只会 format 你的代码
    "postinstall": "git-validator install --no-eslint",
    "format": "git-validator format",
    "format:update": "git-validator format -u"
  }
}
```

```json
{
  "scripts": {
    // 当你提交代码时，这将不会 format 你的代码，只会 lint 你的代码
    "postinstall": "git-validator install --no-prettier",
    "lint": "git-validator lint",
    "lint:update": "git-validator lint -u"
  }
}
```

### 和 `husky` 一起工作

这个工具可以单独使用。然而，如果你安装了 `Husky 5` 或更高版本，你将需要手动地添加 `.husky/commit-msg` 和 `.husky/pre-commit` 文件，这是因为 Husky 会忽略 `.git/hooks/commit-msg` 和 `.git/hooks/pre-commit`。

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

.git/hooks/commit-msg $1
```

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

.git/hooks/pre-commit $1
```

## 贡献代码

- Clone this repository.
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`.
- Install dependencies using `pnpm install`.
- Run `pnpm style:update` to develop.
- Start coding and submit your PR.

## 支持本项目

如果这个项目帮助到你，麻烦点一个 ⭐️ 吧！

## License

MIT
