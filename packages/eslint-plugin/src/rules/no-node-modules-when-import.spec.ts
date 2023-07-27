import { describe, it, after } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { ruleName, messageId } from './no-node-modules-when-import'

const valid = [
  'import xxx from "a"',
  'import "b"',
  'const c = require("c")',
  'require("d")',
]

const invalid = [
  'import a from "../node_modules/a"',
  'import "../node_modules/b"',
  'const c = require("../node_modules/c")',
  'require("../node_modules/d")',
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
