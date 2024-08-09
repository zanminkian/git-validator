import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "Disallow using template string when it's unnecessary. Use normal literal string expression instead.",
  create: (context) => ({
    TemplateLiteral: (node) => {
      if (
        !node.loc ||
        (node.quasis.length === 1 &&
          node.expressions.length === 0 &&
          node.loc.start.line === node.loc.end.line)
      ) {
        context.reportNode(node);
      }
    },
  }),
});
