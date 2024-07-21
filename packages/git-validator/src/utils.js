// @ts-check
import childProcess from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { lilconfig } from "lilconfig";
import ora from "ora";

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
  return path.dirname(fileURLToPath(url));
}

/**
 * @param {string} module
 * @param {string} dirName
 */
export async function resolveConfig(module, dirName = dir(import.meta.url)) {
  return (
    (await lilconfig(module).search(process.cwd())) ??
    (await lilconfig(module).search(path.join(dirName, "..")))
  );
}

/**
 * Usage: `importJson(import.meta.url, '../xx.json')`
 * @param {string} importMetaUrl
 * @param {string} jsonPath
 * @returns {Promise<any>}
 */
export async function importJson(importMetaUrl, jsonPath) {
  return JSON.parse(
    await fs.readFile(path.resolve(dir(importMetaUrl), jsonPath), "utf-8"),
  );
}

/**
 * @param {number} startTime
 */
function getSpentTime(startTime) {
  const cost = Date.now() - startTime;
  if (cost < 1000) {
    return `${cost}ms`;
  } else if (cost < 60 * 1000) {
    return `${cost / 1000}s`;
  } else {
    const second = Math.floor(cost / 1000);
    return `${Math.floor(second / 60)}m${Math.floor(second % 60)}s`;
  }
}

/**
 * @param {string} command
 * @param {string} msg
 */
export async function execAsync(command, msg) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const spinner = ora(`${msg}...`).start();
    childProcess.exec(
      command,
      { env: { FORCE_COLOR: "true", ...process.env }, encoding: "buffer" },
      (error, stdout, stderr) => {
        if (error) {
          spinner.fail(`${msg} failed in ${getSpentTime(startTime)}`);
        } else {
          spinner.succeed(`${msg} succeeded in ${getSpentTime(startTime)}`);
        }
        process.stdout.write(stdout);
        process.stderr.write(stderr);
        return resolve(error?.code ?? 0);
      },
    );
  });
}
