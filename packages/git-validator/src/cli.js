// @ts-check
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { dir, exists, resolveConfig } from "./utils.js";

const requireResolve = createRequire(import.meta.url).resolve;

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
    `npx lint-staged --config ${path.join(dir(import.meta.url), "config", config)}`,
  ].join("\n");

  await writeGitHook("pre-commit", content);
}

async function writeCommitMsg() {
  const content = [
    "#!/bin/sh",
    `npx commitlint --config ${path.join(
      dir(import.meta.url),
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

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, fix?: boolean}} options
 */
export async function lint(paths = [], options = {}) {
  const { update, fix } = options;
  const shouldFix = update || fix;

  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) =>
    path.resolve(cwd, p),
  );

  let configPath = (await resolveConfig("eslint"))?.filepath;
  if (!configPath) {
    process.env["ESLINT_USE_FLAT_CONFIG"] = "true";
    configPath = requireResolve("@git-validator/eslint-config");
  }

  console.log("Checking linting...");
  const child = spawn(
    "node",
    [
      path.join(dir(import.meta.url), "bin", "eslint.js"),
      "--config",
      configPath,
      ...(shouldFix ? ["--fix"] : []),
      ...ps,
    ],
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
 * @param {{update?: boolean, write?: boolean}} options
 */
export async function format(paths = [], options = {}) {
  const { update, write } = options;
  const shouldWrite = update || write;

  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) =>
    path.resolve(cwd, p),
  );

  const prettierIgnore = path.join(cwd, ".prettierignore");
  const gitIgnore = path.join(cwd, ".gitignore");
  const ignores = [
    ...((await exists(prettierIgnore))
      ? [prettierIgnore]
      : [path.join(dir(import.meta.url), "prettierignore")]),
    ...((await exists(gitIgnore)) ? [gitIgnore] : []),
  ].flatMap((p) => ["--ignore-path", p]);
  const configPath =
    (await resolveConfig("prettier"))?.filepath ??
    requireResolve("@git-validator/prettier-config");

  const child = spawn(
    "node",
    [
      path.join(dir(import.meta.url), "bin", "prettier.js"),
      "--check",
      ...ignores,
      "--config",
      configPath,
      ...(shouldWrite ? ["--write"] : []),
      ...ps,
    ],
    { stdio: "inherit" },
  );
  return await new Promise((resolve, reject) => {
    child.on("error", (err) => reject(err));
    child.on("close", (code, signal) => resolve({ code, signal }));
  });
}
