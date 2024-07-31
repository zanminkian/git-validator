import { createSimpleRule, getRuleName } from "../utils.js";

// This rule doesn't handle call/apply/bind cases, and their corresponding Reflect apis.
export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "When calling `reduce` or `reduceRight`, an initial value is required.",
  create: (context) => ({
    CallExpression: (node) => {
      if (
        node.callee.type === "MemberExpression" &&
        "name" in node.callee.property &&
        ["reduce", "reduceRight"].includes(node.callee.property.name) &&
        node.arguments.length < 2
      ) {
        context.reportNode(node.callee.property);
      }
    },
  }),
});
