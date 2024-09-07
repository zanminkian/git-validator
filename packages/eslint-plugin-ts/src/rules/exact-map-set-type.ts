import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

export const exactMapSetType = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using Map and Set without type arguments.",
  create: (context) => ({
    "Identifier[name=/^(Set|Map|WeakSet|WeakMap)$/][parent.type='NewExpression'][parent.arguments.length=0][parent.typeArguments=undefined]":
      (node: Node) => {
        context.reportNode(node);
      },
    "Identifier[name=/^(Set|Map|WeakSet|WeakMap)$/][parent.type!='NewExpression'][parent.typeArguments=undefined]":
      (node: Node) => {
        context.reportNode(node);
      },
  }),
});
