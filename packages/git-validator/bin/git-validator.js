#!/usr/bin/env node
import process from 'node:process'
import { Command } from 'commander'
import { install, lint } from '../src/cli.js'

const program = new Command()

program
  .name('git-validator')
  .description('lint code using eslint. it\'s the same as running `git-validator lint` command')

program
  .command('lint', { isDefault: true })
  .description('lint code using eslint')
  .option('--fix', 'automatically fix problems')
  .argument('[dir]', 'dir or file path to lint code')
  .action((dir, options) => process.exit(lint(dir, options).status))

program
  .command('install')
  .description('install git-validator config files')
  .option('--no-pre-commit', 'skip writing `pre-commit` file')
  .option('--no-commit-msg', 'skip writing `commit-msg` file')
  .option('--pre-push <cmd>', 'setup a command to run during the git `pre-push` stage')
  .action(options => install(options))

program.parse()
