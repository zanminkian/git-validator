import path from "node:path";
import { create, createRule, getRuleName, getSourceType } from "../common.js";

export const nearestRelativePath = createRule({
  name: getRuleName(import.meta.url),
  message: "The relative source path should be a nearest relative path.",
  create: (context) => create(context, check),
});

function check(filename: string, importedPath: string) {
  if (getSourceType(importedPath) !== "local" || importedPath.startsWith("/")) {
    return false;
  }
  const currentPath = path.dirname(filename);
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
