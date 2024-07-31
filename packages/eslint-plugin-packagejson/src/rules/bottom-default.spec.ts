import { test } from "../test.js";
import { name, rule } from "./bottom-default.js";

const valid = [
  { default: "foo", name: "foo" },
  { exports: { default: "foo" } },
  { exports: { types: "foo", default: "foo" } },
  { exports: { require: { types: "foo", default: "foo" } } },
];

const invalid = [
  { exports: { default: "foo", types: "foo" } },
  { exports: { require: { default: "foo", types: "foo" } } },
  { exports: { foo: { default: "foo", types: "foo" } } },
];

await test({ name, rule, valid, invalid });
