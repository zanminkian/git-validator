import type { TSESTree } from "@typescript-eslint/utils";
import { createSimpleRule, getRuleName } from "../utils.js";

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using `declare` statement in ts file.",
  create: (context) => {
    const { filename } = context;
    if (/.*\.d\.[mc]?ts$/.test(filename)) {
      return {};
    }
    return {
      "[declare=true]": (node: TSESTree.Node) => {
        if (node.type === "PropertyDefinition") {
          return;
        }
        context.reportNode(node);
      },
    };
  },
});
