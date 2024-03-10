// @ts-check
// TODO move this logic to another package
import fs from "node:fs/promises";
import { resolve, sep } from "node:path";
import process from "node:process";
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";
import { parse } from "@typescript-eslint/typescript-estree";
import { minimatch } from "minimatch";

/**
 * @param {string} path
 */
async function getTsAnalysis(path) {
  const code = await fs.readFile(path, "utf-8");
  const result = {
    anyTypes: 0,
    assertions: 0,
    nonNullAssertions: 0,
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
        result.assertions += 1;
        break;
      case "TSNonNullExpression":
        result.nonNullAssertions += 1;
        break;
    }
    Object.values(node).forEach(walk);
  }

  walk(parse(code, { jsx: path.endsWith("x") }));
  return result;
}

/**
 * @param {string} dir absolute directory path
 * @param {string[]} ignorePatterns
 * @param {(file: string)=>Promise<void>} cb
 */
async function walkDir(dir, ignorePatterns, cb) {
  /**
   * @type {(path: string)=>boolean}
   */
  const ignoreDir = (path) =>
    path.includes(`${sep}.git${sep}`) ||
    path.includes(`${sep}node_modules${sep}`) ||
    ignorePatterns.some((pattern) => minimatch(path, pattern));

  /**
   * @type {(path: string)=>boolean}
   */
  const ignoreFile = (path) => !/\.[mc]?tsx?$/.test(path) || ignoreDir(path);

  const promises = (await fs.readdir(dir))
    .map((path) => resolve(dir, path))
    .map(async (path) => {
      if ((await fs.stat(path)).isDirectory()) {
        if (!ignoreDir(path)) {
          await walkDir(path, ignorePatterns, cb);
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
  const ignores = (
    await fs.readFile(resolve(dir, ".gitignore"), "utf-8").catch(() => "")
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
  };

  await walkDir(dir, ignores, async (file) => {
    try {
      const analysis = await getTsAnalysis(file);

      result.anyTypes += analysis.anyTypes;
      result.assertions += analysis.assertions;
      result.nonNullAssertions += analysis.nonNullAssertions;
    } catch (e) {
      throw new Error(`Analyze ${file} fail!`, { cause: e });
    }
  });
  return result;
}
