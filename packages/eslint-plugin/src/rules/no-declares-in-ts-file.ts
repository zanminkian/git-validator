import type { TSESTree } from "@typescript-eslint/utils";
import { createSimpleRule } from "../utils.js";

export default createSimpleRule({
  name: "no-declares-in-ts-file",
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
