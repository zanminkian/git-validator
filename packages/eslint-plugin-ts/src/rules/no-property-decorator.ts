import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

export const noPropertyDecorator = createSimpleRule({
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
  create: (context) => ({
    "ClassBody > PropertyDefinition[decorators.length>0]": (node: Node) => {
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
