const messageId = "exactDependencyVersion";
const message = "Dependency is expected an exact version";

function valid(version) {
  // https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
  return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(
    version,
  );
}

function isExactVersion(version) {
  if (!version) {
    return false;
  }
  if (version.startsWith("workspace:")) {
    return version === "workspace:*";
  }
  return valid(version);
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
