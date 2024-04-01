import { createSimpleRule } from "../utils.js";

export default createSimpleRule({
  name: "exact-map-set-type",
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
