module.exports = {
  overrides: [{
    files: ['*.js', '*.cjs', '*.mjs', '*.jsx'],
    extends: [
      './standard-config',
    ],
    rules: {
      // override builtin standard config
      'comma-dangle': ['error', 'always-multiline'],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }], // https://github.com/standard/eslint-config-standard/pull/281
    },
  }],
}
