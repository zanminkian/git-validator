import childProcess from "node:child_process";
import path from "node:path";
import process from "node:process";
import { isNativeError } from "node:util/types";
import { create } from "../check-import.js";
import { createSimpleRule, getRuleName } from "../utils.js";

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow to import module from git-ignored path.",
  create: (context) => create(context, checkIgnored),
});

function checkIgnored(filePath: string, source: string) {
  // from node_modules
  if (
    !source.startsWith("./") &&
    !source.startsWith("../") &&
    !source.startsWith("/")
  ) {
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
  return isIgnored(absolutePath);
}

function isIgnored(filePath: string) {
  try {
    return (
      // eslint-disable-next-line n/no-sync
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
