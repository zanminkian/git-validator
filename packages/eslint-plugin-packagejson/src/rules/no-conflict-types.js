export const name = "no-conflict-types";
export const rule = {
  meta: {
    messages: {
      [name]:
        "'@types/web' and '@types/node' should not appear in the same package.json",
    },
  },
  create: (context) => ({
    "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
      const dependencies = node.properties
        .filter((p) =>
          ["dependencies", "devDependencies"].includes(p.key.value),
        )
        .flatMap((n) => n.value.properties)
        .filter((property) =>
          ["@types/web", "@types/node"].includes(property.key.value),
        );
      if (dependencies.length > 1) {
        dependencies.forEach((dependency) => {
          context.report({
            node: dependency.key,
            messageId: name,
          });
        });
      }
    },
  }),
};
