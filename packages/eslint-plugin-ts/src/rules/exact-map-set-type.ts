import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using Map and Set without type arguments.",
  create: (context) => ({
    "Identifier[name=/^(Set|Map|WeakSet|WeakMap)$/][parent.type='NewExpression'][parent.arguments.length=0][parent.typeArguments=undefined]":
      (node) => {
        context.reportNode(node);
      },
    "Identifier[name=/^(Set|Map|WeakSet|WeakMap)$/][parent.type!='NewExpression'][parent.typeArguments=undefined]":
      (node) => {
        context.reportNode(node);
      },
  }),
});
