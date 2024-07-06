import { createSimpleRule, getRuleName } from "../utils.js";

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "`import()` should be called with string literal.",
  create: (context) => ({
    ImportExpression: (node) => {
      const { source, attributes } = node;
      if (source.type !== "Literal") {
        context.reportNode(node);
        return;
      }
      if (!("value" in source)) {
        context.reportNode(node);
        return;
      }
      if (typeof source.value !== "string") {
        context.reportNode(node);
        return;
      }
      if (attributes) {
        context.reportNode(node);
      }
    },
  }),
});
