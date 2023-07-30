import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleName = 'no-legacy-getter-setter'
export const messageId = 'noLegacyGetterSetter'
export const defaultOptions = []
const description = 'Disallow using legacy getter and setter.'
const message = 'Do not use legacy getter and setter. Use `Object.defineProperty` or `Object.getOwnPropertyDescriptor` instead.'

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
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
