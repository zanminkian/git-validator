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
    PropertyDefinition: (node) => {
      if (node.parent.type !== "ClassBody") {
        return;
      }
      if (node.declare && context.options[0]?.ignoreDeclaration) {
        return;
      }
      if (node.decorators.length > 0) {
        context.reportNode(node);
      }
    },
  }),
});
