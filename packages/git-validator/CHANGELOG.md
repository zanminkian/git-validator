# git-validator

## 0.11.2

### Patch Changes

- 9940082: chore: change `module` and `target` value to lowercase
- Updated dependencies [9940082]
- Updated dependencies [f08baca]
  - @git-validator/tsconfig@0.1.12
  - @git-validator/prettier-config@0.2.1

## 0.11.1

### Patch Changes

- 82b5a51: feat(git-validator): support `init-tsconfig` and `diff-tsconfig` subcommand
- Updated dependencies [6ad7c09]
  - @git-validator/tsconfig@0.1.11

## 0.11.0

### Minor Changes

- a662960: refactor(prettier-config)!: remove printWidth to use default printWidth, which is 80

### Patch Changes

- 537a8a1: chore: upgrade deps
- Updated dependencies [537a8a1]
- Updated dependencies [a662960]
  - @git-validator/prettier-config@0.2.0
  - @git-validator/eslint-config@0.1.22

## 0.10.26

### Patch Changes

- ff60268: fix: add shebang to improve compatibility with npm
- Updated dependencies [ff60268]
  - @git-validator/tsconfig@0.1.10

## 0.10.25

### Patch Changes

- b7f83a0: chore: upgrade deps
- Updated dependencies [69713fe]
- Updated dependencies [b7f83a0]
  - @git-validator/eslint-config@0.1.21
  - @git-validator/prettier-config@0.1.6

## 0.10.24

### Patch Changes

- Updated dependencies [3fdc049]
- Updated dependencies [f79938e]
  - @git-validator/eslint-config@0.1.20
  - @git-validator/tsconfig@0.1.9

## 0.10.23

### Patch Changes

- 8025d53: fix: compatible with windows
- Updated dependencies [8025d53]
  - @git-validator/eslint-config@0.1.19

## 0.10.22

### Patch Changes

- 26acc6d: fix(git-validator): fix crash on window
- 05feb6d: fix(git-validator): use stable api to mute warning from node
- Updated dependencies [85539d0]
- Updated dependencies [238f3d9]
  - @git-validator/tsconfig@0.1.8

## 0.10.21

### Patch Changes

- 37ef6e0: feat(git-validator): dont need to install eslint and prettier when running `npx git-validator`

## 0.10.20

### Patch Changes

- 03f32fd: chore: upgrade deps
- e6e1e35: feat(tsconfig): support sub-command 'diff'
- Updated dependencies [03f32fd]
- Updated dependencies [e6e1e35]
  - @git-validator/eslint-config@0.1.18
  - @git-validator/tsconfig@0.1.7

## 0.10.19

### Patch Changes

- d4e00e4: feat(git-validator): support `--no-eslint` and `--no-prettier`
- 998fa3b: refactor(git-validator): replace `spawnSync` with `spawn`

## 0.10.18

### Patch Changes

- 8715429: chore: upgrade deps
- Updated dependencies [8715429]
  - @git-validator/prettier-config@0.1.5
  - @git-validator/eslint-config@0.1.17
  - @git-validator/tsconfig@0.1.6

## 0.10.17

### Patch Changes

- 2179bde: fix(eslint-config): remove jest rule restrictions
- Updated dependencies [2179bde]
  - @git-validator/eslint-config@0.1.16

## 0.10.16

### Patch Changes

- 1ea8f1f: feat(eslint-config,eslint-plugin-packagejson,git-validator): support validate package json
- 876dd47: feat: force `types` on the top
- 814b294: feat: force `default` field to be the bottom
- Updated dependencies [fc487cd]
- Updated dependencies [1ea8f1f]
- Updated dependencies [876dd47]
- Updated dependencies [814b294]
  - @git-validator/eslint-config@0.1.15

## 0.10.15

### Patch Changes

- 382e264: fix(eslint-config): loosen restriction about type assertions
- Updated dependencies [382e264]
  - @git-validator/eslint-config@0.1.14

## 0.10.14

### Patch Changes

- 2831bef: chore: upgrade deps
- Updated dependencies [2831bef]
  - @git-validator/prettier-config@0.1.4
  - @git-validator/eslint-config@0.1.13

## 0.10.13

### Patch Changes

- 80165c4: feat(git-validator): print log before linting

## 0.10.12

### Patch Changes

- d04e6b5: feat(eslint-config): required return await
- 632d4f3: feat(eslint-config): lint js if detected tsconfig
- Updated dependencies [d04e6b5]
- Updated dependencies [632d4f3]
  - @git-validator/eslint-config@0.1.12

## 0.10.11

### Patch Changes

- fdb0038: feat(eslint-config): ban ts comment
- Updated dependencies [fdb0038]
  - @git-validator/eslint-config@0.1.11

## 0.10.10

### Patch Changes

- fede930: fix(eslint-config): ignore ts files when there is no tsconfig
- Updated dependencies [fede930]
  - @git-validator/eslint-config@0.1.10

## 0.10.9

### Patch Changes

- 7e7f807: feat(git-validator,tsconfig): enable `inlineSources` in tsconfig
- d613c3e: feat(git-validator): allow `-V, --version` option
- Updated dependencies [7e7f807]
  - @git-validator/tsconfig@0.1.5

## 0.10.8

### Patch Changes

- 0729249: fix(prettier-config): fix some crashes, close #102
- Updated dependencies [0729249]
  - @git-validator/prettier-config@0.1.3

## 0.10.7

### Patch Changes

- @git-validator/eslint-config@0.1.9

## 0.10.6

### Patch Changes

- b2bea40: fix(eslint-config): fix crash if there is no `tsconfig.json` in project root
- 9e6174e: chore: upgrade deps
- Updated dependencies [b2bea40]
- Updated dependencies [9e6174e]
  - @git-validator/eslint-config@0.1.8

## 0.10.4

### Patch Changes

- c578679: feat(tsconfig): set `moduleDetection` to be `force`
- Updated dependencies [c578679]
  - @git-validator/tsconfig@0.1.4

## 0.10.3

### Patch Changes

- Updated dependencies [b1ffc74]
- Updated dependencies [317fd54]
  - @git-validator/eslint-config@0.1.6
  - @git-validator/prettier-config@0.1.2

## 0.10.2

### Patch Changes

- Updated dependencies [b59e756]
  - @git-validator/tsconfig@0.1.3

## 0.10.1

### Patch Changes

- Updated dependencies [2bda39a]
- Updated dependencies [76d635e]
  - @git-validator/eslint-config@0.1.5

## 0.10.0

### Minor Changes

- 20c91cc: refactor(git-validator): move tsconfig files

### Patch Changes

- Updated dependencies [e7a1c9f]
- Updated dependencies [c9b0c89]
  - @git-validator/eslint-config@0.1.4

## 0.9.15

### Patch Changes

- Updated dependencies [2b7cf18]
  - @git-validator/eslint-config@0.1.3

## 0.9.14

### Patch Changes

- Updated dependencies [d19ba77]
- Updated dependencies [829cdf6]
  - @git-validator/eslint-config@0.1.2

## 0.9.13

### Patch Changes

- ffb246f: fix(git-validator): make the `extends` field right
- Updated dependencies [33a5435]
- Updated dependencies [2686f0b]
- Updated dependencies [79c8264]
- Updated dependencies [dd0ecd9]
  - @git-validator/tsconfig@0.1.2
  - @git-validator/eslint-config@0.1.1
  - @git-validator/prettier-config@0.1.1

## 0.9.12

### Patch Changes

- 1455583: fix(git-validator): fix tsconfig not work

## 0.9.11

### Patch Changes

- b1380d5: feat(git-validator): add tsconfig presets
- 1600513: feat: add `exports` and add `tsconfig` script
- Updated dependencies [d9c91f3]
- Updated dependencies [1600513]
  - @git-validator/tsconfig@0.1.1

## 0.9.10

### Patch Changes

- Updated dependencies [118dcce]
  - @git-validator/eslint-config@0.1.0

## 0.9.9

### Patch Changes

- Updated dependencies [5b63fe2]
  - @git-validator/prettier-config@0.1.0

## 0.9.8

### Patch Changes

- Updated dependencies [615ee22]
  - @zanminkian/eslint-config@0.4.4

## 0.9.7

### Patch Changes

- Updated dependencies [87153b0]
  - @zanminkian/eslint-config@0.4.3

## 0.9.6

### Patch Changes

- Updated dependencies [f8958cc]
  - @zanminkian/eslint-config@0.4.2

## 0.9.5

### Patch Changes

- c37841e: chore: upgrade deps
- Updated dependencies [c37841e]
- Updated dependencies [ebdcef9]
  - @zanminkian/eslint-config@0.4.1
  - @zanminkian/prettier-config@0.5.0

## 0.9.4

### Patch Changes

- 60feb0c: fix(git-validator): can get esm config

## 0.9.3

### Patch Changes

- 3285d42: chore: upgrade deps
- 2cf49ad: refactor(git-validator): use flat eslint config
- Updated dependencies [b25ebab]
- Updated dependencies [06e8f50]
- Updated dependencies [c17c4f8]
- Updated dependencies [3285d42]
- Updated dependencies [2d5d113]
- Updated dependencies [9087a92]
  - @zanminkian/prettier-config@0.4.0
  - @zanminkian/eslint-config@0.4.0

## 0.9.2

### Patch Changes

- @zanminkian/eslint-config@0.3.6

## 0.9.1

### Patch Changes

- 5c5fe5a: chore: upgrade deps
- Updated dependencies [003b95f]
- Updated dependencies [5c5fe5a]
- Updated dependencies [eb12d1c]
  - @zanminkian/prettier-config@0.3.0
  - @zanminkian/eslint-config@0.3.5

## 0.9.0

### Minor Changes

- 55857b3: refactor(git-validator): change option name `apply` to `update`

## 0.8.1

### Patch Changes

- Updated dependencies [067593c]
  - @zanminkian/eslint-config@0.3.4

## 0.8.0

### Minor Changes

- e73b5f3: refactor(prettier-config): remove `semi` and `singleQuote` config

### Patch Changes

- 3438566: chore: upgrade deps
- Updated dependencies [3438566]
- Updated dependencies [e73b5f3]
  - @zanminkian/eslint-config@0.3.3
  - @zanminkian/prettier-config@0.2.0

## 0.7.0

### Minor Changes

- b9078f4: refactor(git-validator): lint before format
- e60a66b: refactor(git-validator): merge cli options into one

### Patch Changes

- Updated dependencies [4a7f63e]
  - @zanminkian/eslint-config@0.3.2

## 0.6.1

### Patch Changes

- bdce62a: feat(git-validator): add lock file to prettierignore
- Updated dependencies [9ebe282]
- Updated dependencies [61bf00c]
  - @zanminkian/eslint-config@0.3.1

## 0.6.0

### Minor Changes

- 8c125be: feat(git-validator): format before lint at pre-commit stage

### Patch Changes

- 16fc95c: feat(git-validator): add prettier config
- 1b9ba94: feat(git-validator): built-in ignore when formatting
- d1dcd55: feat(git-validator): support format and lint serially
- 071e427: feat(git-validator): install prettier to allow user use prettier cmd
- Updated dependencies [526d46a]
- Updated dependencies [6cfd8b2]
  - @zanminkian/eslint-config@0.3.0
  - @zanminkian/prettier-config@0.1.0

## 0.5.3

### Patch Changes

- Updated dependencies [77f9a47]
  - @zanminkian/eslint-config@0.2.3

## 0.5.2

### Patch Changes

- Updated dependencies [d9a8673]
- Updated dependencies [1f383c8]
- Updated dependencies [bfadfeb]
- Updated dependencies [f4753e5]
- Updated dependencies [76313e6]
  - @zanminkian/eslint-config@0.2.2

## 0.5.1

### Patch Changes

- 736777d: feat: add `no-const-enum` rule
- bf1abe4: feat: add `no-export-assignment` rule
- Updated dependencies [c10ce8c]
- Updated dependencies [736777d]
- Updated dependencies [986f92a]
- Updated dependencies [abb6de1]
- Updated dependencies [bf1abe4]
  - @zanminkian/eslint-config@0.2.1

## 0.5.0

### Minor Changes

- 7b18678: refactor!: remove antfu eslint config

### Patch Changes

- Updated dependencies [7b18678]
  - @zanminkian/eslint-config@0.2.0

## 0.4.9

### Patch Changes

- Updated dependencies [f044668]
  - @zanminkian/eslint-config@0.1.15

## 0.4.8

### Patch Changes

- 01046b0: refactor(git-validator): optimize the config file
- Updated dependencies [b46b908]
  - @zanminkian/eslint-config@0.1.14

## 0.4.7

### Patch Changes

- 4a75c02: chore: upgrade deps
- Updated dependencies [4a75c02]
  - @zanminkian/eslint-config@0.1.13

## 0.4.6

### Patch Changes

- 45b67df: chore: upgrade deps
- Updated dependencies [45b67df]
  - @zanminkian/eslint-config@0.1.12

## 0.4.5

### Patch Changes

- 66b12c7: chore: update dependencies

## 0.4.4

### Patch Changes

- 856ce42: chore(git-validator): upgrade deps
- Updated dependencies [02836c5]
- Updated dependencies [881c15a]
  - @zanminkian/eslint-config@0.1.11

## 0.4.3

### Patch Changes

- 5460169: chore: upgrade deps
- e13f27d: fix(git-validator): fix `git-validator` command that only lint one file
- 1a29ff5: fix(git-validator): print correct error message if `.git` not exist

## 0.4.2

### Patch Changes

- cedaae2: feat: shorten the command

## 0.4.1

### Patch Changes

- 86a7064: feat: support customizing lint-staged config

## 0.4.0

### Minor Changes

- 566d909: refactor(git-validator)!: optimize commands

## 0.3.3

### Patch Changes

- 7e8b471: feat(git-validator): add prettier

## 0.3.2

### Patch Changes

- 849c8eb: feat(git-validator): use `commitlint` for better expansibility

## 0.3.1

### Patch Changes

- d3248be: chore: upgrade deps
- Updated dependencies [d3248be]
  - @zanminkian/eslint-config@0.1.9

## 0.3.0

### Minor Changes

- 98ab2da: feat(git-validator): init from `@zanminkian/git-hooks`
