<!-- prettier-ignore-start -->
# no-side-effect-imports

Side effect import is often used for polyfills and css. It's unsafe to use it.

## Rule Details

### Fail

```ts
import 'foo' // filename: foo.ts
import './foo' // filename: foo.ts
import {} from 'foo' // filename: foo.ts
import {} from './foo' // filename: foo.ts
import './reflect-metadata' // filename: foo.ts
import './foo.module.css' // filename: foo.ts
import 'foo.module.css' // filename: foo.ts
```

### Pass

```ts
import 'reflect-metadata' // filename: foo.ts
import {} from 'reflect-metadata' // filename: foo.ts
import 'foo.css' // filename: foo.ts
import './foo.css' // filename: foo.ts
import 'module.css' // filename: foo.ts
import {foo} from 'foo' // filename: foo.ts
import 'foo' // filename: foo.d.ts
```
<!-- prettier-ignore-end -->
