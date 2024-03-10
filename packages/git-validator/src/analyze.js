// @ts-check
// TODO move this logic to another package
import fs from "node:fs/promises";
import { resolve, sep } from "node:path";
import process from "node:process";
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";
import { parse } from "@typescript-eslint/typescript-estree";
import { minimatch } from "minimatch";

const gitIgnores = (
  await fs
    .readFile(resolve(process.cwd(), ".gitignore"), "utf-8")
    .catch(() => "")
)
  .split("\n")
  .map((i) => i.trim())
  .filter(Boolean)
  .map(gitignoreToMinimatch);

/**
 * @param {string} code
 */
function getTsAnalysis(code) {
  const result = {
    anyTypeCount: 0,
    assertionCount: 0,
    nonNullAssertionCount: 0,
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
        result.anyTypeCount += 1;
        break;
      case "TSAsExpression":
      case "TSTypeAssertion":
        result.assertionCount += 1;
        break;
      case "TSNonNullExpression":
        result.nonNullAssertionCount += 1;
        break;
    }
    Object.values(node).forEach(walk);
  }

  walk(parse(code, { jsx: true }));
  return result;
}

/**
 * @param {string} dir absolute directory path
 * @param {(file: string)=>Promise<void>} cb
 */
async function walkDir(dir, cb) {
  /**
   * @type {(path: string)=>boolean}
   */
  const ignoreDir = (path) =>
    path.includes(`${sep}.git${sep}`) ||
    path.includes(`${sep}node_modules${sep}`) ||
    gitIgnores.some((pattern) => minimatch(path, pattern));

  /**
   * @type {(path: string)=>boolean}
   */
  const ignoreFile = (path) => !/\.[mc]?tsx?$/.test(path) || ignoreDir(path);

  const promises = (await fs.readdir(dir))
    .map((path) => resolve(dir, path))
    .map(async (path) => {
      if ((await fs.stat(path)).isDirectory()) {
        if (!ignoreDir(path)) {
          await walkDir(path, cb);
        }
      } else {
        if (!ignoreFile(path)) {
          await cb(path);
        }
      }
    });
  await Promise.all(promises);
}

export async function analyze(dir = process.cwd()) {
  dir = resolve(process.cwd(), dir);
  const result = {
    anyTypeCount: 0,
    assertionCount: 0,
    nonNullAssertionCount: 0,
  };

  await walkDir(dir, async (file) => {
    const code = await fs.readFile(file, "utf-8");
    try {
      const analysis = getTsAnalysis(code);

      result.anyTypeCount += analysis.anyTypeCount;
      result.assertionCount += analysis.assertionCount;
      result.nonNullAssertionCount += analysis.nonNullAssertionCount;
    } catch (e) {
      throw new Error(`Analyze ${file} fail!`, { cause: e });
    }
  });
  return result;
}
