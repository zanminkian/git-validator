import * as gitValidatorPlugin from "@git-validator/eslint-plugin";
import confusingKeys from "confusing-browser-globals";
import esxPlugin from "eslint-plugin-es-x";
import fpPlugin from "eslint-plugin-fp";
import importPlugin from "eslint-plugin-import";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";

export function javascript() {
  // copied from https://github.com/standard/eslint-config-standard/blob/master/src/index.ts
  // prettier-ignore
  const standardConfigRules = {
    'no-var': 'error',
    'object-shorthand': ['error', 'properties'],

    'accessor-pairs': ['error', { setWithoutGet: true, enforceForClassMembers: true }],
    // 'array-bracket-spacing': ['error', 'never'],
    'array-callback-return': ['error', {
      allowImplicit: false,
      checkForEach: false
    }],
    // 'arrow-spacing': ['error', { before: true, after: true }],
    // 'block-spacing': ['error', 'always'],
    // 'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    camelcase: ['error', {
      allow: ['^UNSAFE_'],
      properties: 'never',
      ignoreGlobals: true
    }],
    // 'comma-dangle': ['error', {
    //   arrays: 'never',
    //   objects: 'never',
    //   imports: 'never',
    //   exports: 'never',
    //   functions: 'never'
    // }],
    // 'comma-spacing': ['error', { before: false, after: true }],
    // 'comma-style': ['error', 'last'],
    // 'computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
    'constructor-super': 'error',
    // curly: ['error', 'multi-line'],
    'default-case-last': 'error',
    // 'dot-location': ['error', 'property'],
    // 'dot-notation': ['error', { allowKeywords: true }], // TODO: This should be enabled. Disable it as it conflicts with ts when enabling ts-check
    // 'eol-last': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // 'func-call-spacing': ['error', 'never'],
    // 'generator-star-spacing': ['error', { before: true, after: true }],
    // indent: ['error', 2, {
    //   SwitchCase: 1,
    //   VariableDeclarator: 1,
    //   outerIIFEBody: 1,
    //   MemberExpression: 1,
    //   FunctionDeclaration: { parameters: 1, body: 1 },
    //   FunctionExpression: { parameters: 1, body: 1 },
    //   CallExpression: { arguments: 1 },
    //   ArrayExpression: 1,
    //   ObjectExpression: 1,
    //   ImportDeclaration: 1,
    //   flatTernaryExpressions: false,
    //   ignoreComments: false,
    //   ignoredNodes: [
    //     'TemplateLiteral *',
    //     'JSXElement',
    //     'JSXElement > *',
    //     'JSXAttribute',
    //     'JSXIdentifier',
    //     'JSXNamespacedName',
    //     'JSXMemberExpression',
    //     'JSXSpreadAttribute',
    //     'JSXExpressionContainer',
    //     'JSXOpeningElement',
    //     'JSXClosingElement',
    //     'JSXFragment',
    //     'JSXOpeningFragment',
    //     'JSXClosingFragment',
    //     'JSXText',
    //     'JSXEmptyExpression',
    //     'JSXSpreadChild'
    //   ],
    //   offsetTernaryExpressions: true
    // }],
    // 'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // 'keyword-spacing': ['error', { before: true, after: true }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    // 'multiline-ternary': ['error', 'always-multiline'],
    'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
    // 'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-async-promise-executor': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-const-assign': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-useless-backreference': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    // 'no-extra-parens': ['error', 'functions'],
    'no-fallthrough': 'error',
    // 'no-floating-decimal': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-import-assign': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': 'error',
    'no-loss-of-precision': 'error',
    'no-misleading-character-class': 'error',
    'no-prototype-builtins': 'error',
    'no-useless-catch': 'error',
    // 'no-mixed-operators': ['error', {
    //   groups: [
    //     ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
    //     ['&&', '||'],
    //     ['in', 'instanceof']
    //   ],
    //   allowSamePrecedence: true
    // }],
    // 'no-mixed-spaces-and-tabs': 'error',
    // 'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    // 'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-redeclare': ['error', { builtinGlobals: false }],
    'no-regex-spaces': 'error',
    'no-return-assign': ['error', 'except-parens'],
    'no-self-assign': ['error', { props: true }],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    // 'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    // 'no-trailing-spaces': 'error',
    'no-undef': 'error',
    // 'no-undef-init': 'error', // It conflict with `init-declarations`
    // 'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }],
    'no-unused-vars': ['error', {
      args: 'none',
      caughtErrors: 'none',
      ignoreRestSiblings: true,
      vars: 'all'
    }],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    // 'no-whitespace-before-property': 'error',
    'no-with': 'error',
    // 'object-curly-newline': ['error', { multiline: true, consistent: true }],
    // 'object-curly-spacing': ['error', 'always'],
    // 'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    'one-var': ['error', { initialized: 'never' }],
    // 'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before', '|>': 'before' } }],
    // 'padded-blocks': ['error', { blocks: 'never', switches: 'never', classes: 'never' }],
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    // 'quote-props': ['error', 'as-needed'],
    // quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    // 'rest-spread-spacing': ['error', 'never'],
    // semi: ['error', 'never'],
    // 'semi-spacing': ['error', { before: false, after: true }],
    // 'space-before-blocks': ['error', 'always'],
    // 'space-before-function-paren': ['error', 'always'],
    // 'space-in-parens': ['error', 'never'],
    // 'space-infix-ops': 'error',
    // 'space-unary-ops': ['error', { words: true, nonwords: false }],
    'spaced-comment': ['error', 'always', {
      line: { markers: ['*package', '!', '/', ',', '='] },
      block: { balanced: true, markers: ['*package', '!', ',', ':', '::', 'flow-include'], exceptions: ['*'] }
    }],
    'symbol-description': 'error',
    // 'template-curly-spacing': ['error', 'never'],
    // 'template-tag-spacing': ['error', 'never'],
    'unicode-bom': ['error', 'never'],
    'use-isnan': ['error', {
      enforceForSwitchCase: true,
      enforceForIndexOf: true
    }],
    'valid-typeof': ['error', { requireStringLiterals: true }],
    // 'wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
    // 'yield-star-spacing': ['error', 'both'],
    yoda: ['error', 'never'],

    'import/export': 'error',
    'import/first': 'error',
    'import/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
    'import/no-duplicates': 'error',
    'import/no-named-default': 'error',
    'import/no-webpack-loader-syntax': 'error',

    'n/handle-callback-err': ['error', '^(err|error)$'],
    'n/no-callback-literal': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-exports-assign': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/process-exit-as-throw': 'error',

    'promise/param-names': 'error'
  } as const;

  return [
    {
      name: "git-validator/javascript",
      files: ["**/*.{js,cjs,mjs,jsx}"],
      // https://eslint.org/docs/latest/use/configure/language-options
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
          // TODO `ecmaVersion` and `sourceType` are no standard here. import/no-default-export required this
          ecmaVersion: "latest",
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...Object.fromEntries(
            Object.entries(globals.browser).filter(
              ([k]) => !confusingKeys.includes(k),
            ),
          ),
        },
      },
      linterOptions: {
        // noInlineConfig: true, // too strict
        reportUnusedDisableDirectives: true,
      },
      plugins: {
        fp: fpPlugin,
        n: nPlugin,
        import: importPlugin,
        promise: promisePlugin,
        react: reactPlugin,
        "react-hooks": reactHooksPlugin,
        sonarjs: sonarjsPlugin,
        unicorn: unicornPlugin,
        "es-x": esxPlugin,
        "simple-import-sort": simpleImportSortPlugin,
        "@git-validator": gitValidatorPlugin,
      },
      rules: {
        // 1. standard config rules
        ...standardConfigRules,

        // 2. code style for a better readability
        "arrow-body-style": ["error", "as-needed"],
        "import/newline-after-import": ["error", { count: 1 }],
        // Sort imports by prettier. Turn in off.
        // "simple-import-sort/imports": [
        //   "error",
        //   { groups: [["^\\u0000", "^node:", "^@?\\w", "^", "^\\."]] },
        // ],
        "simple-import-sort/exports": "error",
        "unicorn/prefer-node-protocol": "error",
        "unicorn/escape-case": "error", // '\ud834' -> '\uD834'
        // "unicorn/number-literal-case": "error", // 0XFF -> 0xFF // conflict with prettier

        // 3. ban some syntaxes to reduce mistakes
        "default-param-last": "error",
        "func-name-matching": "error",
        "getter-return": "error",
        "init-declarations": "error",
        "max-params": ["error", { max: 4 }],
        "no-duplicate-imports": "error",
        "no-empty-static-block": "error",
        "no-empty-function": "error",
        "no-implicit-coercion": [
          "error",
          { disallowTemplateShorthand: true, allow: ["!!"] },
        ], // forbid code like `const num = +str`;
        "no-invalid-this": "error",
        "no-multi-assign": "error",
        "no-param-reassign": "error",
        "no-plusplus": "error",
        "no-setter-return": "error",
        "no-shadow": ["error", { ignoreOnInitialization: true }],
        "no-unused-private-class-members": "error",
        "prefer-arrow-callback": "error",
        "prefer-exponentiation-operator": "error",
        "prefer-object-has-own": "error",
        "prefer-template": "error",
        // es
        "es-x/no-accessor-properties": "error",
        "es-x/no-async-iteration": "error",
        "es-x/no-generators": "error",
        "es-x/no-legacy-object-prototype-accessor-methods": "error",
        // fp
        "fp/no-arguments": "error",
        "fp/no-delete": "error",
        // import
        "import/extensions": ["error", "always", { ignorePackages: true }],
        "import/no-commonjs": [
          "error",
          {
            allowRequire: false,
            allowConditionalRequire: false,
            allowPrimitiveModules: false,
          },
        ],
        /**
         * 1. The ESM specification didn’t say anything about interoperability with CommonJS. See: https://blog.andrewbran.ch/default-exports-in-commonjs-libraries/
         * 2. Reexporting like `export * from 'foo'` will be difficult.
         */
        "import/no-default-export": "error",
        "import/no-dynamic-require": "error",
        "import/no-mutable-exports": "error", // forbid code like `export let count = 3`
        "import/no-relative-packages": "error", // forbid to import module from other monorepo packages by relative paths
        "import/no-self-import": "error",
        // n
        "n/no-sync": "error",
        "n/prefer-global/process": ["error", "never"],
        "n/prefer-global/buffer": ["error", "never"],
        // react
        "react/jsx-key": "error",
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-no-undef": "error",
        // react-hooks
        "react-hooks/exhaustive-deps": "error",
        "react-hooks/rules-of-hooks": "error",
        // sonarjs
        "sonarjs/no-collapsible-if": "error",
        "sonarjs/no-all-duplicated-branches": "error",
        "sonarjs/no-identical-conditions": "error",
        "sonarjs/no-identical-expressions": "error",
        "sonarjs/no-ignored-return": "error",
        "sonarjs/no-inverted-boolean-check": "error",
        "sonarjs/no-nested-switch": "error",
        "sonarjs/no-useless-catch": "error",
        "sonarjs/prefer-immediate-return": "error",
        // unicorn
        // 'unicorn/no-null': 'error', // null can be useful when interact with json.
        "unicorn/consistent-destructuring": "error",
        "unicorn/consistent-empty-array-spread": "error",
        "unicorn/error-message": "error",
        "unicorn/explicit-length-check": "error",
        "unicorn/filename-case": [
          "error",
          { cases: { kebabCase: true, pascalCase: true } },
        ],
        "unicorn/import-style": [
          "error",
          {
            styles: {
              child_process: { default: true },
              fs: { default: true },
              "fs/promises": { default: true },
              process: { default: true },
              "util/types": { named: true },
              "node:child_process": { default: true },
              "node:fs": { default: true },
              "node:fs/promises": { default: true },
              "node:process": { default: true },
              "node:util/types": { named: true },
            },
          },
        ],
        "unicorn/new-for-builtins": "error",
        "unicorn/no-abusive-eslint-disable": "error",
        "unicorn/no-array-callback-reference": "error",
        "unicorn/no-for-loop": "error",
        "unicorn/no-instanceof-array": "error",
        "unicorn/no-new-array": "error",
        "unicorn/no-new-buffer": "error",
        "unicorn/no-typeof-undefined": "error",
        "unicorn/no-unreadable-iife": "error",
        "unicorn/no-useless-spread": "error",
        "unicorn/prefer-array-flat-map": "error",
        "unicorn/prefer-includes": "error",
        "unicorn/prefer-module": "error",
        "unicorn/prefer-number-properties": "error",
        "unicorn/prefer-string-slice": "error",
        "unicorn/throw-new-error": "error",

        "@git-validator/ban-ts-comment": "error",
        "@git-validator/new-parens": "error",
        "@git-validator/no-directory-imports": "error",
        "@git-validator/no-dynamic-import": "error",
        "@git-validator/no-for-in": "error",
        "@git-validator/no-git-ignored-imports": "error",
        "@git-validator/no-instanceof-builtin": "error",
        "@git-validator/no-phantom-dep-imports": "error",
        "@git-validator/no-relative-parent-imports": "error",
        "@git-validator/no-side-effect-import": "error",
        "@git-validator/no-ts-file-imports": "error",
        "@git-validator/no-unnecessary-template-string": "error",
        "@git-validator/prefer-global-this": "error",
        "@git-validator/prefer-shortest-relative-path": "error",
        "@git-validator/require-reduce-initial-value": "error",
      },
    },
    {
      name: "git-validator/javascript/config",
      files: ["**/*.config.{js,cjs,mjs,jsx}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ] as const;
}
