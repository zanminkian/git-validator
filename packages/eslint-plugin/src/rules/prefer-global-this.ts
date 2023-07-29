import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'prefer-global-this'
export const messageId = 'preferGlobalThis'
export const defaultOptions = []

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow `global` or `self` object and prefer `globalThis`',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: 'Do not use `global` or `self` object. Use `globalThis` instead',
    },
  },
  defaultOptions,
  create: (context) => {
    const scope = context.getScope()
    return {
      Program: () => {
        const banned = ['global', 'self']
        // Report variables declared elsewhere
        scope.variables.forEach((v) => {
          if (banned.includes(v.name)) {
            v.references.forEach(ref => {
              context.report({
                node: ref.identifier,
                messageId,
              })
            })
          }
        })
        // Report variables not declared at all
        scope.through.forEach(ref => {
          if (banned.includes(ref.identifier.name)) {
            context.report({
              node: ref.identifier,
              messageId,
            })
          }
        })
      },
    }
  },
})
