import { messageId, rule, ruleName } from "./no-legacy-getter-setter.js";
import { test } from "./utils.spec.js";

const valid = ["const foo = {}; foo.__proto__;"];

const invalid = [
  "const foo = {}; foo.__defineGetter__();",
  "const foo = {}; foo.__defineGetter__.bar;",
  'const foo = {}; foo.__defineGetter__ = "bar";',
  "const foo = {}; foo.__defineGetter__;",
  "const foo = {}; foo.__defineSetter__;",
  "const foo = {}; foo.__lookupGetter__;",
  "const foo = {}; foo.__lookupSetter__;",
];

test({ valid, invalid, messageId, rule, ruleName });
