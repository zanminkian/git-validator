<!-- prettier-ignore-start -->
# top-types

`types` field in exports must be on the top of an object

## Rule Details

### Fail

```ts
{"exports":{"default":"foo","types":"foo"}}
{"exports":{"require":{"default":"foo","types":"foo"}}}
{"exports":{"foo":{"default":"foo","types":"foo"}}}
{"exports":{"foo":{"bar":{"x":"","types":""}}}}
```

### Pass

```ts
{"name":"foo","types":"foo"}
{"exports":{}}
{"exports":{"types":"foo"}}
{"exports":{"types":"foo","default":"foo"}}
{"exports":{"require":{"types":"foo","default":"foo"}}}
{"exports":{"foo":{"bar":{"types":""}}}}
```
<!-- prettier-ignore-end -->
