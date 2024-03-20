import semver from "semver";

const messageId = "exactDependencyVersion";
const message = "Dependency is expected an exact version";

function isExactVersion(version) {
  if (!version) {
    return false;
  }
  if (version.startsWith("workspace:")) {
    return true;
  }
  return semver.valid(version) === version;
}

export default {
  meta: {
    messages: {
      [messageId]: message,
    },
  },
  create: (context) => ({
    "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
      node.properties
        .filter((p) =>
          ["dependencies", "devDependencies"].includes(p.key.value),
        )
        .flatMap((n) => n.value.properties)
        .filter((property) => !isExactVersion(property.value.value))
        .forEach((property) => {
          context.report({
            node: property.value,
            messageId,
          });
        });
    },
  }),
};
