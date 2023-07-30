import { after, describe, it } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { messageId, ruleName } from './no-node-modules-when-import'

const valid = [
  'import xxx from "a"',
  'import "b"',
  'const c = require("c")',
  'require("d")',
  'import("e")',
]

const invalid = [
  'import a from "../node_modules/a"',
  'import "../node_modules/b"',
  'const c = require("../node_modules/c")',
  'require("../node_modules/d")',
  'import("../node_modules/e")',
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
