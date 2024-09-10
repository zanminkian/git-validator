import childProcess from "node:child_process";
import path from "node:path";
import process from "node:process";
import { isNativeError } from "node:util/types";
import { create, isRelativeImport } from "../check-import.js";
import { createSimpleRule, getRuleName } from "../utils.js";

export const noGitIgnoredImports = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow to import module from git-ignored path.",
  create: (context) => create(context, checkIgnored),
});

function checkIgnored(filePath: string, source: string) {
  // from node_modules
  if (!isRelativeImport(source)) {
    return false;
  }
  // out side of project root
  if (source.startsWith("/") && !source.startsWith(process.cwd())) {
    return true;
  }
  // This file of absolutePath may be a symbolic link
  const absolutePath = path.resolve(path.dirname(filePath), source);
  if (!absolutePath.startsWith("/")) {
    throw new Error(
      `ESLint plugin internal error. Absolute path incorrect: ${absolutePath}.`,
    );
  }
  return isIgnoredByCache(absolutePath);
}

const cache = new Map<string, boolean>();
function isIgnoredByCache(filePath: string) {
  const result = cache.get(filePath);
  if (result !== undefined) {
    return result;
  }
  const ignored = isIgnored(filePath);
  cache.set(filePath, ignored);
  return ignored;
}

function isIgnored(filePath: string) {
  try {
    return (
      childProcess
        .execSync(`git check-ignore ${filePath}`, { encoding: "utf8" })
        .trim() === filePath
    );
  } catch (e) {
    if (
      isNativeError(e) &&
      "stdout" in e &&
      e.stdout === "" &&
      "stderr" in e &&
      e.stderr === ""
    ) {
      return false;
    }
    // We cannot throw an error here. So we have to return true to report the filePath is bad.
    return true;
  }
}
