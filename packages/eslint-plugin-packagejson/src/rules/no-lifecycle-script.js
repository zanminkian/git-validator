export const name = "no-lifecycle-script";
export const rule = {
  meta: {
    messages: {
      [name]:
        "Using lifecycle script in public npm package is considered a bad practice. You should expose a cli entrance. Users who need it will invoke it manually",
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
      node.properties
        .find((p) => p.key?.value === "scripts")
        ?.value?.properties?.forEach((property) => {
          const invalid = [
            "preinstall",
            "install",
            "postinstall",
            "preuninstall",
            "uninstall",
            "postuninstall",
          ];
          if (invalid.includes(property.key.value)) {
            context.report({ node: property.key, messageId: name });
          }
        });
    },
  }),
};
