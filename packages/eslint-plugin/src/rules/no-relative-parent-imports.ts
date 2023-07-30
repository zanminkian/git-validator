import { ESLintUtils } from '@typescript-eslint/utils'
import type { JSONSchema4 } from '@typescript-eslint/utils/json-schema'

export const ruleName = 'no-relative-parent-imports'
export const messageId = 'noRelativeParentImports'
export const defaultOptions: Array<{ depth: number }> = []
const description = 'Prevent importing module via too-deep relative parent path.'
const message = 'Do not import module via too-deep relative parent path.'
const schema: readonly JSONSchema4[] = [
  {
    type: 'object',
    additionalProperties: false,
    properties: {
      depth: {
        type: 'number',
      },
    },
    required: ['depth'],
  },
]

export default ESLintUtils.RuleCreator(ruleName => ruleName)<typeof defaultOptions, typeof messageId>({
  name: ruleName,
  meta: {
    type: 'problem',
    docs: {
      description,
      recommended: 'recommended',
    },
    schema,
    messages: {
      [messageId]: message,
    },
  },
  defaultOptions,
  create: (context) => {
    const { depth } = {
      depth: 2,
      ...context.options[0],
    }
    const regex = new RegExp(`^(\\.\\/)*(\\.\\.\\/){${depth + 1},}(\\.\\/)*`)
    return {
      ImportDeclaration: (node) => {
        if (node.source.value.match(regex)) {
          context.report({
            node,
            messageId,
          })
        }
      },
      ImportExpression: (node) => {
        if ('value' in node.source && typeof node.source.value === 'string' && node.source.value.match(regex)) {
          context.report({
            node,
            messageId,
          })
        }
      },
      CallExpression: (node) => {
        if ('name' in node.callee && node.callee.name === 'require') {
          const arg = node.arguments[0]
          if (arg?.type === 'Literal' && typeof arg.value === 'string' && arg.value.match(regex)) {
            context.report({
              node,
              messageId,
            })
          }
        }
      },
    }
  },
})
