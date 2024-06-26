import { getRootPackageJsonPath, isWorkspace } from "../common.js";

const messageId = "noDependenciesInWorkspaceRoot";
const message =
  "Should not install packages into dependencies in workspace root";

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
            messageId,
          });
        }
      },
    };
  },
};
