import { createSimpleRule, getRuleName } from "../utils.js";

export const noRenameImports = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow renaming the named-imports.",
  create: (context) => ({
    ImportSpecifier: (node) => {
      if (node.imported.name !== node.local.name) {
        context.reportNode(node);
      }
    },
  }),
});
