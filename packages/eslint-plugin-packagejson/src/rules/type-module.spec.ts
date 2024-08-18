import { test } from "../test.spec.js";
import { name, rule } from "./type-module.js";

const valid = [
  { type: "module" },
  { name: "foo", type: "module" },
  { dependencies: {}, type: "module", config: {} },
];

const invalid = [
  {},
  { type: "commonjs" },
  { name: "", type: "foo" },
  { name: "", type: "" },
];

await test({ name, rule, valid, invalid });
