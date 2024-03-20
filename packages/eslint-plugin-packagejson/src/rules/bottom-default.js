const messageId = "bottomDefault";
const message = "'default' field must be on the bottom";

export default {
  meta: {
    messages: {
      [messageId]: message,
    },
  },
  create: (context) => ({
    "Program > ExportDefaultDeclaration ObjectExpression": (node) => {
      if (node.parent.type === "ExportDefaultDeclaration") {
        return;
      }
      const index = node.properties.findIndex((p) => p.key.value === "default");
      if (index > -1 && index !== node.properties.length - 1) {
        return context.report({
          node: node.properties[index],
          messageId,
        });
      }
    },
  }),
};
