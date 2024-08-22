import { isWorkspaceRootPkg } from "../common.js";

export const name = "no-dependencies-in-workspace-root";
export const rule = {
  meta: {
    messages: {
      [name]: "Should not install packages into dependencies in workspace root",
    },
  },
  create: (context) => {
    // only check workspace root package.json
    if (!isWorkspaceRootPkg(context.filename)) {
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
