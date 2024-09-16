<!-- prettier-ignore-start -->
# no-dependencies-in-workspace-root

Should not install packages into `dependencies` in workspace root

## Rule Details

### Fail

```ts
{"dependencies":{}} // filename: /root/projects/my/git-validator/package.json
{"devDependencies":{},"dependencies":{"foo":"bar"}} // filename: /root/projects/my/git-validator/package.json
```

### Pass

```ts
{"dependencies":{}} // filename: /foo/package.json
{"dependencies":{"foo":"bar"}} // filename: /foo/package.json
{"devDependencies":{}} // filename: /root/projects/my/git-validator/package.json
```
<!-- prettier-ignore-end -->
