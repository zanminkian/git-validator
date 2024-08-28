import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "Defining a variable with an empty array should annotate the array type",
  create: (context) => ({
    "VariableDeclarator:not([id.typeAnnotation]) > ArrayExpression.init[elements.length=0]":
      (node) => {
        context.reportNode(node);
      },
  }),
});
