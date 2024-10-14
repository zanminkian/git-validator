import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

export const noConstEnum = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using `const enum` expression.",
  create: (context) => ({
    "TSEnumDeclaration[const=true]": (node: Node) => {
      context.reportNode(node);
    },
  }),
});
