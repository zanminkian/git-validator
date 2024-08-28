import type { TSESTree } from "@typescript-eslint/utils";
import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "Disallow using property decorator. Consider adding `declare` keyword in front of the property to fix it.",
  schema: [
    {
      type: "object",
      properties: {
        ignoreDeclaration: { type: "boolean" },
      },
      additionalProperties: false,
    },
  ],
  defaultOptions: [{ ignoreDeclaration: false }],
  create: (context) => ({
    "ClassBody > PropertyDefinition[decorators.length>0]": (
      node: TSESTree.Node,
    ) => {
      if (
        "declare" in node &&
        node.declare &&
        context.options[0]?.ignoreDeclaration
      ) {
        return;
      }
      context.reportNode(node);
    },
  }),
});
