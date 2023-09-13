// @ts-check
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { cosmiconfig } from "cosmiconfig";

const __dirname = dirname(fileURLToPath(import.meta.url));
const requireResolve = createRequire(import.meta.url).resolve;

/**
 * @param {"eslint"|"prettier"} module
 */
async function getConfigFilePath(module) {
  return (await cosmiconfig(module).search(join(__dirname, "..")))?.filepath;
}

/**
 * @param {string} filepath
 */
async function exists(filepath) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}

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

async function writePreCommit() {
  const content = [
    "#!/bin/sh",
    `npx lint-staged --config ${join(__dirname, "lint-staged.config.js")}`,
  ].join("\n");

  await writeGitHook("pre-commit", content);
}

async function writeCommitMsg() {
  const content = [
    "#!/bin/sh",
    `npx commitlint --config ${join(__dirname, "commitlint.config.js")} --edit`,
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
 * @param {{preCommit: boolean, commitMsg: boolean, prePush: string}} options
 */
export async function install({ preCommit, commitMsg, prePush }) {
  if (preCommit) {
    await writePreCommit();
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

  let configPath = await getConfigFilePath("eslint");
  if (!configPath) {
    process.env["ESLINT_USE_FLAT_CONFIG"] = "true";
    configPath = requireResolve("@zanminkian/eslint-config");
  }

  return spawnSync("npx", ["eslint", "--config", configPath, ...(fix ? ["--fix"] : []), ...ps], {
    stdio: "inherit",
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
    ...((await exists(prettierIgnore)) ? [prettierIgnore] : [join(__dirname, "prettierignore")]),
    ...((await exists(gitIgnore)) ? [gitIgnore] : []),
  ].flatMap((p) => ["--ignore-path", p]);
  const configPath =
    (await getConfigFilePath("prettier")) ?? requireResolve("@zanminkian/prettier-config");

  return spawnSync(
    "npx",
    [
      "prettier",
      "--check",
      ...ignores,
      "--config",
      configPath,
      ...(write ? ["--write"] : []),
      ...ps,
    ],
    { stdio: "inherit" },
  );
}
