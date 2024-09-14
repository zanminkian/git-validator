<!-- prettier-ignore-start -->
# no-rename-imports

Disallow renaming the named-imports.

## Rule Details

### Fail

```ts
import {foo as bar} from 'foo'
import {default as foo} from 'foo'
import type {foo as bar} from 'foo'
import {type foo as bar} from 'foo'
import type {default as foo} from 'foo'
import {type default as foo} from 'foo'
```

### Pass

```ts
import Foo from 'foo'
import {foo, bar} from 'foo'
import {type foo} from 'foo'
import type {foo} from 'foo'
import type Foo from 'foo'
```
<!-- prettier-ignore-end -->
