#!/usr/bin/env node
import process from "node:process";
import { Command } from "commander";
import { format, install, lint } from "../cli.js";

const program = new Command();

program
  .name("git-validator")
  .description("lint & format code using eslint & prettier")
  .option("-u, --update", "automatically update files to fix code style problems")
  .argument("[paths...]", "dir or file paths to format and lint")
  .action((paths, options) => {
    process.exit((lint(paths, options).status || format(paths, options).status) ?? 0);
  });

program
  .command("lint")
  .description("lint code using eslint")
  .option("-u, --update", "automatically update files to fix code style problems")
  .argument("[paths...]", "dir or file paths to lint")
  .action((paths, options, prog) =>
    process.exit(lint(paths, { ...prog.optsWithGlobals(), ...options }).status ?? 0),
  );

program
  .command("format")
  .description("format code using prettier")
  .option("-u, --update", "automatically update files to fix code style problems")
  .argument("[paths...]", "dir or file paths to format")
  .action((paths, options, prog) =>
    process.exit(format(paths, { ...prog.optsWithGlobals(), ...options }).status ?? 0),
  );

program
  .command("install")
  .description("install git-validator config files")
  .option("--no-pre-commit", "skip writing `pre-commit` file")
  .option("--no-commit-msg", "skip writing `commit-msg` file")
  .option("--pre-push <cmd>", "setup a command to run during the git `pre-push` stage")
  .action((options) => install(options));

program.parse();
