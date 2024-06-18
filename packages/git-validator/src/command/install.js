// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { dir, exists } from "../utils.js";

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
    `./node_modules/.bin/lint-staged --config ${path.join(dir(import.meta.url), "..", "config", config)}`,
  ].join("\n");

  await writeGitHook("pre-commit", content);
}

async function writeCommitMsg() {
  const content = [
    "#!/bin/sh",
    `./node_modules/.bin/commitlint --config ${path.join(
      dir(import.meta.url),
      "..",
      "config",
      "commitlint.config.js",
    )} --edit`,
  ].join("\n");

  await writeGitHook("commit-msg", content);
}

/**
 * @param {string} cmd
 */
async function writePrePush(cmd) {
  const content = ["#!/bin/sh", cmd].join("\n");

  await writeGitHook("pre-push", content);
}

/**
 * @param {{preCommit: boolean, commitMsg: boolean, prePush: string, eslint: boolean, prettier: boolean}} options
 */
export async function install({
  preCommit,
  commitMsg,
  prePush,
  eslint,
  prettier,
}) {
  if (!eslint && !prettier) {
    throw new Error(
      "'--no-eslint' and '--no-prettier' should not be used at the same time",
    );
  }
  if (preCommit) {
    await writePreCommit({ noEslint: !eslint, noPrettier: !prettier });
  }
  if (commitMsg) {
    await writeCommitMsg();
  }
  if (prePush) {
    await writePrePush(prePush);
  }
}
