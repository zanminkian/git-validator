import { createSimpleRule, getRuleName } from "../utils.js";

export const noRenameExports = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow renaming the named-exports.",
  create: (context) => ({
    ExportSpecifier: (node) => {
      if (node.exported.name !== node.local.name) {
        context.reportNode(node);
      }
    },
  }),
});
