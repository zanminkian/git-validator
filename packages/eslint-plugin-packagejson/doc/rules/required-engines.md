<!-- prettier-ignore-start -->
# required-engines

`engines` field should be specified in the root package.json

## Rule Details

### Fail

```ts
{} // filename: /foo/package.json
{"engines":null} // filename: /foo/package.json
{"engines":{}} // filename: /foo/package.json
```

### Pass

```ts
{}
{}
{"engines":{"node":"1.0.0"}} // filename: /foo/package.json
```
<!-- prettier-ignore-end -->
