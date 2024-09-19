<!-- prettier-ignore-start -->
# required-hashbang

The bin file should starts with a hashbang

## Rule Details

### Fail

```ts
{"bin":123}
{"bin":[]}
{"bin":{"foo":true}}
{"bin":"./no-existing.js"} // filename: /foo/test/required-hashbang/package.json
{"bin":"./bad.js"} // filename: /foo/test/required-hashbang/package.json
{"bin":{"foo":"./bad.js"}} // filename: /foo/test/required-hashbang/package.json
```

### Pass

```ts
{}
{"name":"foo"}
{"bin":{}}
{"bin":"./good.js"} // filename: /foo/test/required-hashbang/package.json
{"bin":{"foo":"./good.js","bar":"./good.js"}} // filename: /foo/test/required-hashbang/package.json
```
<!-- prettier-ignore-end -->
