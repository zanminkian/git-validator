<!-- prettier-ignore-start -->
# no-dynamic-imports

`import()` should be called with string literal.

## Rule Details

### Fail

```ts
import(false)
import(123)
await import(123)
import(`foo`)
import(foo)
import({})
import([])
const foo = await import(foo)
```

### Pass

```ts
import('foo')
import("foo")
import("./foo")
await import("foo")
const foo = await import("foo")
```
<!-- prettier-ignore-end -->
