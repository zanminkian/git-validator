import { after, describe, it } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { messageId, ruleName } from './import-regex'

const valid = [
  'import xxx from "a"',
  'import xxx from "a.d.tjs"',
  'import "b"',
  'const c = require("c")',
  'require("d")',
  'import("e")',

  'import xxx from "a"',
  'import "b"',
  'const c = require("c")',
  'require("d")',
  'import("e")',

  'import foo from "../foo"',
  'import foo from "../../foo"',
  'import "../../foo"',
  'import("../../foo")',
  'require("../../foo")',

  'import "./foo"',
  'require("./foo")',
  'import("./foo")',
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

  'import a from "../node_modules/a"',
  'import "../node_modules/b"',
  'const c = require("../node_modules/c")',
  'require("../node_modules/d")',
  'import("../node_modules/e")',

  'import "../../../foo"',
  'import foo from "../../../foo"',
  'import("../../../foo")',
  'const foo = await import("../../../foo")',
  'require("../../../foo")',
  'const foo = require("../../../foo")',

  'import "././foo"',
  'import "./../.././foo"',
  'require("./../.././foo")',
  'import("./../.././foo")',

  'import "./../foo"',
  'require("./../foo")',
  'import("./../foo")',
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
