import { after, describe, it } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { messageId, ruleName } from './no-relative-parent-imports'

const valid = [
  'import foo from "../foo"',
  'import foo from "../../foo"',
  'import foo from "./../../foo"',
  'import "../../foo"',
  'import("../../foo")',
  'require("../../foo")',
]

const invalid = [
  'import "../../../foo"',
  'import foo from "../../../foo"',
  'import("../../../foo")',
  'const foo = await import("../../../foo")',
  'require("../../../foo")',
  'const foo = require("../../../foo")',
]

RuleTester.afterAll = after
RuleTester.describe = describe
RuleTester.it = it
new RuleTester({
  parser: '@typescript-eslint/parser',
}).run(ruleName, rule, {
  valid,
  invalid: invalid.map(i => ({
    code: i,
    errors: [{ messageId }],
  })),
})
