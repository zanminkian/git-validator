import fs from "node:fs";
import path from "node:path";
import zanminkianPlugin from "@zanminkian/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";

const dirname = path.dirname(new URL(import.meta.url).pathname);
const standardConfig = JSON.parse(fs.readFileSync(path.join(dirname, "standard-config.json")));

export default {
  files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.jsx"],
  ignores: ["dist", "output", "out", "coverage"].map((i) => `**/${i}/**/*`),
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
  },
  rules: {
    ...standardConfig.rules,
    // override standard config rules
    "comma-dangle": ["error", "always-multiline"],
    "brace-style": ["error", "1tbs", { allowSingleLine: false }], // https://github.com/standard/eslint-config-standard/pull/281

    // code style for a better readability
    "max-statements-per-line": ["error", { max: 1 }],
    "import/newline-after-import": ["error", { count: 1 }],
    "simple-import-sort/imports": [
      "error",
      { groups: [["^\\u0000", "^node:", "^@?\\w", "^", "^\\."]] },
    ],
    "simple-import-sort/exports": "error",
    "unicorn/prefer-node-protocol": "error",
    "unicorn/escape-case": "error", // '\ud834' -> '\uD834'
    "unicorn/number-literal-case": "error", // 0XFF -> 0xFF
    "arrow-body-style": ["error", "as-needed"],

    // ban some syntaxes to reduce mistakes
    "import/no-self-import": "error",
    "import/no-dynamic-require": "error", // TODO remove it once we have ban commonjs in js file.
    "import/no-relative-packages": "error",
    "import/no-mutable-exports": "error", // forbid code like `export let count = 3`
    // "import/no-named-as-default-member": "error", // forbid code like `import foo from './foo.js'; const bar = foo.bar;`
    "n/prefer-global/process": ["error", "never"],
    "n/prefer-global/buffer": ["error", "never"],
    // "n/no-sync": "error", // TODO enable it once we migrate to flat config. https://eslint.org/docs/latest/use/configure/configuration-files-new
    "unicorn/error-message": "error",
    "unicorn/no-instanceof-array": "error",
    "unicorn/no-new-array": "error",
    "unicorn/no-new-buffer": "error",
    "unicorn/no-typeof-undefined": "error",
    "unicorn/throw-new-error": "error",
    "unicorn/prefer-number-properties": "error",
    // 'unicorn/no-null': 'error', // null can be useful when interact with json.
    "prefer-exponentiation-operator": "error",
    "no-implicit-coercion": ["error", { disallowTemplateShorthand: true, allow: ["!!"] }], // forbid code like `const num = +str`;
    "no-invalid-this": "error",
    "no-plusplus": "error",
    "no-duplicate-imports": "error",

    "@zanminkian/import-regex": "error",
    "@zanminkian/no-dynamic-import": "error",
    "@zanminkian/no-legacy-getter-setter": "error",
    "@zanminkian/prefer-global-this": "error",
  },
};
