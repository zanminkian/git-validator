import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "`import()` should be called with string literal.",
  create: (context) => ({
    "ImportExpression > :not(Literal)": (node: Node) => {
      context.reportNode(node);
    },
    "ImportExpression > Literal[raw=/^[^'\"].*[^'\"]$/]": (node: Node) => {
      context.reportNode(node);
    },
  }),
});
