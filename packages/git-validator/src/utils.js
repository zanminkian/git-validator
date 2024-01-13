// @ts-check
import fs from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cosmiconfig } from "cosmiconfig";

/**
 * @param {string} filepath
 */
export async function exists(filepath) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}

/**
 * Get current directory of the js file
 * Usage: `dir(import.meta.utl)`
 * @param {string} url
 */
export function dir(url) {
  return dirname(fileURLToPath(url));
}

/**
 * @param {string} module
 * @param {string} dirName
 */
export async function resolveConfig(module, dirName = dir(import.meta.url)) {
  return await cosmiconfig(module).search(join(dirName, ".."));
}

/**
 * Usage: `importJson(import.meta.url, '../xx.json')`
 * @param {string} importMetaUrl
 * @param {string} jsonPath
 */
export async function importJson(importMetaUrl, jsonPath) {
  return JSON.parse(
    await fs.readFile(resolve(dir(importMetaUrl), jsonPath), "utf-8"),
  );
}
