import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import deprecationPlugin from "eslint-plugin-deprecation";
import jsConfig from "./js-config.js";

const tsconfig = await getProjectTsconfig();

async function getProjectTsconfig() {
  const tsconfigs = [
    "tsconfig.eslint.json",
    "tsconfig.json",
    "tsconfig.build.json",
  ];
  const index = (
    await Promise.all(
      tsconfigs.map((config) =>
        fs
          .access(path.join(process.cwd(), config))
          .then(() => true)
          .catch(() => false),
      ),
    )
  ).findIndex(Boolean);
  return tsconfigs[index];
}

function getTsExtensionRules() {
  // https://typescript-eslint.io/rules/?=extension
  const extensionRuleKeys = [
    "block-spacing",
    "brace-style",
    "class-methods-use-this",
    "comma-dangle",
    "comma-spacing",
    "consistent-return",
    "default-param-last",
    "dot-notation",
    "func-call-spacing",
    "indent",
    "init-declarations",
    "key-spacing",
    "keyword-spacing",
    "lines-around-comment",
    "lines-between-class-members",
    "max-params",
    "no-array-constructor",
    "no-dupe-class-members",
    "no-empty-function",
    "no-extra-parens",
    "no-extra-semi",
    "no-implied-eval",
    "no-invalid-this",
    "no-loop-func",
    "no-loss-of-precision",
    "no-magic-numbers",
    "no-redeclare",
    "no-restricted-imports",
    "no-shadow",
    "no-throw-literal",
    "no-unused-expressions",
    "no-unused-vars",
    "no-use-before-define",
    "no-useless-constructor",
    "object-curly-spacing",
    "only-throw-error", // this rule based on 'eslint/no-throw-literal'
    "padding-line-between-statements",
    "prefer-destructuring",
    "prefer-promise-reject-errors",
    "quotes",
    "require-await",
    "return-await", // this rule based on 'eslint/no-return-await' instead of 'eslint/return-await'
    "semi",
    "space-before-blocks",
    "space-before-function-paren",
    "space-infix-ops",
  ] as const;
  type ExtensionRuleKey = (typeof extensionRuleKeys)[number];
  type JsConfigRuleKey = keyof typeof jsConfig.rules;

  type JsExtensionKey = Extract<ExtensionRuleKey, JsConfigRuleKey>; // Extract
  type TsExtensionKey = `@typescript-eslint/${JsExtensionKey}`;
  const isExtensionKey = (key: string): key is JsExtensionKey =>
    !!extensionRuleKeys.find((k) => k === key) &&
    Object.keys(jsConfig.rules).includes(key);

  const result: Partial<Record<JsExtensionKey | TsExtensionKey, unknown>> = {};
  for (const [jsRuleKey, jsRuleValue] of Object.entries(jsConfig.rules)) {
    if (isExtensionKey(jsRuleKey)) {
      result[jsRuleKey] = "off";
      result[`@typescript-eslint/${jsRuleKey}`] = jsRuleValue;
    }
  }
  // To fix the typescript indent, see https://github.com/mightyiam/eslint-config-standard-with-typescript/pull/1200

  return result;
}

function getStrictRules() {
  const config = {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      { assertionStyle: "never" },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
  } as const;
  type Result = Partial<Record<keyof typeof config, unknown>>;

  const emptyResult: Result = {};
  const fullResult: Result = config;
  if (process.env["STRICT"] || process.env["ESLINT_STRICT"]) {
    return fullResult;
  } else {
    return emptyResult;
  }
}

const mainConfig = {
  ...jsConfig,
  files: ["**/*.{ts,cts,mts,tsx}"],
  languageOptions: {
    ...jsConfig.languageOptions,
    parser: tsParser, // Unfortunately parser cannot be a string. Eslint should support it. https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-a-custom-parser-and-its-options
    parserOptions: {
      ...jsConfig.languageOptions.parserOptions,
      tsconfigRootDir: process.cwd(),
      project: tsconfig,
    },
  },
  plugins: {
    ...jsConfig.plugins,
    deprecation: deprecationPlugin,
    "@typescript-eslint": tsPlugin,
  },
  rules: {
    ...jsConfig.rules,
    ...getTsExtensionRules(),

    // ban some syntaxes to reduce mistakes
    // deprecation
    "deprecation/deprecation": "error",
    // git-validator
    "@git-validator/exact-map-set-type": "error",
    "@git-validator/no-const-enum": "error",
    "@git-validator/no-declares-in-ts-file": "error",
    "@git-validator/no-export-assignment": "error",
    "@git-validator/no-property-decorator": "error",
    // typescript
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": true,
        "ts-ignore": true,
        "ts-nocheck": true,
      },
    ],
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/consistent-generic-constructors": "error",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter",
      },
    ],
    "@typescript-eslint/consistent-type-exports": "error",
    // "@typescript-eslint/consistent-type-imports": "error,
    "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "variable",
        types: ["function"],
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "class",
        format: ["PascalCase"],
      },
    ],
    "@typescript-eslint/no-array-delete": "error",
    "@typescript-eslint/no-base-to-string": ["error", { ignoredTypeNames: [] }],
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreVoid: false,
      },
    ],
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          returns: false,
          arguments: false,
          variables: false,
        },
      },
    ],
    "@typescript-eslint/no-mixed-enums": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-template-expression": "error", // js also need this rule
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/only-throw-error": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/restrict-plus-operands": [
      "error",
      {
        // allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowNumberAndString: false,
        allowRegExp: false,
      },
    ],
    // "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/return-await": ["error", "always"],
    "@typescript-eslint/unbound-method": "error",

    ...getStrictRules(),
  },
};

const declarationConfig = {
  files: ["**/*.d.{ts,cts,mts,tsx}"],
  rules: {
    "@typescript-eslint/no-restricted-imports": "off",
  },
};

const testConfig = {
  // https://github.com/motemen/minimatch-cheat-sheet
  files: [
    "**/__tests__/**/*.{ts,cts,mts,tsx}",
    "**/*.{test,spec}.{ts,cts,mts,tsx}",
  ],
  rules: {
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/unbound-method": "off",
  },
};

const config: Array<
  typeof mainConfig | typeof declarationConfig | typeof testConfig
> = [mainConfig, declarationConfig, testConfig];
const empty: Array<
  typeof mainConfig | typeof declarationConfig | typeof testConfig
> = [];

export default tsconfig ? config : empty;
