#!/usr/bin/env node
// @ts-check
import process from "node:process";
import { Command } from "commander";
import { format, install, lint } from "../cli.js";
import { importJson } from "../utils.js";

const pkgJson = await importJson(import.meta.url, "../../package.json");

const program = new Command();

program
  .name("git-validator")
  .version(pkgJson.version)
  .description("lint & format code using eslint & prettier")
  .option("-u, --update", "automatically update files to fix code style problems")
  .argument("[paths...]", "dir or file paths to format and lint")
  .action(async (paths, options) => {
    process.exit(((await lint(paths, options)).code || (await format(paths, options)).code) ?? 0);
  });

program
  .command("lint")
  .description("lint code using eslint")
  .option("-u, --update", "automatically update files to fix code style problems")
  .argument("[paths...]", "dir or file paths to lint")
  .action(async (paths, options, prog) =>
    process.exit((await lint(paths, { ...prog.optsWithGlobals(), ...options })).code ?? 0),
  );

program
  .command("format")
  .description("format code using prettier")
  .option("-u, --update", "automatically update files to fix code style problems")
  .argument("[paths...]", "dir or file paths to format")
  .action(async (paths, options, prog) =>
    process.exit((await format(paths, { ...prog.optsWithGlobals(), ...options })).code ?? 0),
  );

program
  .command("install")
  .description("install git-validator config files by writing git hook files to .git/hooks")
  .option("--no-pre-commit", "skip writing `pre-commit` file")
  .option("--no-commit-msg", "skip writing `commit-msg` file")
  .option("--pre-push <cmd>", "setup a command to run during the git `pre-push` stage")
  .action(async (options) => await install(options));

program.parse();
