module.exports = {
  extends: '@antfu',
  // We have to add this because of [this](https://github.com/antfu/eslint-config/pull/113)
  ignorePatterns: ['*.thrift', '*.proto', '*.sh'],
  plugins: ['node'],
  rules: {
    // We have to add this because of [this](https://github.com/antfu/eslint-config/pull/110) and [this](https://github.com/antfu/eslint-config/pull/144)
    '@typescript-eslint/consistent-type-imports': 'off',
    // We have to add this because of [this](https://github.com/antfu/eslint-config/pull/145)
    'dot-notation': 'off',
    // https://github.com/antfu/eslint-config/pull/159
    'node/prefer-global/process': ['error', 'never'],
    'node/prefer-global/buffer': ['error', 'never'],
  },
}
