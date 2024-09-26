export const name = "bottom-default";
export const rule = {
  meta: {
    messages: {
      [name]: "`default` field must be on the bottom of an object",
    },
    docs: {
      description: "`default` field must be on the bottom of an object",
    },
  },
  create: (context) => ({
    "Program > ExpressionStatement ObjectExpression": (node) => {
      if (node.parent.type === "ExpressionStatement") {
        return;
      }
      const index = node.properties.findIndex((p) => p.key.value === "default");
      if (index > -1 && index !== node.properties.length - 1) {
        return context.report({
          node: node.properties[index],
          messageId: name,
        });
      }
    },
  }),
};
