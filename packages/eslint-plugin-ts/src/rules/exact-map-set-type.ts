import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

export const exactMapSetType = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using Map and Set without type arguments.",
  create: (context) => {
    const selectors = [
      // new Set();
      "Identifier[name=/^(Set|Map|WeakSet|WeakMap)$/][parent.type='NewExpression'][parent.arguments.length=0][parent.typeArguments=undefined]",
      // class Foo {foo: Set}
      "Identifier[name=/^(Set|Map|WeakSet|WeakMap)$/][parent.type!='NewExpression'][parent.typeArguments=undefined]",
    ];
    return {
      [`:matches(${selectors.join(", ")})`]: (node: Node) => {
        context.reportNode(node);
      },
    };
  },
});
