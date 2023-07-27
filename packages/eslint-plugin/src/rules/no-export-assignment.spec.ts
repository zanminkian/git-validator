import { describe, it, after } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { ruleName, messageId } from './no-export-assignment'

const valid = [
  { code: 'export default {}', filename: 'test.ts' },
  { code: 'export = {}', filename: 'test.js' },
]

const invalid = [
  { code: 'export = {}', filename: 'test.ts' },
]

RuleTester.afterAll = after
RuleTester.describe = describe
RuleTester.it = it
new RuleTester({
  parser: '@typescript-eslint/parser',
}).run(ruleName, rule, {
  valid,
  invalid: invalid.map(i => ({
    ...i,
    errors: [{ messageId }],
  })),
})
