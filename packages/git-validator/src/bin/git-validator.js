#!/usr/bin/env node
import process from 'node:process'
import { Command } from 'commander'
import { format, install, lint } from '../cli.js'

const program = new Command()

program
  .name('git-validator')
  .description("lint code using eslint. it's the same as running `git-validator lint` command")

program
  .command('lint')
  .description('lint code using eslint')
  .option('--fix', 'automatically fix problems')
  .argument('[paths...]', 'dir or file paths to lint')
  .action((paths, options) => process.exit(lint(paths, options).status))

program
  .command('format')
  .description('format code using prettier')
  .option('--write', 'edit files in-place')
  .argument('[paths...]', 'dir or file paths to format')
  .action((paths, options) => process.exit(format(paths, options).status))

program
  .command('install')
  .description('install git-validator config files')
  .option('--no-pre-commit', 'skip writing `pre-commit` file')
  .option('--no-commit-msg', 'skip writing `commit-msg` file')
  .option('--pre-push <cmd>', 'setup a command to run during the git `pre-push` stage')
  .action((options) => install(options))

program.parse()
