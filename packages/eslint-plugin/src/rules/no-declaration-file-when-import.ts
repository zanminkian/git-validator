import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-declaration-file-when-import'
export const messageId = 'noDeclarationFileWhenImport'
export const defaultOptions = []

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent importing module which ends with `/\\.d(\\.[mc]?[jt]s)?$/`.',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: 'Do not import module which ends with `/\\.d(\\.[mc]?[jt]s)?$/`.',
    },
  },
  defaultOptions,
  create: (context) => {
    const regex = /\.d(\.[mc]?[jt]s)?$/
    return {
      ImportDeclaration: (node) => {
        if (node.source.value.match(regex)) {
          context.report({
            node,
            messageId,
          })
        }
      },
      ImportExpression: (node) => {
        if ('value' in node.source && typeof node.source.value === 'string' && node.source.value.match(regex)) {
          context.report({
            node,
            messageId,
          })
        }
      },
      CallExpression: (node) => {
        if ('name' in node.callee && node.callee.name === 'require') {
          const arg = node.arguments[0]
          if (arg?.type === 'Literal' && typeof arg.value === 'string' && arg.value.match(regex)) {
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
