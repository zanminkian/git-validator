import { getRootPackageJsonPath, isWorkspace } from "../common.js";

const messageId = "noTypesDependencyInWorkspaceRoot";
const message = "Should not install '@types/*' in workspace root";

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
        node.properties
          .filter((p) =>
            ["dependencies", "devDependencies"].includes(p.key.value),
          )
          .flatMap((n) => n.value.properties)
          .filter((property) => property.key.value.startsWith("@types/"))
          .forEach((property) => {
            context.report({
              node: property.key,
              messageId,
            });
          });
      },
    };
  },
};
