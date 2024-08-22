import path from "node:path";
import process from "node:process";

export const name = "required-engines";
export const rule = {
  meta: {
    messages: {
      [name]: "`engines` field should be specified in the root package.json",
    },
  },
  create: (context) => {
    if (context.filename !== path.join(process.cwd(), "package.json")) {
      return {};
    }
    return {
      "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
        const engines = node.properties.find((p) => p.key.value === "engines");
        if (!engines) {
          return context.report({ node, messageId: name });
        }
        if (
          engines.value.type !== "ObjectExpression" ||
          engines.value.properties.length <= 0
        ) {
          return context.report({ node: engines, messageId: name });
        }
      },
    };
  },
};
