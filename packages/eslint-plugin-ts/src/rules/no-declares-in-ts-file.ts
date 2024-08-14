import type { TSESTree } from "@typescript-eslint/utils";
import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
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
  defaultOptions: [{ ignorePropertyDefinition: false }],
  create: (context) => {
    const { filename, options } = context;
    if (/.*\.d\.[mc]?ts$/.test(filename)) {
      return {};
    }
    return {
      "[declare=true]": (node: TSESTree.Node) => {
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
