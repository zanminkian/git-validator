const messageId = "topTypes";
const message = "'types' field in exports must be on the top";

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
      const isTypes = (p) => p.key.value === "types";
      const index = node.properties.findIndex(isTypes);
      if (index > 0) {
        return context.report({
          node: node.properties.find(isTypes),
          messageId,
        });
      }
    },
  }),
};
