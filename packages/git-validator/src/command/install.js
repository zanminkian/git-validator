// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { dir, exists, getBinPath } from "../utils.js";

/**
 * @param {string} file
 * @param {string} content
 */
async function writeGitHook(file, content) {
  const gitPath = path.resolve(process.cwd(), ".git");
  if (!(await exists(gitPath))) {
    throw new Error(
      "Directory `.git` is not existing. Please run `git init` first.",
    );
  }

  const hooksPath = path.resolve(gitPath, "hooks");
  await fs.mkdir(hooksPath, { recursive: true });

  const hookFilePath = path.resolve(hooksPath, file);
  await fs.writeFile(hookFilePath, content);
  await fs.chmod(hookFilePath, "777");
}

/**
 * @param {{noEslint: boolean, noPrettier: boolean}} options
 */
async function writePreCommit({ noEslint, noPrettier }) {
  let config = "lint-staged.config.js";
  if (noEslint && !noPrettier) {
    config = "lint-staged-without-eslint.config.js";
  } else if (!noEslint && noPrettier) {
    config = "lint-staged-without-prettier.config.js";
  } else if (noEslint && noPrettier) {
    return;
  }
  const content = [
    "#!/bin/sh",
    `${await getBinPath("lint-staged")} --config ${path.join(dir(import.meta.url), "..", "config", config)}`,
  ].join("\n");

  await writeGitHook("pre-commit", content);
}

/**
 * @param {{eslint: boolean, prettier: boolean}} options
 */
export async function install({ eslint, prettier }) {
  if (!eslint && !prettier) {
    throw new Error(
      "'--no-eslint' and '--no-prettier' should not be used at the same time",
    );
  }
  await writePreCommit({ noEslint: !eslint, noPrettier: !prettier });
}
