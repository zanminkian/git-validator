import { after, describe, it } from "node:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { messageId, rule, ruleName } from "./no-declares-in-ts-file.js";

const codes = [
  "declare class A {}",

  "declare var A: number = 123",
  "declare let A: number = 123",
  "declare const A: number = 123",
  "declare function A(a: string): any",
  "declare enum A{A1,A2}",
  "declare namespace A{}",
  "declare type A = {}",
  "declare interface A{}",
  "declare global { var a: string }",
  "declare module 'moment' { export function foo(): string }",
];

const invalid = codes.map((code) => ({ code, filename: "foo.ts" }));
const valid = codes
  .map((code) => ({ code, filename: "foo.d.ts" }))
  .concat(
    [
      "class A { declare name: string }",
      "class A { declare getName: () => string }",
      "class A { private declare name: string }",
      "class A { declare private name: string }",
    ].map((code) => ({
      code,
      filename: "foo.ts",
    })),
  );

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
