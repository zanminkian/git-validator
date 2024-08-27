import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {
  create,
  isRelativeImport,
  type ImportationNode,
} from "../check-import.js";
import { createSimpleRule, getRuleName } from "../utils.js";

function isObject(value: unknown) {
  return value !== null && typeof value === "object";
}

function isFile(filePath: string) {
  try {
    // eslint-disable-next-line n/no-sync
    return fs.statSync(filePath).isFile();
  } catch (e) {
    return false;
  }
}

const cache = new Map<string, { path: string; content: object } | undefined>(); // key is dir, value is package.json
function getPkgJson(
  dir: string,
): { path: string; content: object } | undefined {
  if (cache.has(dir)) {
    return cache.get(dir);
  }
  const pkgJsonPath = path.join(dir, "package.json");
  if (isFile(pkgJsonPath)) {
    // eslint-disable-next-line n/no-sync
    const content: unknown = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
    const result = isObject(content)
      ? { path: pkgJsonPath, content }
      : undefined;
    cache.set(dir, result);
    return result;
  }

  // if it is a directory
  if (dir === process.cwd() || dir === "/") {
    // stop here
    cache.set(dir, undefined);
    return undefined;
  }

  return getPkgJson(path.join(dir, ".."));
}

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "The nearest `package.json` doesn't have such dependency.",
  create: (context) => create(context, check),
});

function check(filename: string, source: string, node: ImportationNode) {
  // ignore `import type {foo} from 'foo'`
  if ("importKind" in node && node.importKind === "type") {
    return false;
  }
  // ignore `import {foo} from './'`
  if (isRelativeImport(source) || source.startsWith("node:")) {
    return false;
  }
  const pkgJson = getPkgJson(path.dirname(filename));
  // cannot find package.json file
  if (!pkgJson) {
    return true;
  }
  const dep =
    "dependencies" in pkgJson.content && isObject(pkgJson.content.dependencies)
      ? pkgJson.content.dependencies
      : {};
  const devDep =
    "devDependencies" in pkgJson.content &&
    isObject(pkgJson.content.devDependencies)
      ? pkgJson.content.devDependencies
      : {};

  const moduleName = source
    .split("/")
    .slice(0, source.startsWith("@") ? 2 : 1)
    .join("/");
  if (["test", "spec"].includes(filename.split(".").at(-2) ?? "")) {
    return !(moduleName in dep || moduleName in devDep);
  }
  return !(moduleName in dep);
}
