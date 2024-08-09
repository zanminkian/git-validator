import type { Rule } from "eslint";
import type { Context } from "./utils.js";

export const create = (
  context: Context,
  check: (filename: string, source: string) => boolean,
): Rule.RuleListener => ({
  ImportDeclaration: (node) => {
    if (
      typeof node.source.value !== "string" ||
      check(context.filename, node.source.value)
    ) {
      context.reportNode(node.source);
    }
  },
  ImportExpression: (node) => {
    if (
      "value" in node.source &&
      typeof node.source.value === "string" &&
      check(context.filename, node.source.value)
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
      check(context.filename, arg.value)
    ) {
      context.reportNode(arg);
    }
  },
  ExportAllDeclaration: (node) => {
    if (
      typeof node.source.value !== "string" ||
      check(context.filename, node.source.value)
    ) {
      context.reportNode(node.source);
    }
  },
  ExportNamedDeclaration: (node) => {
    if (!node.source) {
      return;
    }
    if (
      typeof node.source.value !== "string" ||
      check(context.filename, node.source.value)
    ) {
      context.reportNode(node.source);
    }
  },
});

export function isRelativeImport(source: string) {
  return (
    source.startsWith("/") ||
    source.startsWith("./") ||
    source.startsWith("../") ||
    source === "." ||
    source === ".."
  );
}
