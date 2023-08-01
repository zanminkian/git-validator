const fs = require('node:fs')
const process = require('node:process')
const jsConfig = require('./js-config')
const tsConfig = require('./ts-config')

function listUnsupportedExtensions (supportedExtensions) {
  function isUnsupportedFile (path) {
    return !supportedExtensions.some(ext => path.toLowerCase().endsWith(`.${ext}`))
  }

  function isFile (path) {
    try {
      return fs.statSync(path).isFile()
    } catch (e) {
      // if file not found, return false here
      return false
    }
  }

  return process.argv
    .slice(2)
    .filter(i => !i.startsWith('-'))
    .filter(isFile)
    .filter(isUnsupportedFile)
    .map(p => `*.${p.split('.').at(-1)}`)
    .filter((i, index, arr) => arr.indexOf(i) === index)
}

module.exports = {
  ignorePatterns: [
    //
    '.eslintrc.?js',
    //
    'dist',
    'output',
    'out',
    'coverage',
    //
    ...listUnsupportedExtensions([
      'js', 'cjs', 'mjs', 'jsx',
      'ts', 'cts', 'mts', 'tsx',
      // 'json', 'json5', 'jsonc',
      // 'yaml', 'yml',
      // 'html', 'vue',
      // 'md',
    ]),
  ],
  overrides: [
    ...jsConfig.overrides,
    ...tsConfig.overrides,
  ],
}
