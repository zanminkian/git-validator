import { getRootPackageJsonPath, isWorkspace } from "../common.js";

const messageId = "privateWorkspaceRoot";
const message = "Workspace root package.json should be private";

const isWP = await isWorkspace();
const rootPkgJsonPath = getRootPackageJsonPath();

export default {
  meta: {
    messages: {
      [messageId]: message,
    },
  },
  create: (context) => {
    const filename = context.getFilename();
    return {
      "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
        if (isWP && filename === rootPkgJsonPath) {
          const privateProperty = node.properties.find(
            (p) => p.key.value === "private",
          );
          if (!privateProperty) {
            return context.report({
              node,
              messageId,
            });
          }
          if (privateProperty.value.value !== true) {
            return context.report({
              node: privateProperty,
              messageId,
            });
          }
        }
      },
    };
  },
};
