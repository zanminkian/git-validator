import { createSimpleRule, getRuleName } from "../utils.js";

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "Disallow using property decorator. Consider adding `declare` keyword in front of the property to fix it.",
  create: (context) => ({
    PropertyDefinition: (node) => {
      if (node.parent.type !== "ClassBody") {
        return;
      }
      if (node.decorators.length > 0 && !node.declare) {
        context.reportNode(node);
      }
    },
  }),
});
