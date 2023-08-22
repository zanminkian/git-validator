import { after, describe, it } from "node:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule, { messageId, ruleName } from "./no-dynamic-import";

const valid = [
  'import("foo")',
  'import("./foo")',
  'await import("foo")',
  'const foo = await import("foo")',
];

const invalid = [
  // 'import()',
  // 'await import()',
  "import(123)",
  "await import(123)",
  "import(`foo`)",
  "import(foo)",
  "const foo = await import(foo)",
  "import(foo, {})",
  'import("foo", {})',
];

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
