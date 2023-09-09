import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { cosmiconfigSync } from "cosmiconfig";

const __dirname = dirname(fileURLToPath(import.meta.url));
const requireResolve = createRequire(import.meta.url).resolve;

function writeGitHook(file, content) {
  const gitPath = resolve(process.cwd(), ".git");
  if (!fs.existsSync(gitPath)) {
    throw new Error("Directory `.git` is not existing. Please run `git init` first.");
  }

  const hooksPath = resolve(gitPath, "hooks");
  fs.mkdirSync(hooksPath, { recursive: true });

  const path = resolve(hooksPath, file);
  fs.writeFileSync(path, content);
  fs.chmodSync(path, "777");
}

function writePreCommit() {
  const content = [
    "#!/bin/sh",
    `npx lint-staged --config ${join(__dirname, "lint-staged.config.cjs")}`,
  ].join("\n");

  writeGitHook("pre-commit", content);
}

function writeCommitMsg() {
  const content = [
    "#!/bin/sh",
    `npx commitlint --config ${join(__dirname, "commitlint.config.cjs")} --edit`,
  ].join("\n");

  writeGitHook("commit-msg", content);
}

function writePrePush(cmd) {
  const content = ["#!/bin/sh", cmd].join("\n");

  writeGitHook("pre-push", content);
}

export function install({ preCommit, commitMsg, prePush }) {
  if (preCommit) {
    writePreCommit();
  }
  if (commitMsg) {
    writeCommitMsg();
  }
  if (prePush) {
    writePrePush(prePush);
  }
}

export function lint(paths = [], options = {}) {
  const { update: fix } = options;
  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) => resolve(cwd, p));

  let configPath = cosmiconfigSync("eslint").search(join(__dirname, ".."))?.filepath;
  if (!configPath) {
    process.env.ESLINT_USE_FLAT_CONFIG = "true";
    configPath = requireResolve("@zanminkian/eslint-config");
  }

  return spawnSync("npx", ["eslint", "--config", configPath, ...(fix ? ["--fix"] : []), ...ps], {
    stdio: "inherit",
  });
}

export function format(paths = [], options = {}) {
  const { update: write } = options;
  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) => resolve(cwd, p));

  const projectPrettierIgnore = join(cwd, ".prettierignore");
  const projectGitIgnore = join(cwd, ".gitignore");
  const ignores = [
    ...(fs.existsSync(projectPrettierIgnore)
      ? [projectPrettierIgnore]
      : [join(__dirname, "prettierignore")]),
    ...(fs.existsSync(projectGitIgnore) ? [projectGitIgnore] : []),
  ].flatMap((p) => ["--ignore-path", p]);
  const configPath =
    cosmiconfigSync("prettier").search(join(__dirname, ".."))?.filepath ??
    requireResolve("@zanminkian/prettier-config");

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
