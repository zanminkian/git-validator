import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "no-const-enum";
export const messageId = "noConstEnum";
export const defaultOptions = [];
const description = "Disallow using `const enum` expression.";
const message = "Do not use `const enum` expression.";

export const rule = ESLintUtils.RuleCreator((name) => name)<
  typeof defaultOptions,
  typeof messageId
>({
  name: ruleName,
  meta: {
    type: "problem",
    docs: {
      description,
    },
    schema: [],
    messages: {
      [messageId]: message,
    },
  },
  defaultOptions,
  create: (context) => ({
    TSEnumDeclaration: (node) => {
      if (node.const) {
        context.report({
          node,
          messageId,
        });
      }
    },
  }),
});
