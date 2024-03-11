#!/usr/bin/env node
// @ts-check
import process from "node:process";
import { initAction, setup } from "@git-validator/tsconfig/setup";
import { Command } from "commander";
import { analyze } from "../analyze.js";
import { format, install, lint } from "../cli.js";
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
  .argument("[paths...]", "dir or file paths to format and lint")
  .action(async (paths, options) => {
    process.exit(
      ((await lint(paths, options)).code ||
        (await format(paths, options)).code) ??
        0,
    );
  });

program
  .command("lint")
  .description("lint code using eslint")
  .option(
    "-u, --update",
    "automatically update files to fix code style problems",
  )
  .argument("[paths...]", "dir or file paths to lint")
  .action(async (paths, options) =>
    process.exit((await lint(paths, options)).code ?? 0),
  );

program
  .command("format")
  .description("format code using prettier")
  .option(
    "-u, --update",
    "automatically update files to fix code style problems",
  )
  .argument("[paths...]", "dir or file paths to format")
  .action(async (paths, options) =>
    process.exit((await format(paths, options)).code ?? 0),
  );

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

program
  .command("analyze")
  .description("analyze js/ts project quality and print the report")
  .argument("[path]", "directory path storing js/ts files", ".")
  .action(async (path) => {
    const analysis = await analyze(path);
    console.log("1. Code lines and files count:");
    console.table({
      "Code Lines": analysis.codeLines,
      "TS Files": analysis.tsFiles,
      "JS Files": analysis.jsFiles,
      "Analyzed Files": analysis.analyzedFiles,
    });
    console.log("2. Type flaws count:");
    console.table({
      "Any Types": analysis.anyTypes,
      Assertions: analysis.assertions,
      "Non-null Assertions": analysis.nonNullAssertions,
    });
  });

setup(program, {
  initCommand: "init-tsconfig",
  diffCommand: "diff-tsconfig",
  initAction: (options) =>
    initAction({ ...options, ext: "git-validator/tsconfig" }),
});

program.parse();
