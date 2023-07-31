const standardConfig = require('./standard-config.json')

module.exports = {
  ...standardConfig,
  extends: ['plugin:@zanminkian/recommended'],
  plugins: [
    ...standardConfig.plugins,
    'unicorn',
    'simple-import-sort',
  ],
  rules: {
    ...standardConfig.rules,
    // override standard config rules
    'comma-dangle': ['error', 'always-multiline'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }], // https://github.com/standard/eslint-config-standard/pull/281

    // code style for a better readability
    'max-statements-per-line': ['error', { max: 1 }],
    'import/newline-after-import': ['error', { count: 1 }],
    'simple-import-sort/imports': ['error', { groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']] }],
    'simple-import-sort/exports': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/number-literal-case': 'error',

    // ban some syntaxes to reduce mistakes
    'import/no-self-import': 'error',
    'import/no-dynamic-require': 'error', // TODO remove it once we have ban commonjs in js file.
    'import/no-relative-packages': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default-member': 'error',
    'n/prefer-global/process': ['error', 'never'],
    'n/prefer-global/buffer': ['error', 'never'],
    'unicorn/error-message': 'error',
    'unicorn/no-instanceof-array': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-typeof-undefined': 'error',
    'unicorn/throw-new-error': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/no-new-array': 'error',
    // 'unicorn/no-null': 'error', // null can be useful when interact with json.
    'prefer-exponentiation-operator': 'error',
    'no-implicit-coercion': ['error', { disallowTemplateShorthand: true, allow: ['!!'] }],
    'no-invalid-this': 'error',
    'no-plusplus': 'error',
  },
}
