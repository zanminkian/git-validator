<!-- prettier-ignore-start -->
# no-phantom-dep-imports

Disallow importing from a module which the nearest `package.json` doesn't include it.

## Rule Details

### Fail

```ts
import foo from 'foo' // filename: /foo/src/rules/no-phantom-dep-imports.spec.ts
import eslint from 'eslint' // filename: /foo/foo.js
```

### Pass

```ts
import foo from '/foo'
import foo from './foo'
import foo from '../foo'
import foo from 'node:foo'
import eslint from 'eslint' // filename: /foo/src/rules/no-phantom-dep-imports.spec.ts
```
<!-- prettier-ignore-end -->
