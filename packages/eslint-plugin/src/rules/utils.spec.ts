import { describe, it } from "node:test";
import { RuleTester, type Rule } from "eslint";

export type TestCase = string | { code: string; filename: string };

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
  valid: TestCase[];
  invalid: TestCase[];
  errors?: number;
}) {
  await describe(name, async () => {
    await Promise.all(
      valid.map(async (testCase) => {
        await it(JSON.stringify(testCase), () => {
          tester.run(name, rule, {
            valid: [testCase],
            invalid: [],
          });
        });
      }),
    );

    await Promise.all(
      invalid.map(async (testCase) => {
        await it(JSON.stringify(testCase), () => {
          const code = typeof testCase === "string" ? testCase : testCase.code;
          const filename =
            typeof testCase === "string" ? undefined : testCase.filename;
          tester.run(name, rule, {
            valid: [],
            invalid: [{ code, errors, filename }],
          });
        });
      }),
    );
  });
}
