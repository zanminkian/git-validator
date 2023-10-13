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
      const isDefault = (p) => p.key.value === "default";
      const index = node.properties.findIndex(isDefault);
      if (index > -1 && index !== node.properties.length - 1) {
        return context.report({
          node: node.properties.find(isDefault),
          messageId,
        });
      }
    },
  }),
};
