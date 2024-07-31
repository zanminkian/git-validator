import { rule } from "./prefer-global-this.js";
import { test } from "./utils.spec.js";

const valid = [
  "foo.name",
  "foo.fun()",
  "foo.age = 12",
  'const foo = {global: "bar"}',
  'const foo = {self: "bar"}',
  'const foo = {bar: "bar"}',
  "console.log(foo)",
  "console.log(foo.foo)",
];

const invalid = [
  "global.name",
  "global.fun()",
  "global.age = 12",
  "const foo = {global}",
  "const foo = {bar: global}",
  "const foo = {bar: global.bar}",
  "console.log(global)",
  "console.log(global.foo)",
  // 'const global = {}; console.log(global)',

  "self.name",
  "self.fun()",
  "self.age = 12",
  "const foo = {self}",
  "const foo = {bar: self}",
  "const foo = {bar: self.bar}",
  "console.log(self)",
  "console.log(self.foo)",
  // 'const self = {}; console.log(self)',
];

test({ valid, invalid, ...rule });
