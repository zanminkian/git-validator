import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "Defining a variable with an empty array should annotate the array type",
  create: (context) => ({
    VariableDeclaration: (node) => {
      node.declarations.forEach((declaration) => {
        const { init, id } = declaration;
        if (init?.type !== "ArrayExpression") {
          return;
        }
        if (init.elements.length > 0) {
          return;
        }
        if (id.typeAnnotation) {
          return;
        }
        context.reportNode(declaration);
      });
    },
  }),
});
