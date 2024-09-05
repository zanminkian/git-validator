import { createSimpleRule, getRuleName } from "../utils.js";

export const newParens = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "When invoking a constructor, parentheses are required.",
  create: (context) => ({
    NewExpression: (node) => {
      if (node.arguments.length > 0) {
        return;
      }
      const rightParenToken = context.sourceCode.getLastToken(node);
      if (!rightParenToken) {
        context.reportNode(node);
        return;
      }
      const leftParenToken = context.sourceCode.getTokenBefore(rightParenToken);
      if (!leftParenToken) {
        context.reportNode(node);
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
      context.reportNode(node);
    },
  }),
});
