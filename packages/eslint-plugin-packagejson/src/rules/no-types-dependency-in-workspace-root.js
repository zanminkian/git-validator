import { getRootPackageJsonPath, isWorkspace } from "../common.js";

const isWP = await isWorkspace();
const rootPkgJsonPath = getRootPackageJsonPath();

export const name = "no-types-dependency-in-workspace-root";
export const rule = {
  meta: {
    messages: {
      [name]: "Should not install '@types/*' in workspace root",
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
              messageId: name,
            });
          });
      },
    };
  },
};
