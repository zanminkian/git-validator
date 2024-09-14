<!-- prettier-ignore-start -->
# no-relative-parent-imports

Disallow importing module from a relative parent path too deeply.

## Rule Details

### Fail

```ts
import foo from '../../../foo'
import '../../../foo'
import('../../../foo')
export * from '../../../foo'
export {name} from '../../../foo'
import foo from '../../../../foo'
```

### Pass

```ts
import foo from 'foo'
import 'foo'
require('foo')
import('foo')
export * from 'foo'
export {name} from 'foo'
import foo from '.foo'
import foo from './foo'
import foo from '../foo'
import foo from '../../foo'
```
<!-- prettier-ignore-end -->
