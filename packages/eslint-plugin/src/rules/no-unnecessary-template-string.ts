import { createSimpleRule, getRuleName } from "../utils.js";

// TODO deprecate this rule if https://github.com/sindresorhus/eslint-plugin-unicorn/issues/71 is implemented.
export const noUnnecessaryTemplateString = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "Disallow using template string when it's unnecessary. Use normal literal string expression instead.",
  create: (context) => ({
    TemplateLiteral: (node) => {
      if (
        node.quasis.length === 1 &&
        node.expressions.length === 0 &&
        node.loc?.start.line === node.loc?.end.line
      ) {
        context.reportNode(node);
      }
    },
  }),
});
