#!/usr/bin/env node
// @ts-check
import { Command } from "commander";
import { initAction, setup } from "./setup.js";

const program = new Command();
program.name("tsconfig");
setup(program, {
  initAction: (options) =>
    initAction({ ...options, ext: "@git-validator/tsconfig" }),
});
program.parse();
