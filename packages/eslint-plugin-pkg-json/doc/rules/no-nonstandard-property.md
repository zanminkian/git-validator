<!-- prettier-ignore-start -->
# no-nonstandard-property

Disallow using the property that is out of node and npm standard

## Rule Details

### Fail

```ts
{"name":"","foo":"foo","bar":"bar"}
{"author":"","public":true,"pnpm":{}}
```

### Pass

```ts
{}
{"name":"foo","type":"foo","config":"foo","packageManager":"foo"}
{"dependencies":{"foo":"foo"},"config":{"bar":"bar"}}
```
<!-- prettier-ignore-end -->
