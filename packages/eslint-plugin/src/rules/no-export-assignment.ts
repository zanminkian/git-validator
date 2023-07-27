import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-export-assignment'
export const messageId = 'noExportAssignment'
export const defaultOptions = []

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow using `export =` statement.',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: 'Do not use `export =` statement. Use `export default` instead.',
    },
  },
  defaultOptions,
  create: (context) => {
    const extension = context.getFilename().split('.').pop()
    if (!['ts', 'tsx', 'mts', 'cts'].includes(extension ?? '')) {
      return {}
    }
    return {
      TSExportAssignment: (node) => {
        context.report({
          node,
          messageId,
        })
      },
    }
  },
})
