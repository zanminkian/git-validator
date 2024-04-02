import { getRootPackageJsonPath } from "../common.js";

const messageId = "requiredEngines";
const message = "`engines` field should be specified in the root package.json";

export default {
  meta: {
    messages: {
      [messageId]: message,
    },
  },
  create: (context) => {
    const filename = context.getFilename();
    if (filename !== getRootPackageJsonPath()) {
      return {};
    }
    return {
      "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
        const engines = node.properties.find((p) => p.key.value === "engines");
        if (!engines) {
          return context.report({ node, messageId });
        }
        if (
          engines.value.type !== "ObjectExpression" ||
          engines.value.properties.length <= 0
        ) {
          return context.report({ node: engines, messageId });
        }
      },
    };
  },
};
