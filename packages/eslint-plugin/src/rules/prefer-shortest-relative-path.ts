import path from "node:path";
import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "prefer-shortest-relative-path";
export const messageId = "preferShortestRelativePath";
export const defaultOptions = [];
const description = "Forbid redundant relative path when importing module.";
const message = "The imported relative path can be shorter.";

export const rule = ESLintUtils.RuleCreator((ruleName) => ruleName)<
  typeof defaultOptions,
  typeof messageId
>({
  name: ruleName,
  meta: {
    type: "problem",
    docs: {
      description,
      recommended: "recommended",
    },
    schema: [],
    messages: {
      [messageId]: message,
    },
  },
  defaultOptions,
  create: (context) => {
    const currentPath = path.dirname(context.getFilename());
    return {
      ImportDeclaration: (node) => {
        report(currentPath, node.source.value, () => {
          context.report({
            node,
            messageId,
          });
        });
      },
      ImportExpression: (node) => {
        if ("value" in node.source && typeof node.source.value === "string") {
          report(currentPath, node.source.value, () => {
            context.report({
              node,
              messageId,
            });
          });
        }
      },
      CallExpression: (node) => {
        const arg = node.arguments[0];
        if (
          "name" in node.callee &&
          node.callee.name === "require" &&
          arg?.type === "Literal" &&
          typeof arg.value === "string"
        ) {
          report(currentPath, arg.value, () => {
            context.report({
              node,
              messageId,
            });
          });
        }
      },
    };
  },
});

function report(currentPath: string, importedPath: string, cb: () => void) {
  if (!importedPath.startsWith("./") && !importedPath.startsWith("../")) {
    return;
  }

  const absoluteImportedPath = path.resolve(currentPath, importedPath);
  let resultPath = path.relative(currentPath, absoluteImportedPath);
  if (!resultPath.startsWith("./") && !resultPath.startsWith("../")) {
    resultPath = `./${resultPath}`;
  }
  if (resultPath !== importedPath) {
    cb();
  }
}
