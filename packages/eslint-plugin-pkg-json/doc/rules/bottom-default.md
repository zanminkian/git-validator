<!-- prettier-ignore-start -->
# bottom-default

`default` field must be on the bottom of an object

## Rule Details

### Fail

```ts
{"exports":{"default":"foo","types":"foo"}}
{"exports":{"require":{"default":"foo","types":"foo"}}}
{"exports":{"foo":{"default":"foo","types":"foo"}}}
{"exports":{"foo":{"bar":{"default":"","x":""}}}}
```

### Pass

```ts
{"default":"foo","name":"foo"}
{"exports":{"default":"foo"}}
{"exports":{"types":"foo","default":"foo"}}
{"exports":{"require":{"types":"foo","default":"foo"}}}
{"exports":{"foo":{"bar":{"default":""}}}}
```
<!-- prettier-ignore-end -->
