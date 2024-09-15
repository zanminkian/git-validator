export const name = "required-repository";
export const rule = {
  meta: {
    messages: {
      [name]: "`repository` field should be specified in a public package.json",
    },
    docs: {
      description:
        "`repository` field should be specified in a public package.json",
    },
  },
  create: (context) => ({
    "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
      if (
        node.properties.find((p) => p.key.value === "private")?.value?.value ===
        true
      ) {
        return;
      }
      const repositoryProperty = node.properties.find(
        (p) => p.key.value === "repository",
      );
      if (!repositoryProperty) {
        return context.report({
          node,
          messageId: name,
        });
      }
      if (
        (repositoryProperty.value.type === "ObjectExpression" &&
          repositoryProperty.value.properties.length === 0) ||
        (repositoryProperty.value.type === "Literal" &&
          !repositoryProperty.value.value)
      ) {
        return context.report({
          node: repositoryProperty,
          messageId: name,
        });
      }
    },
  }),
};
