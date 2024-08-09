import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "`import()` should be called with string literal.",
  create: (context) => ({
    ImportExpression: (node) => {
      if (node.source.type !== "Literal") {
        context.reportNode(node);
        return;
      }
      if (!("value" in node.source)) {
        context.reportNode(node);
        return;
      }
      if (typeof node.source.value !== "string") {
        context.reportNode(node);
        return;
      }
      if ("attributes" in node && node.attributes) {
        context.reportNode(node);
      }
    },
  }),
});
