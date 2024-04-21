#!/usr/bin/env node
// @ts-check
import process from "node:process";
import { initAction, setup } from "@git-validator/tsconfig/setup";
import { Command } from "commander";
import { analyze } from "../command/analyze.js";
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
  .argument("[paths...]", "dir or file paths to format and lint")
  .action(async (paths, options) => {
    process.exit(
      ((await format(paths, options)).code ||
        (await lint(paths, options)).code ||
        (await format(paths, options)).code) ??
        0,
    );
  });

program
  .command("lint")
  .description("lint code using eslint")
  .option("-f, --fix", "automatically fix problems")
  .option("-u, --update", "alias for '--fix' option")
  .argument("[paths...]", "dir or file paths to lint")
  .action(async (paths, options) =>
    process.exit((await lint(paths, options)).code ?? 0),
  );

program
  .command("format")
  .description("format code using prettier")
  .option("-w, --write", "automatically format code")
  .option("-u, --update", "alias for '--write' option")
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
  .option("-d, --detail", "show analysis detail")
  .option(
    "-i, --ignore <path>",
    "ignore directory or file path. support globby pattern",
  )
  .argument("[path]", "directory or file path. support globby pattern", ".")
  .action(async (path, options) => {
    const analysis = await analyze(path, options.ignore);
    if (options.detail) {
      analysis.anyTypes.forEach((i) => {
        console.log("Any Type", i);
      });
      analysis.assertions.forEach((i) => {
        console.log("Assertion", i);
      });
      analysis.nonNullAssertions.forEach((i) => {
        console.log("Non-null Assertion", i);
      });
      analysis.renamedImports.forEach((i) => {
        console.log("Renamed Import", i);
      });
      analysis.importExpressions.forEach((i) => {
        console.log("Import Expression", i);
      });
      analysis.instanceofOperators.forEach((i) => {
        console.log("Instanceof Operator", i);
      });
      analysis.exportDefaults.forEach((i) => {
        console.log("Export Default", i);
      });
      analysis.nodeProtocolImports.forEach((i) => {
        console.log("Node Protocol Import", i);
      });
      analysis.metaProperties.forEach((i) => {
        console.log("Meta Property", i);
      });
    }
    console.log("1. Code lines and files count:");
    console.table({
      "Code Lines": analysis.codeLines,
      "TS Files": analysis.tsFiles,
      "JS Files": analysis.jsFiles,
      "Analyzed Files": analysis.analyzedFiles,
    });
    console.log("2. Type flaws count:");
    console.table({
      "Any Types": analysis.anyTypes.length,
      Assertions: analysis.assertions.length,
      "Non-null Assertions": analysis.nonNullAssertions.length,
    });
    console.log("3. Code style flaws count:");
    console.table({
      "Renamed Imports": analysis.renamedImports.length,
      "Import Expressions": analysis.importExpressions.length,
      "Instanceof Operators": analysis.instanceofOperators.length,
    });
    console.log("4. Module interop issues count:");
    console.table({
      "Export Defaults": analysis.exportDefaults.length,
    });
    console.log("5. Cross-platform issues count:");
    console.table({
      "Node Protocol Imports": analysis.nodeProtocolImports.length,
      "Meta Properties": analysis.metaProperties.length,
    });
  });

setup(program, {
  initCommand: "init-tsconfig",
  diffCommand: "diff-tsconfig",
  initAction: (options) =>
    initAction({ ...options, ext: "git-validator/tsconfig" }),
});

program.parse();
