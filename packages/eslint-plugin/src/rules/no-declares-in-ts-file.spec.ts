import { after, describe, it } from 'node:test'
import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { messageId, ruleName } from './no-declares-in-ts-file'

const codes = [
  'declare class A {}',
  'class A { declare name: string }',
  'class A { declare getName: () => string }',

  'declare var A: number = 123',
  'declare let A: number = 123',
  'declare const A: number = 123',
  'declare function A(a: string): any',
  'declare enum A{A1,A2}',
  'declare namespace A{}',
  'declare type A = {}',
  'declare interface A{}',
  'declare global { var a: string }',
  'declare module \'moment\' { export function foo(): string }',
]

const invalid = codes.map(code => ({ code, filename: 'foo.ts' }))
const valid = codes.map(code => ({ code, filename: 'foo.d.ts' }))

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
