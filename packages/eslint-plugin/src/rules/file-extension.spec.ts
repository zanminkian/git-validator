import { after, describe, it } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { messageId, ruleName } from './file-extension'

const valid = [
  { code: '', filename: 'foo.ts' },
  { code: '', filename: 'foo.js_0' },
]

const invalid = [
  { code: '', filename: 'foo' },
  { code: '', filename: 'foo.BAR' },
  { code: '', filename: 'foo.bar-0' },
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
