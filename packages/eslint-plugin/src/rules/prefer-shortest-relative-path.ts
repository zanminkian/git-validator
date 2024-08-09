import path from "node:path";
import { create } from "../check-import.js";
import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Forbid redundant relative path when importing module.",
  create: (context) => create(context, check),
});

function check(filename: string, importedPath: string) {
  const currentPath = path.dirname(filename);
  if (!importedPath.startsWith("./") && !importedPath.startsWith("../")) {
    return false;
  }

  const absoluteImportedPath = path.resolve(currentPath, importedPath);
  // compatible with windows
  let resultPath = path
    .relative(currentPath, absoluteImportedPath)
    .replaceAll("\\", "/");
  if (!resultPath.startsWith("./") && !resultPath.startsWith("../")) {
    resultPath = `./${resultPath}`;
  }
  return resultPath !== importedPath;
}
