import { getRootPackageJsonPath, isWorkspace } from "../common.js";

const isWP = await isWorkspace();
const rootPkgJsonPath = getRootPackageJsonPath();

export const name = "private-workspace-root";
export const rule = {
  meta: {
    messages: {
      [name]: "Workspace root package.json should be private",
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
              messageId: name,
            });
          }
          if (privateProperty.value.value !== true) {
            return context.report({
              node: privateProperty,
              messageId: name,
            });
          }
        }
      },
    };
  },
};
