import { after, describe, it } from "node:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule, { messageId, ruleName } from "./prefer-global-this";

const valid = [
  "foo.name",
  "foo.fun()",
  "foo.age = 12",
  'const foo = {global: "bar"}',
  'const foo = {self: "bar"}',
  'const foo = {bar: "bar"}',
  "console.log(foo)",
  "console.log(foo.foo)",
];

const invalid = [
  "global.name",
  "global.fun()",
  "global.age = 12",
  "const foo = {global}",
  "const foo = {bar: global}",
  "const foo = {bar: global.bar}",
  "console.log(global)",
  "console.log(global.foo)",
  // 'const global = {}; console.log(global)',

  "self.name",
  "self.fun()",
  "self.age = 12",
  "const foo = {self}",
  "const foo = {bar: self}",
  "const foo = {bar: self.bar}",
  "console.log(self)",
  "console.log(self.foo)",
  // 'const self = {}; console.log(self)',
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
