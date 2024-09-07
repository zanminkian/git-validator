# bottom-default

Force 'default' field on the bottom of 'exports'.

## Fail

```json
{
  "exports": {
    "default": "foo",
    "types": "foo"
  }
}
```

```json
{
  "exports": {
    "require": {
      "default": "foo",
      "types": "foo"
    }
  }
}
```

## Pass

```json
{
  "default": "foo",
  "name": "foo"
}
```

```json
{
  "exports": {
    "types": "foo",
    "default": "foo"
  }
}
```
