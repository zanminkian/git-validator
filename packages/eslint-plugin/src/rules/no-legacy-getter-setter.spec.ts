import { after, describe, it } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { messageId, ruleName } from './no-legacy-getter-setter'

const valid = ['const foo = {}; foo.__proto__;']

const invalid = [
  'const foo = {}; foo.__defineGetter__();',
  'const foo = {}; foo.__defineGetter__.bar;',
  'const foo = {}; foo.__defineGetter__ = "bar";',
  'const foo = {}; foo.__defineGetter__;',
  'const foo = {}; foo.__defineSetter__;',
  'const foo = {}; foo.__lookupGetter__;',
  'const foo = {}; foo.__lookupSetter__;',
]

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
