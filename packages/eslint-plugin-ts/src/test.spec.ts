import { after, describe, it } from "node:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import type { RuleModule } from "@typescript-eslint/utils/ts-eslint";

export type TestCase =
  | string
  | { code: string; filename: string; options?: unknown[] };
export interface Info {
  valid: TestCase[];
  invalid: TestCase[];
  name: string;
  rule: RuleModule<string, unknown[]>;
  messageId?: string;
}

export function test(info: Info): void {
  const { name, rule, valid, invalid, messageId = name } = info;

  RuleTester.afterAll = after;
  RuleTester.describe = (...args) => {
    describe(...args).catch((e) => {
      throw e;
    });
  };
  RuleTester.it = (...args) => {
    it(...args).catch((e) => {
      throw e;
    });
  };
  new RuleTester({
    parser: "@typescript-eslint/parser",
  }).run(name, rule, {
    valid,
    invalid: invalid.map((i) => ({
      ...(typeof i === "string" ? { code: i } : i),
      errors: [{ messageId }],
    })),
  });
}
