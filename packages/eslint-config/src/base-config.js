const standardConfig = require('./standard-config.json')

module.exports = {
  ...standardConfig,
  rules: {
    ...standardConfig.rules,

    // override standard config rules
    'comma-dangle': ['error', 'always-multiline'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }], // https://github.com/standard/eslint-config-standard/pull/281
  },
}
