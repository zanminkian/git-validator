// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import deprecationPlugin from "eslint-plugin-deprecation";
import jsConfig from "./js-config.js";

const tsconfig = await getProjectTsconfig();

async function getProjectTsconfig() {
  const tsconfigs = ["tsconfig.eslint.json", "tsconfig.json"];
  const index = (
    await Promise.all(
      tsconfigs.map(
        async (config) =>
          await fs
            .access(path.join(process.cwd(), config))
            .then(() => true)
            .catch(() => false),
      ),
    )
  ).findIndex(Boolean);
  return tsconfigs[index];
}

function getTsRules() {
  // https://typescript-eslint.io/rules/#extension-rules
  const allBuiltinRuleKeys = [
    "block-spacing",
    "brace-style",
    "class-methods-use-this",
    "comma-dangle",
    "comma-spacing",
    "default-param-last",
    "dot-notation",
    "func-call-spacing",
    "indent",
    "init-declarations",
    "key-spacing",
    "keyword-spacing",
    "lines-around-comment",
    "lines-between-class-members",
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
    "padding-line-between-statements",
    "quotes",
    "require-await",
    "return-await",
    "semi",
    "space-before-blocks",
    "space-before-function-paren",
    "space-infix-ops",
  ];
  const builtinRuleKeys = allBuiltinRuleKeys.filter(
    (key) => jsConfig.rules[key],
  );
  const disabledRules = builtinRuleKeys.reduce(
    (result, key) => ({ ...result, [key]: "off" }),
    {},
  );
  /**
   * @type {Record<string, any>}
   */
  const originRules = builtinRuleKeys.reduce(
    (result, key) => ({
      ...result,
      [`@typescript-eslint/${key}`]: JSON.parse(
        JSON.stringify(jsConfig.rules[key]),
      ),
    }),
    {},
  );
  originRules["@typescript-eslint/indent"][2].ignoredNodes.push(
    "FunctionExpression > .params[decorators.length > 0]",
    "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
    "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
  );

  return {
    ...disabledRules,
    ...originRules,
  };
}

function getStrictRules() {
  const strict = process.env["STRICT"] || process.env["ESLINT_STRICT"];
  if (!strict) {
    return {};
  }

  return {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      { assertionStyle: "never" },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
  };
}

export default !tsconfig
  ? []
  : [
      {
        ...jsConfig,
        files: ["ts", "cts", "mts", "tsx"].map((i) => `**/*.${i}`),
        languageOptions: {
          ...jsConfig.languageOptions,
          parser: tsParser, // TODO: Unfortunately parser cannot be a string. Eslint should support it. https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-a-custom-parser-and-its-options
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
          ...getTsRules(),

          // ban some syntaxes to reduce mistakes
          // deprecation
          "deprecation/deprecation": "error",
          // git-validator
          "@git-validator/no-const-enum": "error",
          "@git-validator/no-declares-in-ts-file": "error",
          "@git-validator/no-export-assignment": "error",
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
          "@typescript-eslint/consistent-type-assertions": [
            "error",
            {
              assertionStyle: "as",
              objectLiteralTypeAssertions: "allow-as-parameter",
            },
          ],
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
          "@typescript-eslint/no-duplicate-enum-values": "error",
          "@typescript-eslint/no-duplicate-type-constituents": "error",
          "@typescript-eslint/no-floating-promises": [
            "error",
            {
              ignoreVoid: false,
            },
          ],
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
          "@typescript-eslint/no-non-null-assertion": "warn",
          "@typescript-eslint/no-require-imports": "error",
          "@typescript-eslint/no-unnecessary-condition": "error",
          "@typescript-eslint/no-unnecessary-type-assertion": "error",
          "@typescript-eslint/prefer-ts-expect-error": "error",
          "@typescript-eslint/restrict-plus-operands": "error",
          "@typescript-eslint/return-await": ["error", "always"],
          "@typescript-eslint/unbound-method": "error",

          ...getStrictRules(),
        },
      },
      {
        // https://github.com/motemen/minimatch-cheat-sheet
        files: [
          "**/__tests__/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
          "**/*.{test,spec}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
        ],
        rules: {
          "@typescript-eslint/unbound-method": "off",
        },
      },
    ];
