import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-legacy-getter-setter'
export const messageId = 'noLegacyGetterSetter'
export const defaultOptions = []

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow using legacy getter and setter.',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      [messageId]: 'Do not use legacy getter and setter. Use `Object.defineProperty` or `Object.getOwnPropertyDescriptor` instead.',
    },
  },
  defaultOptions,
  create: (context) => {
    return {
      '[property.name=/^__(define|lookup)[GS]etter__$/]': (node) => {
        context.report({
          node,
          messageId,
        })
      },
    }
  },
})
