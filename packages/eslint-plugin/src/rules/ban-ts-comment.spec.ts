import { after, describe, it } from "node:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { messageId, rule, ruleName } from "./ban-ts-comment.js";

const directives = ["@ts-ignore", "@ts-expect-error", "@ts-nocheck"];

const valid = directives
  .map((d) => [
    "//",
    "/**/",
    `// '${d}'`,
    `// "${d}"`,
    `// "${d}" '${d}'`,
    `/** '${d}' */`,
    `/** "${d}" */`,
  ])
  .flat();

const invalid = directives
  .map((d) => [`// ${d}`, `/* ${d} */`, `/** ${d} "${d}" */`])
  .flat();

RuleTester.afterAll = after;
RuleTester.describe = describe;
RuleTester.it = it;
new RuleTester({
  parser: "@typescript-eslint/parser",
}).run(ruleName, rule, {
  valid,
  invalid: invalid.map((i) => ({
    code: i,
    errors: [{ messageId }],
  })),
});
