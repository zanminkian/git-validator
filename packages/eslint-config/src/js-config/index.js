// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const standardConfig = JSON.parse(
  await fs.readFile(path.join(dirname, "standard-config.json"), "utf8"),
);

export default {
  files: ["js", "cjs", "mjs", "jsx"].map((i) => `**/*.${i}`),
  rules: {
    ...standardConfig.rules,
    // override standard config rules
    "dot-notation": "off", // conflict when enabling ts-check so turn it off

    // code style for a better readability
    "arrow-body-style": ["error", "as-needed"],
    "import/newline-after-import": ["error", { count: 1 }],
    "simple-import-sort/imports": [
      "error",
      { groups: [["^\\u0000", "^node:", "^@?\\w", "^", "^\\."]] },
    ],
    "simple-import-sort/exports": "error",
    "unicorn/prefer-node-protocol": "error",
    "unicorn/escape-case": "error", // '\ud834' -> '\uD834'
    // "unicorn/number-literal-case": "error", // 0XFF -> 0xFF // conflict with prettier

    // ban some syntaxes to reduce mistakes
    "promise/param-names": [
      "error",
      { resolvePattern: "^_?res(olve)?$", rejectPattern: "^_?rej(ect)?$" },
    ],
    "import/no-commonjs": [
      "error",
      {
        allowRequire: false,
        allowConditionalRequire: false,
        allowPrimitiveModules: false,
      },
    ],
    "import/no-self-import": "error",
    "import/no-dynamic-require": "error",
    "import/no-relative-packages": "error", // forbid to import module from other monorepo packages by relative paths
    "import/no-mutable-exports": "error", // forbid code like `export let count = 3`
    // "import/no-named-as-default-member": "error", // forbid code like `import foo from './foo.js'; const bar = foo.bar;`
    "n/prefer-global/process": ["error", "never"],
    "n/prefer-global/buffer": ["error", "never"],
    "n/no-sync": "error",
    "unicorn/error-message": "error",
    "unicorn/no-instanceof-array": "error",
    "unicorn/no-new-array": "error",
    "unicorn/no-new-buffer": "error",
    "unicorn/no-typeof-undefined": "error",
    "unicorn/prefer-module": "error",
    "unicorn/prefer-number-properties": "error",
    "unicorn/throw-new-error": "error",
    // 'unicorn/no-null': 'error', // null can be useful when interact with json.
    "func-name-matching": "error",
    "no-implicit-coercion": [
      "error",
      { disallowTemplateShorthand: true, allow: ["!!"] },
    ], // forbid code like `const num = +str`;
    "no-invalid-this": "error",
    "no-plusplus": "error",
    "no-duplicate-imports": "error",
    "no-shadow": ["error", { ignoreOnInitialization: true }],
    "no-unused-private-class-members": "error",
    "prefer-exponentiation-operator": "error",

    // react
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",

    "@git-validator/import-regex": "error",
    "@git-validator/no-dynamic-import": "error",
    "@git-validator/no-legacy-getter-setter": "error",
    "@git-validator/prefer-global-this": "error",
    "@git-validator/prefer-shortest-relative-path": "error",
  },
};
