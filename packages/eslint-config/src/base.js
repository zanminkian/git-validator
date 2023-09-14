import tsPlugin from "@typescript-eslint/eslint-plugin";
import zanminkianPlugin from "@zanminkian/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";

export default [
  {
    // Globally ignore. https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
    ignores: ["dist", "output", "out", "coverage"].map((i) => `**/${i}/`),
  },
  {
    files: ["js", "cjs", "mjs", "jsx", "ts", "cts", "mts", "tsx"].map((i) => `**/*.${i}`),
    languageOptions: {
      globals: {
        ...globals["shared-node-browser"],
        ...globals.browser, // TODO Optimize it. Node code should not use browser's objects.
        ...globals.commonjs, // TODO Remove it
        __dirname: false, // TODO Remove it
        __filename: false, // TODO Remove it
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
      "@zanminkian": zanminkianPlugin,
      "@typescript-eslint": tsPlugin,
    },
  },
];
