#!/usr/bin/env node
import process from 'node:process'
import { Command } from 'commander'
import { format, install, lint } from '../src/cli.js'

const program = new Command().name('git-validator')

program
  .command('format')
  .description('format code')
  .argument('[dir]', 'dir path to format code')
  .action(dir => process.exit(format(dir).status))

program
  .command('lint')
  .description('check code')
  .argument('[dir]', 'dir path to check code')
  .action(dir => process.exit(lint(dir).status))

program
  .command('install')
  .description('install git-validator config files')
  .option('--no-pre-commit', 'skip writing `pre-commit` file')
  .option('--no-commit-msg', 'skip writing `commit-msg` file')
  .option('--pre-push <cmd>', 'setup a command to run during the git `pre-push` stage')
  .action(options => install(options))

program.parse()
