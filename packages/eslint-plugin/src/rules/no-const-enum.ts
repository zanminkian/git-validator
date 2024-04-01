import { createSimpleRule } from "../utils.js";

export default createSimpleRule({
  name: "no-const-enum",
  message: "Disallow using `const enum` expression.",
  create: (context) => ({
    TSEnumDeclaration: (node) => {
      if (node.const) {
        context.reportNode(node);
      }
    },
  }),
});
