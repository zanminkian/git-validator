import path from "node:path";
import { createSimpleRule, getRuleName } from "../utils.js";

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Forbid redundant relative path when importing module.",
  create: (context) => {
    const currentPath = path.dirname(context.filename);
    return {
      ImportDeclaration: (node) => {
        report(currentPath, node.source.value, () => {
          context.reportNode(node);
        });
      },
      ImportExpression: (node) => {
        if ("value" in node.source && typeof node.source.value === "string") {
          report(currentPath, node.source.value, () => {
            context.reportNode(node);
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
            context.reportNode(node);
          });
        }
      },
      ExportAllDeclaration: (node) => {
        report(currentPath, node.source.value, () => {
          context.reportNode(node);
        });
      },
      ExportNamedDeclaration: (node) => {
        if (node.source) {
          report(currentPath, node.source.value, () => {
            context.reportNode(node);
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
  // compatible with windows
  let resultPath = path
    .relative(currentPath, absoluteImportedPath)
    .replaceAll("\\", "/");
  if (!resultPath.startsWith("./") && !resultPath.startsWith("../")) {
    resultPath = `./${resultPath}`;
  }
  if (resultPath !== importedPath) {
    cb();
  }
}
