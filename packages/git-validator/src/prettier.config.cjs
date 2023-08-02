const { join } = require('node:path')
const { cosmiconfigSync } = require('cosmiconfig')
const defaultConfig = require('@zanminkian/prettier-config')

module.exports = cosmiconfigSync('prettier').search(join(__dirname, '..'))?.config ?? defaultConfig
