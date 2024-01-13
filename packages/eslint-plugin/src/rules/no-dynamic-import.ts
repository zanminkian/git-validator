import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "no-dynamic-import";
export const messageId = "noDynamicImport";
export const defaultOptions = [];
const description = "Forbid `import()` calls with expressions.";
const message = "`import()` should be called with string literal.";

export const rule = ESLintUtils.RuleCreator((name) => name)<
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
    schema: [],
    messages: {
      [messageId]: message,
    },
  },
  defaultOptions,
  create: (context) => ({
    ImportExpression: (node) => {
      const { source, attributes } = node;
      if (source.type !== "Literal") {
        context.report({ node, messageId });
        return;
      }
      if (!("value" in source)) {
        context.report({ node, messageId });
        return;
      }
      if (typeof source.value !== "string") {
        context.report({ node, messageId });
        return;
      }
      if (attributes) {
        context.report({ node, messageId });
      }
    },
  }),
});
