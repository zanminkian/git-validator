import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { glob } from 'glob'
import YAML from 'yaml'

export interface ConvertOptions {
  cwd?: string
}

export async function convert(msg: string, options: ConvertOptions = {}) {
  const { cwd = process.cwd() } = options
  const type = getType(msg)
  const isBreaking = isBreakingChange(msg)

  const pkgs = (await getPackages(msg, cwd)).map(
    (pkg) => `"${pkg.name}": ${getSemanticVersion(pkg.version, isBreaking, type)}`,
  )
  const contents = [
    '---',
    ...pkgs,
    '---',
    ...(pkgs.length > 0 ? [`\n${msg}`] : []), // TODO: msg should be converted for better readability
  ]
  return contents.join('\n')
}

async function getPackages(msg: string, cwd: string): Promise<{ path: string; name: string; version: string }[]> {
  if (/^[a-z]+\(\)!?: /.test(msg)) return []
  const allPackages = await getAllPackages(cwd)
  if (/^[a-z]+!?: /.test(msg)) return allPackages

  const scopesStr = msg.match(/^[a-z]+\((.+)\)!?: /)?.[1]
  if (!scopesStr) throw new Error('Scopes is undefined. This should not happen. Please submit this issue.')
  const scopes = scopesStr
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return scopes.map((scope) => {
    const pkg =
      allPackages.find(({ name }) => name === scope) || allPackages.find(({ path }) => path.endsWith(`/${scope}`))
    if (pkg) return pkg
    throw new Error(`Scope ${scope} is not found in this repo.`)
  })
}

async function getAllPackages(cwd: string): Promise<{ path: string; name: string; version: string }[]> {
  const pnpmWorkspacePath = path.resolve(cwd, 'pnpm-workspace.yaml')
  const rootPkgJsonPath = path.resolve(cwd, 'package.json')

  const rootPkgJson: { name: string; version: string; packages?: string[] } = JSON.parse(
    await fs.readFile(rootPkgJsonPath, 'utf-8'),
  )
  const usePnpm = (await fs.stat(pnpmWorkspacePath).catch(() => undefined))?.isFile()
  const packageGlobs: string[] | undefined = usePnpm
    ? YAML.parse(await fs.readFile(pnpmWorkspacePath, 'utf-8')).packages
    : rootPkgJson.packages

  if (!packageGlobs) {
    return [
      {
        path: cwd,
        name: rootPkgJson.name,
        version: rootPkgJson.version,
      },
    ]
  }

  const packagePaths = (await Promise.all(packageGlobs.map((pkg) => glob(pkg, { cwd }))))
    .flat()
    .filter((i, idx, arr) => arr.indexOf(i) === idx)
    .map((p) => path.resolve(cwd, p))
  const result = await Promise.all(
    packagePaths.map(async (p) => {
      const pkgJsonStr = await fs.readFile(path.resolve(p, 'package.json'), 'utf-8')
      const pkgJson: { name: string; version: string; packages?: string[] } = JSON.parse(pkgJsonStr)
      return {
        path: p,
        name: pkgJson.name,
        version: pkgJson.version,
      }
    }),
  )
  return result
}

function getSemanticVersion(pkgVersion: string, isBreaking: boolean, type: string) {
  if (isBreaking) {
    if (pkgVersion.startsWith('0')) {
      return 'minor'
    } else {
      return 'major'
    }
  }

  switch (type) {
    case 'feat':
      if (pkgVersion.startsWith('0')) {
        return 'patch'
      } else {
        return 'minor'
      }
    default:
      return 'patch'
  }
}

function isBreakingChange(msg: string) {
  // TODO detect beginning of "BREAKING CHANGE"
  return /^[a-z]+(\(.*\))?!: /.test(msg)
}

function getType(msg: string) {
  const type = msg.match(/^([a-z]+)(\(.*\))?!?: /)?.[1]
  if (!type) throw new Error('Cannot find type in the committing message.')
  return type
}
