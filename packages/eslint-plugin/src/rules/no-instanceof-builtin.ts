import { createSimpleRule, getRuleName } from "../utils.js";

export const noInstanceofBuiltin = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Right hand of `instanceof` can't be a builtin class.",
  create: (context) => {
    let builtins = new Set<string>();
    return {
      Program: (node) => {
        builtins = new Set(
          context.sourceCode.getScope(node).variables.map((v) => v.name),
        );
      },
      BinaryExpression: (node) => {
        if (
          node.operator !== "instanceof" ||
          node.right.type !== "Identifier"
        ) {
          return;
        }

        if (builtins.has(node.right.name)) {
          context.reportNode(node.right);
        }
      },
    };
  },
});
