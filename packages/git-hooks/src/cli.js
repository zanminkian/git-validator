import fs from 'node:fs'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import linter from 'git-commit-msg-linter'

const __dirname = dirname(fileURLToPath(import.meta.url))

function writePreCommit() {
  const content = [
    '#!/bin/sh',
    `echo '{"*":["npx eslint --config ${join(__dirname, 'eslint.config.cjs')} --fix"]}' | npx lint-staged -c -`,
  ].join('\n')

  const path = resolve(process.cwd(), '.git', 'hooks', 'pre-commit')
  fs.writeFileSync(path, content)
  fs.chmodSync(path, '777')
}

function writeCommitMsg() {
  linter.install({ silent: true })
}

function writePrePush(cmd) {
  const content = [
    '#!/bin/sh',
    cmd,
  ].join('\n')

  const path = resolve(process.cwd(), '.git', 'hooks', 'pre-push')
  fs.writeFileSync(path, content)
  fs.chmodSync(path, '777')
}

export function install({ prePush }) {
  writePreCommit()
  writeCommitMsg()
  if (prePush)
    writePrePush(prePush)
}

export function format(dir = process.cwd()) {
  return spawnSync('npx', ['eslint', resolve(process.cwd(), dir), '--config', join(__dirname, 'eslint.config.cjs'), '--fix'], { stdio: 'inherit' })
}

export function lint(dir = process.cwd()) {
  return spawnSync('npx', ['eslint', resolve(process.cwd(), dir), '--config', join(__dirname, 'eslint.config.cjs')], { stdio: 'inherit' })
}
