import { after, describe, it } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { messageId, ruleName } from './no-declaration-file-when-import'

const valid = [
  'import xxx from "a"',
  'import xxx from "a.d.tjs"',
  'import "b"',
  'const c = require("c")',
  'require("d")',
  'import("e")',
]

const invalid = [
  'import a from "a.d"',
  'import a from "./a.d"',
  'import a from "a.d.ts"',
  'import a from "./a.d.ts"',
  'import a from "./a.d.js"',
  'import a from "./a.d.cjs"',
  'import a from "./a.d.cts"',
  'const a = await import("./a.d")',
  'const c = require("./a.d")',
  'require("./a.d")',
  'import("./a.d")',
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
