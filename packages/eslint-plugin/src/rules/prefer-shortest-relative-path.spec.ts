import { after, describe, it } from "node:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { messageId, rule, ruleName } from "./prefer-shortest-relative-path.js";

const valid = [
  'import xxx from "../a"',
  'import "../a"',
  'import("../a")',
  'require("../a")',
  'import xxx from "./a"',
  'import xxx from "a"',
  'import xxx from ".a"',
  'export * from "a"',
  'export * from "./a"',
  'export {a} from "a"',
  'export {a} from "./a"',
].map((code) => ({ code, filename: "/a/b/c/d/e.js" }));

const invalid = [
  'import xxx from ".././../a"',
  'import ".././../a"',
  'import(".././../a")',
  'require(".././../a")',
  'export * from ".././../a"',
  'export {a} from ".././../a"',

  'import xxx from "./../a"',
  'import "./../a"',
  'import("./../a")',
  'require("./../a")',
  'export * from "./../a"',
  'export {a} from "./../a"',

  'import "././foo"',
  'import "./../.././foo"',
  'require("./../.././foo")',
  'import("./../.././foo")',
  'export * from "./../.././foo"',
  'export {a} from "./../.././foo"',

  'import "./../foo"',
  'require("./../foo")',
  'import("./../foo")',
  'export * from "./../foo"',
  'export {a} from "./../foo"',
].map((code) => ({ code, filename: "/a/b/c/d/e.js" }));

RuleTester.afterAll = after;
RuleTester.describe = describe;
RuleTester.it = it;
new RuleTester({
  parser: "@typescript-eslint/parser",
}).run(ruleName, rule, {
  valid,
  invalid: invalid.map((i) => ({
    ...i,
    errors: [{ messageId }],
  })),
});
