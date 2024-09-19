<!-- prettier-ignore-start -->
# no-conflict-types

Dependencies '@types/web' and '@types/node' should not be installed in the same package.json

## Rule Details

### Fail

```ts
{"dependencies":{"@types/web":"1.0.0","@types/node":"2.0.0"},"devDependencies":{}}
{"dependencies":{},"devDependencies":{"@types/web":"1.0.0","@types/node":"2.0.0"}}
{"dependencies":{"@types/web":"1.0.0"},"devDependencies":{"@types/node":"2.0.0"}}
```

### Pass

```ts
{}
{"dependencies":{"@types/web":"1.0.0"},"peerDependencies":{"@types/node":"2.0.0"}}
```
<!-- prettier-ignore-end -->
