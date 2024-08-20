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
  valid: (object | { code: object; filename: string })[];
  invalid: (object | { code: object; filename: string })[];
  errors?: number;
}) {
  await describe(name, async () => {
    await Promise.all(
      valid
        .map((item) =>
          "code" in item && "filename" in item
            ? {
                code: `export default ${JSON.stringify(item.code)}`,
                filename: item.filename,
              }
            : { code: `export default ${JSON.stringify(item)}` },
        )
        .map(async (item) => {
          await it(item.code, () => {
            tester.run(name, rule, {
              valid: [item],
              invalid: [],
            });
          });
        }),
    );

    await Promise.all(
      invalid
        .map((item) =>
          "code" in item && "filename" in item
            ? {
                code: `export default ${JSON.stringify(item.code)}`,
                filename: item.filename,
              }
            : { code: `export default ${JSON.stringify(item)}` },
        )
        .map(async (item) => {
          await it(item.code, () => {
            tester.run(name, rule, {
              valid: [],
              invalid: [{ ...item, errors }],
            });
          });
        }),
    );
  });
}
