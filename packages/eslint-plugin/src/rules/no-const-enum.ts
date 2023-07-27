import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-const-enum'
export const messageId = 'noConstEnum'
export const defaultOptions = []

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow using `const enum` expression.',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: 'Do not use `const enum` expression.',
    },
  },
  defaultOptions,
  create: (context) => {
    return {
      TSEnumDeclaration: (node) => {
        if (node.const) {
          context.report({
            node,
            messageId,
          })
        }
      },
    }
  },
})
