// @ts-check
import fs from "node:fs/promises";
import { dirname, join } from "node:path";
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
 * @param {string} url
 */
export function dir(url) {
  return dirname(fileURLToPath(url));
}

/**
 * @param {string} module
 * @param {string} dirname
 */
export async function resolveConfig(module, dirname = dir(import.meta.url)) {
  return await cosmiconfig(module).search(join(dirname, ".."));
}
