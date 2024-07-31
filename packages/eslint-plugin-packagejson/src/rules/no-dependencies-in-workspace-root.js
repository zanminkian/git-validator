import { getRootPackageJsonPath, isWorkspace } from "../common.js";

const isWP = await isWorkspace();
const rootPkgJsonPath = getRootPackageJsonPath();

export const name = "no-dependencies-in-workspace-root";
export const rule = {
  meta: {
    messages: {
      [name]: "Should not install packages into dependencies in workspace root",
    },
  },
  create: (context) => {
    const filename = context.getFilename();
    if (!isWP || filename !== rootPkgJsonPath) {
      return {};
    }
    return {
      "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
        const depsNode = node.properties.find(
          (p) => p.key.value === "dependencies",
        );
        if (depsNode) {
          return context.report({
            node: depsNode,
            messageId: name,
          });
        }
      },
    };
  },
};
