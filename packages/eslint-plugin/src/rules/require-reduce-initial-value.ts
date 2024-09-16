import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

// This rule doesn't handle call/apply/bind cases, and their corresponding Reflect apis.
export const requireReduceInitialValue = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "When calling `reduce` or `reduceRight`, an initial value is required.",
  create: (context) => ({
    "CallExpression[callee.type='MemberExpression'][callee.property.name=/^(reduce|reduceRight)$/][arguments.length=1]":
      (node: Node) => {
        context.reportNode(node);
      },
  }),
});
