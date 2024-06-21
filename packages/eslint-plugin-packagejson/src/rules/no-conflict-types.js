const messageId = "noConflictTypes";
const message =
  "'@types/web' and '@types/node' should not appear in the same package.json";

export default {
  meta: {
    messages: {
      [messageId]: message,
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
            messageId,
          });
        });
      }
    },
  }),
};
