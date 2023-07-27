const standardConfig = require('./standard-config.json')

module.exports = {
  ...standardConfig,
  extends: ['plugin:@zanminkian/recommended'],
  plugins: [
    ...standardConfig.plugins,
    'unicorn',
  ],
  rules: {
    ...standardConfig.rules,
    // override standard config rules
    'comma-dangle': ['error', 'always-multiline'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }], // https://github.com/standard/eslint-config-standard/pull/281

    // code style for a better readability
    'max-statements-per-line': ['error', { max: 1 }],
    'import/newline-after-import': ['error', { count: 1 }],
    'unicorn/escape-case': 'error',
    'unicorn/number-literal-case': 'error',

    // ban some syntaxes to reduce mistakes
    'import/no-self-import': 'error',
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
    'prefer-exponentiation-operator': 'error',
    'no-implicit-coercion': ['error', { disallowTemplateShorthand: true, allow: ['!!'] }],
    'no-invalid-this': 'error',
    'no-plusplus': 'error',
    'no-restricted-globals': [
      'error',
      { name: 'global', message: 'Use `globalThis` instead.' },
      { name: 'self', message: 'Use `globalThis` instead.' },
    ],
    'no-restricted-properties': [
      'error',
      { property: '__proto__', message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.' },
      { property: '__defineGetter__', message: 'Use `Object.defineProperty` instead.' },
      { property: '__defineSetter__', message: 'Use `Object.defineProperty` instead.' },
      { property: '__lookupGetter__', message: 'Use `Object.getOwnPropertyDescriptor` instead.' },
      { property: '__lookupSetter__', message: 'Use `Object.getOwnPropertyDescriptor` instead.' },
    ],
  },
}
