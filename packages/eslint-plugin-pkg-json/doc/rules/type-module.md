<!-- prettier-ignore-start -->
# type-module

`type` field in package.json should be 'module'

## Rule Details

### Fail

```ts
{}
{"type":"commonjs"}
{"name":"","type":"foo"}
{"name":"","type":""}
```

### Pass

```ts
{"type":"module"}
{"name":"foo","type":"module"}
{"dependencies":{},"type":"module","config":{}}
```
<!-- prettier-ignore-end -->
