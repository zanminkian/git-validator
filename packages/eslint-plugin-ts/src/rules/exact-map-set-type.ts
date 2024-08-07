import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using Map and Set without type arguments.",
  create: (context) => ({
    Identifier: (node) => {
      if (!["Map", "Set"].includes(node.name)) {
        return;
      }
      const { parent } = node;
      if (parent.type === "NewExpression" && parent.arguments.length > 0) {
        return;
      }
      if (
        "typeArguments" in parent &&
        (parent.typeArguments?.params.length ?? 0) === 0
      ) {
        context.reportNode(node);
      }
    },
  }),
});
