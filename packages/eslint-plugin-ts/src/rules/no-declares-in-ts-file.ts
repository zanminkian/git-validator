import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

export const noDeclaresInTsFile = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using `declare` statement in ts file.",
  schema: [
    {
      type: "object",
      properties: {
        ignorePropertyDefinition: { type: "boolean" },
      },
      additionalProperties: false,
    },
  ],
  create: (context) => {
    const { filename, options } = context;
    if (/.*\.d\.[mc]?ts$/.test(filename)) {
      return {};
    }
    return {
      "[declare=true]": (node: Node) => {
        if (
          options[0]?.ignorePropertyDefinition &&
          node.type === "PropertyDefinition"
        ) {
          return;
        }
        context.reportNode(node);
      },
    };
  },
});
