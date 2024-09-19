import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

export const noExportAssignment = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using `export =` statement.",
  create: (context) => ({
    TSExportAssignment: (node: Node) => {
      context.reportNode(node);
    },
  }),
});
