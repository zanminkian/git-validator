#!/usr/bin/env node
const { Command } = require('commander')
const { format, lint, install } = require('../src/cli')

const program = new Command().name('git-hooks')

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
  .description('install git-hooks config files')
  .action(() => install())

program.parse()
