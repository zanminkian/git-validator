import fs from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import gitValidatorPlugin from "@git-validator/eslint-plugin";
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import { getProjectTsconfig } from "./utils.js";

const tsconfig = await getProjectTsconfig();
const jsExtensions = ["js", "cjs", "mjs", "jsx"];
const tsExtensions = ["ts", "cts", "mts", "tsx"];

async function getIgnoresByGitIgnore() {
  const content = await fs.readFile(join(process.cwd(), ".gitignore"), "utf-8").catch(() => "");
  return content
    .split("\n")
    .filter(Boolean)
    .map((i) => i.trim())
    .map(gitignoreToMinimatch);
}

export default [
  {
    // Globally ignore. https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
    ignores: await getIgnoresByGitIgnore(),
  },
  {
    files: [...jsExtensions, ...(tsconfig ? tsExtensions : [])].map((i) => `**/*.${i}`),
    languageOptions: {
      globals: {
        ...globals["shared-node-browser"],
        ...globals.browser, // TODO Optimize it. Node code should not use browser's objects.
      },
    },
    linterOptions: {
      // noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      n: nPlugin,
      import: importPlugin,
      promise: promisePlugin,
      unicorn: unicornPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "@git-validator": gitValidatorPlugin,
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
      jest: jestPlugin,
    },
  },
];
