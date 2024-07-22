# @git-validator/tsconfig

## 0.6.1

### Patch Changes

- 28d1046: chore: upgrade deps

## 0.6.0

### Minor Changes

- 577e646: feat(tsconfig): add `${configDir}` template variable, requires ts 5.5

## 0.5.1

### Patch Changes

- 222f68a: refactor(tsconfig): remove json5

## 0.5.0

### Minor Changes

- 79a2fff: fix(tsconfig): add `lib` to prevent using window object in node project
- 3bb8aee: refactor(tsconfig): remove `TSCONFIG_EXTENDS` env support

## 0.4.7

### Patch Changes

- 9ff6df9: chore: upgrade deps

## 0.4.6

### Patch Changes

- 07366db: chore: upgrade deps

## 0.4.5

### Patch Changes

- ab8226c: chore: upgrade deps

## 0.4.4

### Patch Changes

- d0dce38: chore: bump version

## 0.4.3

### Patch Changes

- 9293f05: fix(tsconfig): do not diff `exclude` and `outDir`

## 0.4.2

### Patch Changes

- 24e5f5d: build(tsconfig): change the `outDir` to `out`

## 0.4.1

### Patch Changes

- 0736748: chore(tsconfig): remove `forceConsistentCasingInFileNames`

## 0.4.0

### Minor Changes

- c7ed624: chore: upgrade deps

## 0.3.0

### Minor Changes

- f7213e1: chore: upgrade deps, drop support for node 16

## 0.2.0

### Minor Changes

- a69f56e: fix(tsconfig)!: remove resolveJsonModule in esm

### Patch Changes

- fa53d68: refactor(tsconfig): remove some useless compile options

## 0.1.14

### Patch Changes

- 17cac66: refactor: lock dependencies version

## 0.1.13

### Patch Changes

- 3d32924: chore: add repository field to package.json

## 0.1.12

### Patch Changes

- 9940082: chore: change `module` and `target` value to lowercase

## 0.1.11

### Patch Changes

- 6ad7c09: feat(tsconfig): expose setup-command function

## 0.1.10

### Patch Changes

- ff60268: fix: add shebang to improve compatibility with npm

## 0.1.9

### Patch Changes

- f79938e: fix(tsconfig): fix wrong diff result of `outDir` and `exclude`

## 0.1.8

### Patch Changes

- 85539d0: refactor(tsconfig): optimize the diff message
- 238f3d9: refactor(tsconfig): use json5 for better diff

## 0.1.7

### Patch Changes

- e6e1e35: feat(tsconfig): support sub-command 'diff'

## 0.1.6

### Patch Changes

- 8715429: chore: upgrade deps

## 0.1.5

### Patch Changes

- 7e7f807: feat(git-validator,tsconfig): enable `inlineSources` in tsconfig

## 0.1.4

### Patch Changes

- c578679: feat(tsconfig): set `moduleDetection` to be `force`

## 0.1.3

### Patch Changes

- b59e756: feat(tsconfig): optimize tsconfig init template

## 0.1.2

### Patch Changes

- 33a5435: feat(tsconfig): add support for customizing where extends from

## 0.1.1

### Patch Changes

- d9c91f3: fix(tsconfig): correct the generating content
- 1600513: feat: add `exports` and add `tsconfig` script

## 0.1.0

### Minor Changes

- 53039fd: feat(tsconfig): finish
