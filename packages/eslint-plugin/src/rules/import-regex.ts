import { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

const defaultRegex = ["^.*/node_modules/.*$", "\\.d(\\.[mc]?[jt]s)?$", "^(\\.\\./){3,}"]
  .map((r) => `(${r})`)
  .join("|");

export const ruleName = "import-regex";
export const messageId = "importRegex";
export const defaultOptions: Array<string> = [];
const description = "Make the importing paths not match with the regex.";
const message = `The path should not match with the regex. Default regex is: ${defaultRegex}.`;
const schema: readonly JSONSchema4[] = [{ type: "string" }];

/**
 * @internal
 */
export const rule = ESLintUtils.RuleCreator((ruleName) => ruleName)<
  typeof defaultOptions,
  typeof messageId
>({
  name: ruleName,
  meta: {
    type: "problem",
    docs: {
      description,
      recommended: "recommended",
    },
    schema,
    messages: {
      [messageId]: message,
    },
  },
  defaultOptions,
  create: (context) => {
    const regex = new RegExp(context.options[0] ?? defaultRegex);
    return {
      ImportDeclaration: (node) => {
        if (node.source.value.match(regex)) {
          context.report({
            node,
            messageId,
          });
        }
      },
      ImportExpression: (node) => {
        if (
          "value" in node.source &&
          typeof node.source.value === "string" &&
          node.source.value.match(regex)
        ) {
          context.report({
            node,
            messageId,
          });
        }
      },
      CallExpression: (node) => {
        const arg = node.arguments[0];
        if (
          "name" in node.callee &&
          node.callee.name === "require" &&
          arg?.type === "Literal" &&
          typeof arg.value === "string" &&
          arg.value.match(regex)
        ) {
          context.report({
            node,
            messageId,
          });
        }
      },
    };
  },
});
