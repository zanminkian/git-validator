// @ts-check
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import process from "node:process";
import { dir, exists, resolveConfig } from "./utils.js";

const requireResolve = createRequire(import.meta.url).resolve;

/**
 * @param {string} file
 * @param {string} content
 */
async function writeGitHook(file, content) {
  const gitPath = resolve(process.cwd(), ".git");
  if (!(await exists(gitPath))) {
    throw new Error("Directory `.git` is not existing. Please run `git init` first.");
  }

  const hooksPath = resolve(gitPath, "hooks");
  await fs.mkdir(hooksPath, { recursive: true });

  const path = resolve(hooksPath, file);
  await fs.writeFile(path, content);
  await fs.chmod(path, "777");
}

/**
 *
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
    `npx lint-staged --config ${join(dir(import.meta.url), config)}`,
  ].join("\n");

  await writeGitHook("pre-commit", content);
}

async function writeCommitMsg() {
  const content = [
    "#!/bin/sh",
    `npx commitlint --config ${join(dir(import.meta.url), "commitlint.config.js")} --edit`,
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
export async function install({ preCommit, commitMsg, prePush, eslint, prettier }) {
  if (!eslint && !prettier) {
    throw new Error("'--no-eslint' and '--no-prettier' should not be used at the same time");
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

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean}} options
 */
export async function lint(paths = [], options = {}) {
  const { update: fix } = options;
  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) => resolve(cwd, p));

  let configPath = (await resolveConfig("eslint"))?.filepath;
  if (!configPath) {
    process.env["ESLINT_USE_FLAT_CONFIG"] = "true";
    configPath = requireResolve("@git-validator/eslint-config");
  }

  console.log("Checking linting...");
  const child = spawn(
    join(dir(import.meta.url), "bin", "eslint.js"),
    ["--config", configPath, ...(fix ? ["--fix"] : []), ...ps],
    {
      stdio: "inherit",
    },
  );
  return await new Promise((resolve, reject) => {
    child.on("error", (err) => reject(err));
    child.on("close", (code, signal) => resolve({ code, signal }));
  });
}

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean}} options
 */
export async function format(paths = [], options = {}) {
  const { update: write } = options;
  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) => resolve(cwd, p));

  const prettierIgnore = join(cwd, ".prettierignore");
  const gitIgnore = join(cwd, ".gitignore");
  const ignores = [
    ...((await exists(prettierIgnore))
      ? [prettierIgnore]
      : [join(dir(import.meta.url), "prettierignore")]),
    ...((await exists(gitIgnore)) ? [gitIgnore] : []),
  ].flatMap((p) => ["--ignore-path", p]);
  const configPath =
    (await resolveConfig("prettier"))?.filepath ?? requireResolve("@git-validator/prettier-config");

  const child = spawn(
    join(dir(import.meta.url), "bin", "prettier.js"),
    ["--check", ...ignores, "--config", configPath, ...(write ? ["--write"] : []), ...ps],
    { stdio: "inherit" },
  );
  return await new Promise((resolve, reject) => {
    child.on("error", (err) => reject(err));
    child.on("close", (code, signal) => resolve({ code, signal }));
  });
}
