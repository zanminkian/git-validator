<!-- prettier-ignore-start -->
# private-workspace-root

`package.json` in workspace root should be private

## Rule Details

### Fail

```ts
{} // filename: /root/projects/my/git-validator/package.json
{"private":false} // filename: /root/projects/my/git-validator/package.json
{"private":"true"} // filename: /root/projects/my/git-validator/package.json
```

### Pass

```ts
{} // filename: /foo/package.json
{"private":true} // filename: /root/projects/my/git-validator/package.json
```
<!-- prettier-ignore-end -->
