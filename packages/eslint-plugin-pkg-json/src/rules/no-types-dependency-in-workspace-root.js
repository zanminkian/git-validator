import { isWorkspaceRootPkg } from "../common.js";

export const name = "no-types-dependency-in-workspace-root";
export const rule = {
  meta: {
    messages: {
      [name]: "Should not install `@types/*` in workspace root",
    },
    docs: {
      description: "Should not install `@types/*` in workspace root",
    },
  },
  create: (context) => {
    // only check workspace root package.json
    if (!isWorkspaceRootPkg(context.filename)) {
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
