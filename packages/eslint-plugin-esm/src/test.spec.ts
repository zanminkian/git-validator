import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { RuleTester, type Rule } from "eslint";
import { outdent } from "outdent";

export type TestCase = string | { code: string; filename?: string };

const tester = new RuleTester({
  parser: createRequire(import.meta.url).resolve("@typescript-eslint/parser"),
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

    await genDoc({ name, rule, valid, invalid });
  });
}

async function genDoc({
  name,
  rule,
  valid,
  invalid,
}: {
  name: string;
  rule: Rule.RuleModule;
  valid: TestCase[];
  invalid: TestCase[];
}) {
  const handle = (testCases: TestCase[]) =>
    testCases
      .map((testCase) =>
        typeof testCase === "string" ? { code: testCase } : testCase,
      )
      .map((testCase) =>
        testCase.filename
          ? `${testCase.code} // filename: ${testCase.filename}`
          : testCase.code,
      )
      .join("\n");
  const mdContent = outdent`
    # ${name}
    ${rule.meta?.docs?.description}
    ## Rule Details
    ### Fail
    \`\`\`ts
    ${handle(invalid)}
    \`\`\`
    ### Pass
    \`\`\`ts
    ${handle(valid)}
    \`\`\`
  `.replaceAll(process.cwd(), "/foo");

  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  await fs.writeFile(
    path.join(currentDir, "..", "doc", "rules", `${name}.md`),
    mdContent,
  );
}
