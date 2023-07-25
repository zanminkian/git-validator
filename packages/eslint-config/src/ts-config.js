const process = require('node:process')
const fs = require('node:fs')
const path = require('node:path')
const standardConfigOrigin = require('./standard-config.json')

const standardConfig = JSON.parse(JSON.stringify(standardConfigOrigin))

const tsconfig = fs.existsSync(path.join(process.cwd(), 'tsconfig.eslint.json'))
  ? 'tsconfig.eslint.json'
  : fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))
    ? 'tsconfig.json'
    : undefined

// https://typescript-eslint.io/rules/#extension-rules
const allBuiltinRuleKeys = [
  'block-spacing',
  'brace-style',
  'class-methods-use-this',
  'comma-dangle',
  'comma-spacing',
  'default-param-last',
  'dot-notation',
  'func-call-spacing',
  'indent',
  'init-declarations',
  'key-spacing',
  'keyword-spacing',
  'lines-around-comment',
  'lines-between-class-members',
  'no-array-constructor',
  'no-dupe-class-members',
  'no-empty-function',
  'no-extra-parens',
  'no-extra-semi',
  'no-implied-eval',
  'no-invalid-this',
  'no-loop-func',
  'no-loss-of-precision',
  'no-magic-numbers',
  'no-redeclare',
  'no-restricted-imports',
  'no-shadow',
  'no-throw-literal',
  'no-unused-expressions',
  'no-unused-vars',
  'no-use-before-define',
  'no-useless-constructor',
  'object-curly-spacing',
  'padding-line-between-statements',
  'quotes',
  'require-await',
  'return-await',
  'semi',
  'space-before-blocks',
  'space-before-function-paren',
  'space-infix-ops',
]
const builtinRuleKeys = allBuiltinRuleKeys.filter((key) => standardConfig.rules[key])
const disabledRules = builtinRuleKeys.reduce((result, key) => ({ ...result, [key]: 'off' }), {})
const enabledRules = builtinRuleKeys.reduce((result, key) => ({ ...result, [`@typescript-eslint/${key}`]: standardConfig.rules[key] }), {})
enabledRules['@typescript-eslint/comma-dangle'] = ['error', 'always-multiline']
enabledRules['@typescript-eslint/brace-style'] = ['error', '1tbs', { allowSingleLine: false }]
enabledRules['@typescript-eslint/indent'][2].ignoredNodes.push(
  'FunctionExpression > .params[decorators.length > 0]',
  'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
  'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
)

module.exports = {
  overrides: tsconfig
    ? [
        {
          files: ['*.ts', '*.cts', '*.mts', '*.tsx'],
          extends: ['./js-config'],
          plugins: ['@typescript-eslint'],
          parser: '@typescript-eslint/parser',
          parserOptions: {
            tsconfigRootDir: process.cwd(),
            project: [tsconfig],
          },
          rules: {
            ...disabledRules,
            ...enabledRules,

            'no-void': ['error', { allowAsStatement: true }],
          },
        },
      ]
    : [],
}
