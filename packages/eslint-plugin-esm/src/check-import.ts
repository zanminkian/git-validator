import type { Rule } from "eslint";
import type {
  ExportAllDeclaration,
  ExportNamedDeclaration,
  ImportDeclaration,
  ImportExpression,
} from "estree";
import type { Context } from "./utils.js";

export type ImportationNode =
  | ImportDeclaration
  | ImportExpression
  | ExportAllDeclaration
  | ExportNamedDeclaration;

type CheckFunc = (
  filename: string,
  source: string,
  node: ImportationNode,
) => boolean;

export const create = (
  context: Context,
  check: CheckFunc,
): Rule.RuleListener => ({
  ImportDeclaration: (node) => {
    handle(context, node, check);
  },
  ImportExpression: (node) => {
    handle(context, node, check);
  },
  ExportAllDeclaration: (node) => {
    handle(context, node, check);
  },
  ExportNamedDeclaration: (node) => {
    handle(context, node, check);
  },
});

function handle(context: Context, node: ImportationNode, check: CheckFunc) {
  if (!node.source) return;
  if (!("value" in node.source)) return;
  if (typeof node.source.value !== "string") return;
  if (check(context.filename, node.source.value, node))
    context.reportNode(node.source);
}

export function isRelativeImport(source: string) {
  return (
    source.startsWith("/") ||
    source.startsWith("./") ||
    source.startsWith("../") ||
    source === "." ||
    source === ".."
  );
}
