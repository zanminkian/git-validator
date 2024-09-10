import fs from "node:fs";
import path from "node:path";
import { create, isRelativeImport } from "../check-import.js";
import { createSimpleRule, getRuleName } from "../utils.js";

export const noDirectoryImports = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow importing from a directory.",
  create: (context) => create(context, check),
});

function check(filename: string, source: string) {
  if (!isRelativeImport(source)) {
    return false;
  }
  if (source.endsWith(".") || source.endsWith("./")) {
    return true;
  }
  const absolutePath = path.resolve(path.dirname(filename), source);
  if (!absolutePath.startsWith("/")) {
    throw new Error(
      `ESLint plugin internal error. Absolute path incorrect: ${absolutePath}.`,
    );
  }
  return isDirByCache(absolutePath);
}

const cache = new Map<string, boolean>();
function isDirByCache(filePath: string) {
  const result = cache.get(filePath);
  if (result !== undefined) {
    return result;
  }
  const isDirectory = isDir(filePath);
  cache.set(filePath, isDirectory);
  return isDirectory;
}

function isDir(filePath: string) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (e) {
    return false;
  }
}
