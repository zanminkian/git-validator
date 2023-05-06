const { join } = require('node:path')
const { cosmiconfigSync } = require('cosmiconfig')

const defaultConfig = { extends: ['@commitlint/config-conventional'] }

module.exports = cosmiconfigSync('commitlint').search(join(__dirname, '..'))?.config ?? defaultConfig
