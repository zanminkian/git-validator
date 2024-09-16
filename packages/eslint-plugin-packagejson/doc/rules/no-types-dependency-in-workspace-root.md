<!-- prettier-ignore-start -->
# no-types-dependency-in-workspace-root

Should not install `@types/*` in workspace root

## Rule Details

### Fail

```ts
{"dependencies":{"@types/node":"foo","@types/bar":"bar"}} // filename: /root/projects/my/git-validator/package.json
{"dependencies":{"@types/node":"foo"},"devDependencies":{"@types/types":"bar"}} // filename: /root/projects/my/git-validator/package.json
{"dependencies":{"@types/node":"foo","@types/types":"bar"}} // filename: /root/projects/my/git-validator/package.json
```

### Pass

```ts
{"dependencies":{"@types/node":"foo"}} // filename: /foo/package.json
{"devDependencies":{"@types/node":"foo"}} // filename: /foo/package.json
{"dependencies":{}} // filename: /root/projects/my/git-validator/package.json
{"dependencies":{"types/node":"foo"}} // filename: /root/projects/my/git-validator/package.json
{"devDependencies":{"@types":"foo"}} // filename: /root/projects/my/git-validator/package.json
```
<!-- prettier-ignore-end -->
