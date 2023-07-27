import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-declares-in-ts-file'
export const messageId = 'noDeclaresInTsFile'
export const defaultOptions = []

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow using `declare` statement in ts file.',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: 'Do not use `declare` statement in ts file.',
    },
  },
  defaultOptions,
  create: (context) => {
    const filename = context.getFilename()
    if (/.*\.d\.[mc]?ts$/.test(filename)) {
      return {}
    }
    return {
      '[declare=true]': (node) => {
        context.report({
          node,
          messageId,
        })
      },
    }
  },
})
