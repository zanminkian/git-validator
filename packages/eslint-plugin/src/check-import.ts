import type { Rule } from "eslint";
import type {
  CallExpression,
  ExportAllDeclaration,
  ExportNamedDeclaration,
  ImportDeclaration,
  ImportExpression,
} from "estree";
import type { Context } from "./utils.js";

export type ImportationNode =
  | ImportDeclaration
  | ImportExpression
  | CallExpression
  | ExportAllDeclaration
  | ExportNamedDeclaration;

export const create = (
  context: Context,
  check: (filename: string, source: string, node: ImportationNode) => boolean,
): Rule.RuleListener => ({
  ImportDeclaration: (node) => {
    if (
      typeof node.source.value !== "string" ||
      check(context.filename, node.source.value, node)
    ) {
      context.reportNode(node.source);
    }
  },
  ImportExpression: (node) => {
    if (
      "value" in node.source &&
      typeof node.source.value === "string" &&
      check(context.filename, node.source.value, node)
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
      check(context.filename, arg.value, node)
    ) {
      context.reportNode(arg);
    }
  },
  ExportAllDeclaration: (node) => {
    if (
      typeof node.source.value !== "string" ||
      check(context.filename, node.source.value, node)
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
      check(context.filename, node.source.value, node)
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
