#!/usr/bin/env node
// @ts-check
import process from "node:process";
import { initAction, setup } from "@git-validator/tsconfig/setup";
import { Command } from "commander";
import { format } from "../command/format.js";
import { install } from "../command/install.js";
import { lint } from "../command/lint.js";
import { importJson } from "../utils.js";

const pkgJson = await importJson(import.meta.url, "../../package.json");

const program = new Command().enablePositionalOptions();

program
  .name("git-validator")
  .version(pkgJson.version)
  .description("lint & format code using eslint & prettier")
  .option("-f, --fix", "automatically fix problems using eslint")
  .option("-w, --write", "automatically format code using prettier")
  .option(
    "-u, --update",
    "automatically fix problems and format code using eslint and prettier",
  )
  .option(
    "-d, --dry-run",
    "print what command will be executed under the hood instead of executing",
  )
  .argument("[paths...]", "dir or file paths to format and lint")
  .action(async (paths, options) => {
    let code = (await format(paths, options)) || (await lint(paths, options));
    if (options.fix || options.update) {
      code ||= await format(paths, options);
    }
    process.exit(code);
  });

program
  .command("lint")
  .description("lint code using eslint")
  .option("-f, --fix", "automatically fix problems")
  .option("-u, --update", "alias for '--fix' option")
  .option(
    "-d, --dry-run",
    "print what command will be executed under the hood instead of executing",
  )
  .argument("[paths...]", "dir or file paths to lint")
  .action(async (paths, options) => process.exit(await lint(paths, options)));

program
  .command("format")
  .description("format code using prettier")
  .option("-w, --write", "automatically format code")
  .option("-u, --update", "alias for '--write' option")
  .option(
    "-d, --dry-run",
    "print what command will be executed under the hood instead of executing",
  )
  .argument("[paths...]", "dir or file paths to format")
  .action(async (paths, options) => process.exit(await format(paths, options)));

program
  .command("install")
  .description(
    "install git-validator config files by writing git hook files to .git/hooks",
  )
  .option("--no-pre-commit", "skip writing `pre-commit` file")
  .option("--no-commit-msg", "skip writing `commit-msg` file")
  .option(
    "--pre-push <cmd>",
    "setup a command to run during the git `pre-push` stage",
  )
  .option(
    "--no-prettier",
    "skip formatting code using prettier on git 'pre-commit' stage",
  )
  .option(
    "--no-eslint",
    "skip linting code using eslint on git 'pre-commit' stage",
  )
  .action(async (options) => await install(options));

setup(program, {
  initCommand: "init-tsconfig",
  diffCommand: "diff-tsconfig",
  initAction: (options) =>
    initAction({ ...options, ext: "git-validator/tsconfig" }),
});

program.parse();
