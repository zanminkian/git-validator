import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-export-assignment'
export const messageId = 'noExportAssignment'
export const defaultOptions = []
const description = 'Disallow using `export =` statement.'
const message = 'Do not use `export =` statement. Use `export default` instead.'

export default ESLintUtils.RuleCreator((ruleName) => ruleName)<typeof defaultOptions, typeof messageId>({
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
