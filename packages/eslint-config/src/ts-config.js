const process = require("node:process");
const fs = require("node:fs");
const path = require("node:path");
const baseConfig = require("./base-config");

const tsconfig = fs.existsSync(path.join(process.cwd(), "tsconfig.eslint.json"))
  ? "tsconfig.eslint.json"
  : fs.existsSync(path.join(process.cwd(), "tsconfig.json"))
  ? "tsconfig.json"
  : undefined;

function getTsRules() {
  const baseConfigCopied = JSON.parse(JSON.stringify(baseConfig));
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
  const builtinRuleKeys = allBuiltinRuleKeys.filter((key) => baseConfigCopied.rules[key]);
  const disabledRules = builtinRuleKeys.reduce((result, key) => ({ ...result, [key]: "off" }), {});
  const enabledRules = builtinRuleKeys.reduce(
    (result, key) => ({ ...result, [`@typescript-eslint/${key}`]: baseConfigCopied.rules[key] }),
    {},
  );
  enabledRules["@typescript-eslint/indent"][2].ignoredNodes.push(
    "FunctionExpression > .params[decorators.length > 0]",
    "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
    "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
  );
  // `const fun = (foo: never) => foo['bar']` will be formatted to `const fun = (foo: never) => foo.bar`.
  // it's incorrect in typescript. so turn it off.
  enabledRules["@typescript-eslint/dot-notation"] = "off";

  return {
    enabledRules,
    disabledRules,
  };
}

const { enabledRules, disabledRules } = tsconfig ? getTsRules() : {};
module.exports = {
  overrides: tsconfig
    ? [
        {
          files: ["*.ts", "*.cts", "*.mts", "*.tsx"],
          extends: ["./base-config"],
          plugins: ["@typescript-eslint"],
          parser: "@typescript-eslint/parser",
          parserOptions: {
            tsconfigRootDir: process.cwd(),
            project: [tsconfig],
          },
          rules: {
            ...disabledRules,
            ...enabledRules,
            "no-void": ["error", { allowAsStatement: true }],

            // ban some syntaxes to reduce mistakes
            "import/no-commonjs": [
              "error",
              { allowRequire: false, allowConditionalRequire: false, allowPrimitiveModules: false },
            ], // TODO move this rule to base. js file should not use commonjs too.
            "@typescript-eslint/ban-types": "error",
            "@typescript-eslint/method-signature-style": "error",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-namespace": "error",
            "@typescript-eslint/no-import-type-side-effects": "error",
            // '@typescript-eslint/consistent-type-imports': 'error',
          },
        },
      ]
    : [],
};
