// @ts-check
// TODO move this logic to another package
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";
import { minimatch } from "minimatch";

/**
 * @param {string} file
 */
function isTs(file) {
  return /\.(ts|mts|cts|tsx)$/.test(file);
}

/**
 * @param {string} file
 */
function isJs(file) {
  return /\.(js|mjs|cjs|jsx)$/.test(file);
}

/**
 * @param {string} filepath ts or js file absolute path
 */
async function getAnalysis(filepath) {
  const code = await fs.readFile(filepath, "utf-8");
  const result = {
    anyTypes: 0,
    assertions: 0,
    nonNullAssertions: 0,
    renamedImports: 0,
    importExpressions: 0,
    nodeProtocolImports: 0,
    metaProperties: 0,
    codeLines: code.split("\n").length,
  };

  /**
   * @param {any} node
   */
  function walk(node) {
    if (!(node instanceof Object)) {
      return;
    }
    switch (node.type) {
      case "TSAnyKeyword":
        result.anyTypes += 1;
        break;
      case "TSAsExpression":
      case "TSTypeAssertion":
        if (node.typeAnnotation.typeName?.name === "const") {
          break;
        }
        result.assertions += 1;
        break;
      case "TSNonNullExpression":
        result.nonNullAssertions += 1;
        break;
      case "ImportDeclaration":
        result.renamedImports += node.specifiers
          .filter((/** @type {any} */ s) => s.type === "ImportSpecifier")
          .filter(
            (/** @type {any} */ s) => s.imported.name !== s.local.name,
          ).length;
        if (node.source.value.startsWith("node:")) {
          result.nodeProtocolImports += 1;
        }
        break;
      case "ImportExpression":
        result.importExpressions += 1;
        if (node.source.value?.startsWith("node:")) {
          result.nodeProtocolImports += 1;
        }
        break;
      case "VariableDeclarator":
        if (
          node.id.type === "ObjectPattern" &&
          node.init?.type === "AwaitExpression" &&
          node.init?.argument.type === "ImportExpression"
        ) {
          result.renamedImports += node.id.properties.filter(
            (/** @type {any} */ p) => p.key.name !== p.value.name,
          ).length;
        }
        break;
      case "MetaProperty":
        if (node.meta.name === "import" && node.property.name === "meta") {
          result.metaProperties += 1;
        }
        break;
    }
    Object.values(node).forEach(walk);
  }

  // this package require typescript as its peer dependencies
  const { parse } = await import("@typescript-eslint/typescript-estree").catch(
    (e) => {
      throw new Error(
        "Importing `@typescript-eslint/typescript-estree` fail! Please make sure that typescript has been installed or npm config `legacy-peer-deps` is disabled.",
        { cause: e },
      );
    },
  );
  walk(parse(code, { jsx: filepath.endsWith("x") || filepath.endsWith("js") }));
  return result;
}

/**
 * @param {string} dir absolute directory path
 * @param {string[]} ignorePatterns
 * @param {(file: string)=>Promise<void>} cb
 */
async function walkDir(dir, ignorePatterns, cb) {
  /**
   * @type {(filepath: string)=>boolean}
   */
  const ignoreDir = (filepath) =>
    filepath.includes(`${path.sep}.git${path.sep}`) ||
    filepath.includes(`${path.sep}node_modules${path.sep}`) ||
    ignorePatterns.some((pattern) => minimatch(filepath, pattern));

  /**
   * @type {(filepath: string)=>boolean}
   */
  const ignoreFile = (filepath) =>
    (!isTs(filepath) && !isJs(filepath)) || ignoreDir(filepath);

  const promises = (await fs.readdir(dir))
    .map((filepath) => path.resolve(dir, filepath))
    .map(async (filepath) => {
      if ((await fs.stat(filepath)).isDirectory()) {
        if (!ignoreDir(filepath)) {
          await walkDir(filepath, ignorePatterns, cb);
        }
      } else {
        if (!ignoreFile(filepath)) {
          await cb(filepath);
        }
      }
    });
  await Promise.all(promises);
}

export async function analyze(dir = process.cwd()) {
  dir = path.resolve(process.cwd(), dir);
  const ignores = (
    await fs.readFile(path.resolve(dir, ".gitignore"), "utf-8").catch(() => "")
  )
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean)
    .filter((i) => !i.startsWith("#"))
    .map(gitignoreToMinimatch);

  const result = {
    anyTypes: 0,
    assertions: 0,
    nonNullAssertions: 0,
    renamedImports: 0,
    importExpressions: 0,
    nodeProtocolImports: 0,
    metaProperties: 0,
    codeLines: 0,
    tsFiles: 0,
    jsFiles: 0,
    analyzedFiles: 0,
  };

  await walkDir(dir, ignores, async (file) => {
    try {
      const analysis = await getAnalysis(file);

      result.anyTypes += analysis.anyTypes;
      result.assertions += analysis.assertions;
      result.nonNullAssertions += analysis.nonNullAssertions;
      result.renamedImports += analysis.renamedImports;
      result.importExpressions += analysis.importExpressions;
      result.nodeProtocolImports += analysis.nodeProtocolImports;
      result.metaProperties += analysis.metaProperties;
      result.codeLines += analysis.codeLines;

      result.tsFiles += isTs(file) ? 1 : 0;
      result.jsFiles += isJs(file) ? 1 : 0;
      result.analyzedFiles += 1;
    } catch (e) {
      throw new Error(`Analyze ${file} fail!`, { cause: e });
    }
  });
  return result;
}
