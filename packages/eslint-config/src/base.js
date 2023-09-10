import tsPlugin from "@typescript-eslint/eslint-plugin";
import zanminkianPlugin from "@zanminkian/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";

export default {
  files: ["js", "cjs", "mjs", "jsx", "ts", "cts", "mts", "tsx"].map((i) => `**/*.${i}`),
  languageOptions: {
    globals: {
      ...globals["shared-node-browser"],
      ...globals.commonjs, // TODO remove it
      __dirname: false, // TODO remove it
      __filename: false, // TODO remove it
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
};
