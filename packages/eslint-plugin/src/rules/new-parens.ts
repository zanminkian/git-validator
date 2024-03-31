import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "new-parens";
export const messageId = "newParens";
export const defaultOptions = [];
const description =
  "Enforce parentheses when invoking a constructor with no arguments.";
const message = "Missing '()' invoking a constructor.";

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
    NewExpression: (node) => {
      if (node.arguments.length > 0) {
        return;
      }
      const rightParenToken = context.sourceCode.getLastToken(node);
      if (!rightParenToken) {
        context.report({ node, messageId });
        return;
      }
      const leftParenToken = context.sourceCode.getTokenBefore(rightParenToken);
      if (!leftParenToken) {
        context.report({ node, messageId });
        return;
      }
      if (
        rightParenToken.type === "Punctuator" &&
        rightParenToken.value === ")" &&
        leftParenToken.type === "Punctuator" &&
        leftParenToken.value === "("
      ) {
        return;
      }
      context.report({ node, messageId });
    },
  }),
});
