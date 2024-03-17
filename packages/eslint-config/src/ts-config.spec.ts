import assert from "node:assert";
import { describe, it } from "node:test";
import configs from "../dist/ts-config.js";

await describe("ts config", async () => {
  await it("ts config value should be error", () => {
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
    ];
    configs.forEach((config, configIndex) => {
      Object.entries(config.rules).forEach(([key, value]) => {
        if (extensionRuleKeys.includes(key)) {
          assert.strictEqual(
            value,
            "off",
            `extension rule ${key} should be turned off`,
          );
        } else if (
          configIndex === 1 &&
          key === "@typescript-eslint/unbound-method"
        ) {
          assert.strictEqual(
            value,
            "off",
            `rule ${key} should be turned off in the 2nd config`,
          );
        } else if (typeof value === "string") {
          assert.strictEqual(
            value,
            "error",
            `rule ${key} should be error when value is string`,
          );
        } else if (Array.isArray(value)) {
          assert.strictEqual(
            value[0],
            "error",
            `rule ${key} should be error when value is array`,
          );
        } else {
          throw new Error("value should be string or array");
        }
      });
    });
  });
});
