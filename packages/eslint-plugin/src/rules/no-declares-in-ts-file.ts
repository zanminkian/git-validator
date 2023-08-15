import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-declares-in-ts-file'
export const messageId = 'noDeclaresInTsFile'
export const defaultOptions = []
const description = 'Disallow using `declare` statement in ts file.'
const message = 'Do not use `declare` statement in ts file.'

/**
 * @internal
 */
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
    const filename = context.getFilename()
    if (/.*\.d\.[mc]?ts$/.test(filename)) {
      return {}
    }
    return {
      '[declare=true]': (node) => {
        if (node['type'] === 'PropertyDefinition') {
          return
        }
        context.report({
          node,
          messageId,
        })
      },
    }
  },
})
