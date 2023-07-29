import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'file-extension'
export const messageId = 'fileExtension'
export const defaultOptions = []

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow invalid file extension',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: 'File is required a lowercase extension',
    },
  },
  defaultOptions,
  create: (context) => {
    if (/\.[a-z0-9_]+$/.test(context.getFilename())) {
      return {}
    }
    return {
      Program: (node) => {
        context.report({
          node,
          messageId,
        })
      },
    }
  },
})
