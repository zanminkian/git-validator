const { listUnsupportedExtensions } = require('./utils')

module.exports = {
  extends: '@antfu',
  // https://github.com/antfu/eslint-config/pull/181
  // https://github.com/antfu/eslint-config/pull/113
  ignorePatterns: listUnsupportedExtensions(),
  rules: {
    // We have to add this because of [this](https://github.com/antfu/eslint-config/pull/110) and [this](https://github.com/antfu/eslint-config/pull/144)
    '@typescript-eslint/consistent-type-imports': 'off',
    // We have to add this because of [this](https://github.com/antfu/eslint-config/pull/145)
    'dot-notation': 'off',
    // https://github.com/antfu/eslint-config/pull/159
    'n/prefer-global/process': ['error', 'never'],
  },
}
