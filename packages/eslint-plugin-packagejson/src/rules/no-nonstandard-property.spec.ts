import { test } from "../test.js";
import { name, rule } from "./no-nonstandard-property.js";

const valid = [
  {},
  { name: "foo", type: "foo", config: "foo", packageManager: "foo" },
  { dependencies: { foo: "foo" }, config: { bar: "bar" } },
];
const invalid = [
  { name: "", foo: "foo", bar: "bar" },
  { author: "", public: true, pnpm: {} },
];

await test({ name, rule, valid, invalid, errors: 2 });
