import { after, describe, it } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { messageId, ruleName } from './no-const-enum'

const valid = ['enum E {}']

const invalid = ['const enum E {}']

RuleTester.afterAll = after
RuleTester.describe = describe
RuleTester.it = it
new RuleTester({
  parser: '@typescript-eslint/parser',
}).run(ruleName, rule, {
  valid,
  invalid: invalid.map((i) => ({
    code: i,
    errors: [{ messageId }],
  })),
})
