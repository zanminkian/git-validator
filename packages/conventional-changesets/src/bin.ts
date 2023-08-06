import { exec, spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { promisify } from 'node:util'
import chalk from 'chalk'
import { program } from 'commander'
import { humanId } from 'human-id'
import { convert } from './utils.js'

const execute = promisify(exec)

program.name('conventional-changesets')
program
  .command('generate', { isDefault: true })
  .description('generate changeset file according to conventional committed message')
  .option('-f, --force', 'force to generate changeset file ignoring that user have generated it manually')
  .option('-a, --add', 'run "git add" to stage the changeset file immediately once it has been generated')
  .action(async ({ force, add }: { force?: boolean; add?: boolean }) => {
    const files = await getAddedStagedFiles()
    if (!force && files.some((file) => /^\.changeset\/.+\.md$/.test(file))) return

    const changesetFilePath = await getChangesetFilePath()
    const changesetFileContent = await getChangesetFileContent()
    await fs.writeFile(changesetFilePath, changesetFileContent, 'utf-8')
    console.log(changesetFilePath)

    if (add) await execute(`git add ${changesetFilePath}`)
  })
program
  .command('commit')
  .description('run "git commit" with "--amend" option to commit changeset file. usually run at `post-commit` stage')
  .action(async () => {
    const files = await getAddedStagedFiles()
    if (files.length <= 0) return
    await execute('git commit --amend --no-edit --no-verify')
    files.forEach(async (file) => {
      const filePath = path.resolve(process.cwd(), file)
      const content = await fs.readFile(filePath, 'utf-8')
      console.log(`${chalk.green('Additionally commit')} ${chalk.blue(file)} ${chalk.green('successfully:')}`)
      console.log(chalk.gray(content))
    })
  })
program.parse()

async function getChangesetFileContent() {
  const commitMsgPath = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG')
  const commitMsg = await fs.readFile(commitMsgPath, 'utf-8')
  return await convert(commitMsg)
}

async function getChangesetFilePath() {
  const changesetDirPath = path.resolve(process.cwd(), '.changeset')
  const isDirectory = (await fs.stat(changesetDirPath).catch(() => undefined))?.isDirectory()
  if (!isDirectory) {
    throw new Error(`${changesetDirPath} is not a directory. Run 'npx changeset init' to create it first.`)
  }
  return path.resolve(changesetDirPath, `${humanId({ separator: '-', capitalize: false })}.md`)
}

async function getAddedStagedFiles() {
  const proc = spawn(`git diff --cached --name-only --diff-filter=A | xargs -I {} echo {}`, {
    shell: true,
  })

  let result = ''
  proc.stdout.on('data', (data) => {
    result += data.toString('utf-8')
  })
  let errMsg = ''
  proc.stderr.on('data', (data) => {
    errMsg += data.toString('utf-8')
  })
  return new Promise<string[]>((resolve, reject) => {
    proc.on('close', (code) => {
      if (code) {
        reject(new Error(`Get added staged files failed: ${errMsg}`))
      } else {
        resolve(result.split('\n').filter(Boolean))
      }
    })
  })
}
