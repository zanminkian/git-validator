import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "no-for-in";
export const messageId = "noForIn";
export const defaultOptions = [];
const description = "Disallow using for-in statement.";
const message = "Do not use for-in statement.";

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
    ForInStatement: (node) => {
      context.report({ node, messageId });
    },
  }),
});
