import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import linter from 'git-commit-msg-linter'

const __dirname = dirname(fileURLToPath(import.meta.url))

function writePreCommit(dir = process.cwd()) {
  const preCommitContents = [
    '#!/bin/sh',
    `echo '{"*":["npx eslint --config ${join(__dirname, 'eslint.config.cjs')} --fix"]}' | npx lint-staged -c -`,
  ]
  const preCommitPath = resolve(process.cwd(), dir, '.git', 'hooks', 'pre-commit')
  fs.writeFileSync(preCommitPath, preCommitContents.join('\n'))
  fs.chmodSync(preCommitPath, 777)
}

function writeCommitMsg() {
  linter.install({ silent: true })
}

export function install() {
  writePreCommit()
  writeCommitMsg()
}

export function format(dir = process.cwd()) {
  return spawnSync('npx', ['eslint', resolve(process.cwd(), dir), '--config', join(__dirname, 'eslint.config.cjs'), '--fix'], { stdio: 'inherit' })
}

export function lint(dir = process.cwd()) {
  return spawnSync('npx', ['eslint', resolve(process.cwd(), dir), '--config', join(__dirname, 'eslint.config.cjs')], { stdio: 'inherit' })
}
