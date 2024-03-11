import fs from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";
import prettierConfig from "eslint-config-prettier";
import jsConfig from "./js-config.js";
import packagejsonConfig from "./packagejson-config.js";
import tsConfig from "./ts-config.js";

async function globallyIgnore() {
  const ignores = (
    await fs
      .readFile(resolve(process.cwd(), ".gitignore"), "utf-8")
      .catch(() => "")
  )
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean)
    .filter((i) => !i.startsWith("#"))
    .map(gitignoreToMinimatch);
  // Globally ignore. https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
  return { ignores };
}

export default [
  globallyIgnore(),
  jsConfig,
  ...tsConfig,
  packagejsonConfig,
  prettierConfig,
];
