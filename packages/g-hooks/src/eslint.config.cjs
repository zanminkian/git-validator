const { join } = require('node:path')
const { cosmiconfigSync } = require('cosmiconfig')
const config = require('@zanminkian/eslint-config')

module.exports = cosmiconfigSync('eslint').search(join(__dirname, '..'))?.config ?? config
