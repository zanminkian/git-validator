// @ts-check
import fs from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";
// @ts-expect-error
import prettierConfig from "eslint-config-prettier";
import jsConfig from "./js-config.js";
import packagejsonConfig from "./packagejson-config.js";
import reactConfig from "./react-config.js";
import tsConfig from "./ts-config.js";

async function getIgnoresByGitIgnore() {
  return (
    await fs
      .readFile(join(process.cwd(), ".gitignore"), "utf-8")
      .catch(() => "")
  )
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean)
    .map(gitignoreToMinimatch);
}

export default [
  {
    // Globally ignore. https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
    ignores: await getIgnoresByGitIgnore(),
  },
  jsConfig,
  ...tsConfig,
  reactConfig,
  packagejsonConfig,
  prettierConfig,
];
