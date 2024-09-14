<!-- prettier-ignore-start -->
# no-ts-file-imports

Disallow importing from a declaration style file or a ts file

## Rule Details

### Fail

```ts
import foo from './foo.ts' // filename: bar.js
import foo from './foo.ts' // filename: bar
import foo from './foo.ts' // filename: bar.ts
import foo from './foo.ts' // filename: bar.tsx
import foo from './foo.cts' // filename: bar.js
import foo from './foo.cts' // filename: bar
import foo from './foo.cts' // filename: bar.ts
import foo from './foo.cts' // filename: bar.tsx
import foo from './foo.mts' // filename: bar.js
import foo from './foo.mts' // filename: bar
import foo from './foo.mts' // filename: bar.ts
import foo from './foo.mts' // filename: bar.tsx
import foo from './foo.tsx' // filename: bar.js
import foo from './foo.tsx' // filename: bar
import foo from './foo.tsx' // filename: bar.ts
import foo from './foo.tsx' // filename: bar.tsx
import foo from 'foo.d.bar' // filename: bar.js
import foo from 'foo.d.bar' // filename: bar
import foo from 'foo.d.bar' // filename: bar.ts
import foo from 'foo.d.bar' // filename: bar.tsx
import foo from './foo.d.bar' // filename: bar.js
import foo from './foo.d.bar' // filename: bar
import foo from './foo.d.bar' // filename: bar.ts
import foo from './foo.d.bar' // filename: bar.tsx
import foo from './foo/foo.d.bar' // filename: bar.js
import foo from './foo/foo.d.bar' // filename: bar
import foo from './foo/foo.d.bar' // filename: bar.ts
import foo from './foo/foo.d.bar' // filename: bar.tsx
import foo from './foo.d.ts' // filename: bar.js
import foo from './foo.d.ts' // filename: bar
import foo from './foo.d.ts' // filename: bar.ts
import foo from './foo.d.ts' // filename: bar.tsx
import foo from './foo.d.cts' // filename: bar.js
import foo from './foo.d.cts' // filename: bar
import foo from './foo.d.cts' // filename: bar.ts
import foo from './foo.d.cts' // filename: bar.tsx
import foo from './foo.d.mts' // filename: bar.js
import foo from './foo.d.mts' // filename: bar
import foo from './foo.d.mts' // filename: bar.ts
import foo from './foo.d.mts' // filename: bar.tsx
import foo from './foo.d.tsx' // filename: bar.js
import foo from './foo.d.tsx' // filename: bar
import foo from './foo.d.tsx' // filename: bar.ts
import foo from './foo.d.tsx' // filename: bar.tsx
import foo from './foo.d.js' // filename: bar.js
import foo from './foo.d.js' // filename: bar
import foo from './foo.d.js' // filename: bar.ts
import foo from './foo.d.js' // filename: bar.tsx
import foo from './foo.d.cjs' // filename: bar.js
import foo from './foo.d.cjs' // filename: bar
import foo from './foo.d.cjs' // filename: bar.ts
import foo from './foo.d.cjs' // filename: bar.tsx
import foo from './foo.d.mjs' // filename: bar.js
import foo from './foo.d.mjs' // filename: bar
import foo from './foo.d.mjs' // filename: bar.ts
import foo from './foo.d.mjs' // filename: bar.tsx
import foo from './foo.d.jsx' // filename: bar.js
import foo from './foo.d.jsx' // filename: bar
import foo from './foo.d.jsx' // filename: bar.ts
import foo from './foo.d.jsx' // filename: bar.tsx
import foo from '/foo.ts' // filename: bar.js
import foo from '/foo.ts' // filename: bar
import foo from '/foo.ts' // filename: bar.ts
import foo from '/foo.ts' // filename: bar.tsx
import foo from '/foo.d.js' // filename: bar.js
import foo from '/foo.d.js' // filename: bar
import foo from '/foo.d.js' // filename: bar.ts
import foo from '/foo.d.js' // filename: bar.tsx
```

### Pass

```ts
import foo from './foo.ts' // filename: bar.d.ts
import foo from './foo.ts' // filename: bar.d.tsx
import foo from './foo.cts' // filename: bar.d.ts
import foo from './foo.cts' // filename: bar.d.tsx
import foo from './foo.mts' // filename: bar.d.ts
import foo from './foo.mts' // filename: bar.d.tsx
import foo from './foo.tsx' // filename: bar.d.ts
import foo from './foo.tsx' // filename: bar.d.tsx
import foo from 'foo.d.bar' // filename: bar.d.ts
import foo from 'foo.d.bar' // filename: bar.d.tsx
import foo from './foo.d.bar' // filename: bar.d.ts
import foo from './foo.d.bar' // filename: bar.d.tsx
import foo from './foo/foo.d.bar' // filename: bar.d.ts
import foo from './foo/foo.d.bar' // filename: bar.d.tsx
import foo from './foo.d.ts' // filename: bar.d.ts
import foo from './foo.d.ts' // filename: bar.d.tsx
import foo from './foo.d.cts' // filename: bar.d.ts
import foo from './foo.d.cts' // filename: bar.d.tsx
import foo from './foo.d.mts' // filename: bar.d.ts
import foo from './foo.d.mts' // filename: bar.d.tsx
import foo from './foo.d.tsx' // filename: bar.d.ts
import foo from './foo.d.tsx' // filename: bar.d.tsx
import foo from './foo.d.js' // filename: bar.d.ts
import foo from './foo.d.js' // filename: bar.d.tsx
import foo from './foo.d.cjs' // filename: bar.d.ts
import foo from './foo.d.cjs' // filename: bar.d.tsx
import foo from './foo.d.mjs' // filename: bar.d.ts
import foo from './foo.d.mjs' // filename: bar.d.tsx
import foo from './foo.d.jsx' // filename: bar.d.ts
import foo from './foo.d.jsx' // filename: bar.d.tsx
import foo from '/foo.ts' // filename: bar.d.ts
import foo from '/foo.ts' // filename: bar.d.tsx
import foo from '/foo.d.js' // filename: bar.d.ts
import foo from '/foo.d.js' // filename: bar.d.tsx
```
<!-- prettier-ignore-end -->
