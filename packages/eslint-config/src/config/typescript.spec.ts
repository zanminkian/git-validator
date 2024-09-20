import assert from "node:assert";
import { describe, it } from "node:test";
import { typescript } from "./typescript.js";

await describe("ts config", async () => {
  await it("ts main config rules values should be error", () => {
    Object.entries(typescript()[0].rules).forEach(([key, value]) => {
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
        // "no-loss-of-precision",
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
      ];
      if (extensionRuleKeys.includes(key)) {
        assert.strictEqual(getValueString(value), "off");
      } else {
        assert.strictEqual(getValueString(value), "error");
      }
    });
  });

  await it("ts rest configs rules should exist in main rules", () => {
    const [main, ...restConfigs] = typescript();
    restConfigs.forEach((restConfig) => {
      Object.entries(restConfig.rules).forEach(([key, value]) => {
        assert.strictEqual(key in main.rules, true);
        assert.notDeepStrictEqual(value, Reflect.get(main.rules, key));
      });
    });
  });
});

function getValueString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  } else if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  } else {
    throw new Error("unknown value");
  }
}
