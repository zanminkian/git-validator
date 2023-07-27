import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-node-modules-when-import'
export const messageId = 'noNodeModulesWhenImport'
export const defaultOptions = []

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent importing modules in `node_modules` folder by relative or absolute path.',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: 'Do not import modules in `node_modules` folder by path.',
    },
  },
  defaultOptions,
  create: (context) => {
    return {
      ImportDeclaration: (node) => {
        if (node.source.value.includes('/node_modules/')) {
          context.report({
            node,
            messageId,
          })
        }
      },
      CallExpression: (node) => {
        if ('name' in node.callee && node.callee.name === 'require') {
          const arg = node.arguments[0]
          if (arg?.type === 'Literal' && typeof arg.value === 'string' && arg.value.includes('/node_modules/')) {
            context.report({
              node,
              messageId,
            })
          }
        }
      },
    }
  },
})
