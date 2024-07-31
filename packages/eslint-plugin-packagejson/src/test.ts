import { it } from "node:test";
import { type Rule, RuleTester } from "eslint";

const tester = new RuleTester({
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
});

export async function test({
  name,
  rule,
  valid,
  invalid,
}: {
  name: string;
  rule: Rule.RuleModule;
  valid: object[];
  invalid: object[];
}) {
  await it(name, () => {
    tester.run(name, rule, {
      valid: valid.map((code) => `export default ${JSON.stringify(code)}`),
      invalid: invalid.map((code) => ({
        code: `export default ${JSON.stringify(code)}`,
        errors: 1,
      })),
    });
  });
}
