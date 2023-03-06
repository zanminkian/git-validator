const fs = require('node:fs')
const { spawnSync } = require('node:child_process')
const { join, resolve } = require('node:path')
const linter = require('git-commit-msg-linter')

function writePreCommit(dir = process.cwd()) {
  const preCommitContents = [
    '#!/bin/sh',
    `echo '{"*":["npx eslint --config ${join(__dirname, 'eslint.config.js')} --fix"]}' | npx lint-staged -c -`,
  ]
  const preCommitPath = resolve(process.cwd(), dir, '.git', 'hooks', 'pre-commit')
  fs.writeFileSync(preCommitPath, preCommitContents.join('\n'))
  fs.chmodSync(preCommitPath, 755)
}

function writeCommitMsg() {
  linter.install({ silent: true })
}

exports.install = function install() {
  writePreCommit()
  writeCommitMsg()
}

exports.format = function format(dir = process.cwd()) {
  return spawnSync('npx', ['eslint', resolve(process.cwd(), dir), '--config', join(__dirname, 'eslint.config.js'), '--fix'], { stdio: 'inherit' })
}

exports.lint = function lint(dir = process.cwd()) {
  return spawnSync('npx', ['eslint', resolve(process.cwd(), dir), '--config', join(__dirname, 'eslint.config.js')], { stdio: 'inherit' })
}
