import { createSimpleRule } from "../utils.js";

export default createSimpleRule({
  name: "no-relative-parent-imports",
  message: "Disallow to import module from relative parent path too deeply.",
  create: (context) => ({
    ImportDeclaration: (node) => {
      if (checkDepth(node.source.value)) {
        context.reportNode(node.source);
      }
    },
    ImportExpression: (node) => {
      if (
        "value" in node.source &&
        typeof node.source.value === "string" &&
        checkDepth(node.source.value)
      ) {
        context.reportNode(node.source);
      }
    },
    CallExpression: (node) => {
      const arg = node.arguments[0];
      if (
        "name" in node.callee &&
        node.callee.name === "require" &&
        arg?.type === "Literal" &&
        typeof arg.value === "string" &&
        checkDepth(arg.value)
      ) {
        context.reportNode(arg);
      }
    },
  }),
});

function checkDepth(source: string, depth = 3) {
  return new RegExp(`^(\\.\\./){${depth},}`).test(source);
}
