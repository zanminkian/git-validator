import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-dynamic-import'
export const messageId = 'noDynamicImport'
export const defaultOptions = []

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid `import()` calls with expressions.',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: '`import()` should be called with string literal.',
    },
  },
  defaultOptions,
  create: (context) => {
    return {
      ImportExpression: (node) => {
        const { source, attributes } = node
        if (source.type !== 'Literal') {
          context.report({ node, messageId })
          return
        }
        if (!('value' in source)) {
          context.report({ node, messageId })
          return
        }
        if (typeof source.value !== 'string') {
          context.report({ node, messageId })
          return
        }
        if (attributes) {
          context.report({ node, messageId })
        }
      },
    }
  },
})
