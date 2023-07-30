import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-node-modules-when-import'
export const messageId = 'noNodeModulesWhenImport'
export const defaultOptions = []
const description = 'Prevent importing modules in `node_modules` folder by relative or absolute path.'
const message = 'Do not import modules in `node_modules` folder by path.'

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description,
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: message,
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
      ImportExpression: (node) => {
        if ('value' in node.source && typeof node.source.value === 'string' && node.source.value.includes('/node_modules/')) {
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
