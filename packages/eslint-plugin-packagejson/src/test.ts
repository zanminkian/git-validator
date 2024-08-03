import { describe, it } from "node:test";
import { RuleTester, type Rule } from "eslint";

const tester = new RuleTester({
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
});

export async function test({
  name,
  rule,
  valid,
  invalid,
  errors = 1,
}: {
  name: string;
  rule: Rule.RuleModule;
  valid: object[];
  invalid: object[];
  errors?: number;
}) {
  await describe(name, async () => {
    await Promise.all(
      valid
        .map((json) => JSON.stringify(json))
        .map(async (jsonStr) => {
          await it(jsonStr, () => {
            tester.run(name, rule, {
              valid: [`export default ${jsonStr}`],
              invalid: [],
            });
          });
        }),
    );

    await Promise.all(
      invalid
        .map((json) => JSON.stringify(json))
        .map(async (jsonStr) => {
          await it(jsonStr, () => {
            tester.run(name, rule, {
              valid: [],
              invalid: [{ code: `export default ${jsonStr}`, errors }],
            });
          });
        }),
    );
  });
}
