const standardConfig = require('./standard-config.json')

module.exports = {
  ...standardConfig,
  extends: ['plugin:@zanminkian/recommended'],
  plugins: [
    ...standardConfig.plugins,
  ],
  rules: {
    ...standardConfig.rules,

    // override standard config rules
    'comma-dangle': ['error', 'always-multiline'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }], // https://github.com/standard/eslint-config-standard/pull/281
  },
}
